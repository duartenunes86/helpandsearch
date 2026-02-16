const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow requests from your frontend
app.use(express.json());

// Serve opensearch.xml with correct content type
app.get('/opensearch.xml', (req, res) => {
    res.type('application/opensearchdescription+xml');
    res.sendFile('public/opensearch.xml', { root: __dirname });
});

app.use(express.static('public')); // Serve frontend files

// Helper function to fetch from Mojeek
async function fetchMojeek(query) {
    const params = new URLSearchParams({
        api_key: process.env.MOJEEK_API_KEY,
        q: query,
        fmt: 'json'
    });

    const response = await fetch(`https://www.mojeek.com/search?${params.toString()}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) throw new Error(`Mojeek API error: ${response.status}`);
    return await response.json();
}

// Helper function to fetch from Search.com
async function fetchSearchCom(query) {
    const response = await fetch('https://api.search.com/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.SEARCHCOM_API_KEY}`
        },
        body: JSON.stringify({
            q: query,
            aid: process.env.SEARCHCOM_AID,
            format: 'json'
        })
    });

    if (!response.ok) throw new Error(`Search.com API error: ${response.status}`);
    return await response.json();
}

// Helper function to fetch images from Pixabay
async function fetchPixabay(query) {
    const params = new URLSearchParams({
        key: process.env.PIXABAY_API_KEY,
        q: query,
        image_type: 'photo',
        per_page: 20
    });

    const response = await fetch(`https://pixabay.com/api/?${params.toString()}`);
    if (!response.ok) throw new Error(`Pixabay API error: ${response.status}`);
    return await response.json();
}

// Helper function to merge and deduplicate web results
function mergeWebResults(mojeekData, searchComData) {
    const results = [];
    const seenUrls = new Set();

    // Normalize Mojeek results
    if (mojeekData?.response?.results) {
        mojeekData.response.results.forEach(result => {
            const url = result.url.toLowerCase();
            if (!seenUrls.has(url)) {
                seenUrls.add(url);
                results.push({
                    title: result.title,
                    url: result.url,
                    desc: result.desc || '',
                    source: 'mojeek'
                });
            }
        });
    }

    // Normalize Search.com results
    if (searchComData?.results) {
        searchComData.results.forEach(result => {
            const url = (result.url || result.link || '').toLowerCase();
            if (url && !seenUrls.has(url)) {
                seenUrls.add(url);
                results.push({
                    title: result.title || '',
                    url: result.url || result.link || '',
                    desc: result.description || result.snippet || result.desc || '',
                    source: 'searchcom'
                });
            }
        });
    }

    return results;
}

// MIXED WEB SEARCH - Mojeek + Search.com
app.get('/api/search/web', async (req, res) => {
    const query = req.query.q;
    
    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    try {
        // Fetch from both APIs in parallel
        const [mojeekData, searchComData] = await Promise.allSettled([
            fetchMojeek(query),
            fetchSearchCom(query)
        ]);

        // Extract successful results
        const mojeekResults = mojeekData.status === 'fulfilled' ? mojeekData.value : null;
        const searchComResults = searchComData.status === 'fulfilled' ? searchComData.value : null;

        // Merge and deduplicate
        const mergedResults = mergeWebResults(mojeekResults, searchComResults);

        res.json({
            query: query,
            total_results: mergedResults.length,
            results: mergedResults,
            sources_used: {
                mojeek: mojeekData.status === 'fulfilled',
                searchcom: searchComData.status === 'fulfilled'
            }
        });

    } catch (error) {
        console.error('Web search error:', error);
        res.status(500).json({ 
            error: 'Search failed',
            message: error.message 
        });
    }
});

// MIXED IMAGE SEARCH - Search.com + Pixabay
app.get('/api/search/images', async (req, res) => {
    const query = req.query.q;
    
    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    try {
        // Fetch from both APIs in parallel
        const [searchComData, pixabayData] = await Promise.allSettled([
            fetchSearchCom(query),
            fetchPixabay(query)
        ]);

        const images = [];
        const seenUrls = new Set();

        // Extract Search.com images (if they have an images field)
        if (searchComData.status === 'fulfilled' && searchComData.value?.images) {
            searchComData.value.images.forEach(img => {
                const url = img.url || img.image || img.thumbnail;
                if (url && !seenUrls.has(url)) {
                    seenUrls.add(url);
                    images.push({
                        url: url,
                        thumbnail: img.thumbnail || url,
                        title: img.title || query,
                        source: 'searchcom'
                    });
                }
            });
        }

        // Extract Pixabay images
        if (pixabayData.status === 'fulfilled' && pixabayData.value?.hits) {
            pixabayData.value.hits.forEach(img => {
                const url = img.largeImageURL;
                if (!seenUrls.has(url)) {
                    seenUrls.add(url);
                    images.push({
                        url: url,
                        thumbnail: img.previewURL,
                        title: img.tags || query,
                        width: img.imageWidth,
                        height: img.imageHeight,
                        source: 'pixabay'
                    });
                }
            });
        }

        res.json({
            query: query,
            total_images: images.length,
            images: images,
            sources_used: {
                searchcom: searchComData.status === 'fulfilled',
                pixabay: pixabayData.status === 'fulfilled'
            }
        });

    } catch (error) {
        console.error('Image search error:', error);
        res.status(500).json({ 
            error: 'Image search failed',
            message: error.message 
        });
    }
});

// Legacy endpoint - keep for backward compatibility (Mojeek only)
app.get('/api/search', async (req, res) => {
    const query = req.query.q;
    
    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    try {
        const data = await fetchMojeek(query);
        res.json(data);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ 
            error: 'Search failed',
            message: error.message 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API endpoint: http://localhost:${PORT}/api/search?q=test`);
});
