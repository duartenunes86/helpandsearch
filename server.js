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

// Helper function to fetch from Mojeek with pagination
async function fetchMojeek(query, page = 1) {
    const params = new URLSearchParams({
        api_key: process.env.MOJEEK_API_KEY,
        q: query,
        fmt: 'json',
        s: (page - 1) * 10  // Mojeek uses 's' for start position (0, 10, 20, etc.)
    });

    const response = await fetch(`https://www.mojeek.com/search?${params.toString()}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) throw new Error(`Mojeek API error: ${response.status}`);
    return await response.json();
}

// Helper function to fetch images from Pixabay with pagination
async function fetchPixabay(query, page = 1) {
    const params = new URLSearchParams({
        key: process.env.PIXABAY_API_KEY,
        q: query,
        image_type: 'photo',
        per_page: 200,  // Maximum allowed by Pixabay API
        page: page
    });

    const response = await fetch(`https://pixabay.com/api/?${params.toString()}`);
    if (!response.ok) throw new Error(`Pixabay API error: ${response.status}`);
    return await response.json();
}

// Helper function to fetch images from Openverse (NO API KEY NEEDED!)
async function fetchOpenverse(query, page = 1) {
    const params = new URLSearchParams({
        q: query,
        page_size: 200,  // Get 200 images per page
        page: page
    });

    const response = await fetch(`https://api.openverse.org/v1/images/?${params.toString()}`);
    if (!response.ok) throw new Error(`Openverse API error: ${response.status}`);
    return await response.json();
}

// Helper function to generate AI response from Search.com
async function generateAIContent(prompt) {
    const params = new URLSearchParams({
        prompt: prompt,
        subid: process.env.SEARCHCOM_AID
    });

    const response = await fetch(`https://search.com/api/generate_content?${params.toString()}`, {
        method: 'GET',
        headers: {
            'X-API-KEY': process.env.SEARCHCOM_API_KEY
        }
    });

    if (!response.ok) throw new Error(`Search.com AI error: ${response.status}`);
    return await response.json();
}

// WEB SEARCH - Mojeek only with pagination
app.get('/api/search/web', async (req, res) => {
    const query = req.query.q;
    const page = parseInt(req.query.page) || 1;
    
    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    try {
        const data = await fetchMojeek(query, page);
        
        // Log the full response to see structure
        console.log('Mojeek response structure:', JSON.stringify(data, null, 2));
        
        // Normalize response
        const results = [];
        if (data?.response?.results) {
            data.response.results.forEach(result => {
                results.push({
                    title: result.title,
                    url: result.url,
                    desc: result.desc || ''
                });
            });
        }

        // Try multiple possible locations for total hits
        let totalHits = 0;
        if (data?.response?.head?.hits) {
            totalHits = parseInt(data.response.head.hits);
        } else if (data?.response?.hits) {
            totalHits = parseInt(data.response.hits);
        } else if (data?.hits) {
            totalHits = parseInt(data.hits);
        } else if (data?.response?.head?.results) {
            totalHits = parseInt(data.response.head.results);
        }
        
        // If we still don't have a total, estimate based on whether we got full results
        if (totalHits === 0 && results.length === 10) {
            totalHits = 1000; // Conservative estimate
        } else if (totalHits === 0) {
            totalHits = results.length;
        }

        const resultsPerPage = 10;
        const currentResultCount = page * resultsPerPage;

        console.log(`Mojeek search: "${query}" - Page ${page} - Total hits: ${totalHits} - Results on page: ${results.length}`);
        console.log(`Has more: ${currentResultCount < totalHits && results.length > 0}`);

        res.json({
            query: query,
            page: page,
            total_results: results.length,
            total_available: totalHits,
            has_more: currentResultCount < totalHits && results.length > 0,
            results: results
        });

    } catch (error) {
        console.error('Web search error:', error);
        res.status(500).json({ 
            error: 'Search failed',
            message: error.message 
        });
    }
});

// IMAGE SEARCH - Pixabay + Openverse (both FREE!) with pagination
app.get('/api/search/images', async (req, res) => {
    const query = req.query.q;
    const page = parseInt(req.query.page) || 1;
    
    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    try {
        // Fetch from both APIs in parallel
        const [pixabayData, openverseData] = await Promise.allSettled([
            fetchPixabay(query, page),
            fetchOpenverse(query, page)
        ]);
        
        console.log('=== IMAGE SEARCH DEBUG ===');
        console.log(`Query: "${query}", Page: ${page}`);
        console.log(`Pixabay status: ${pixabayData.status}`);
        console.log(`Pixabay totalHits: ${pixabayData.value?.totalHits || 0}`);
        console.log(`Pixabay results count: ${pixabayData.value?.hits?.length || 0}`);
        console.log(`Openverse status: ${openverseData.status}`);
        console.log(`Openverse result_count: ${openverseData.value?.result_count || 0}`);
        console.log(`Openverse results count: ${openverseData.value?.results?.length || 0}`);
        
        const images = [];
        const seenUrls = new Set();
        
        // Extract Pixabay images
        let pixabayCount = 0;
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
                    pixabayCount++;
                }
            });
        }
        
        // Extract Openverse images
        let openverseCount = 0;
        if (openverseData.status === 'fulfilled' && openverseData.value?.results) {
            openverseData.value.results.forEach(img => {
                const url = img.url;
                if (!seenUrls.has(url)) {
                    seenUrls.add(url);
                    images.push({
                        url: url,
                        thumbnail: img.thumbnail || url,
                        title: img.title || query,
                        width: img.width,
                        height: img.height,
                        source: 'openverse'
                    });
                    openverseCount++;
                }
            });
        }
        
        console.log(`Images added - Pixabay: ${pixabayCount}, Openverse: ${openverseCount}, Total: ${images.length}`);

        // Calculate total available from BOTH sources
        const pixabayTotal = pixabayData.status === 'fulfilled' ? (pixabayData.value?.totalHits || 0) : 0;
        const openverseTotal = openverseData.status === 'fulfilled' ? (openverseData.value?.result_count || 0) : 0;
        const totalAvailable = pixabayTotal + openverseTotal;
        
        // Check if there are more pages available from EITHER source
        const pixabayHasMore = pixabayTotal > (page * 200);
        const openverseHasMore = openverseTotal > (page * 200);
        const hasMore = pixabayHasMore || openverseHasMore;

        console.log(`Total available: Pixabay=${pixabayTotal}, Openverse=${openverseTotal}, Combined=${totalAvailable}`);
        console.log(`Has more pages: ${hasMore} (Pixabay: ${pixabayHasMore}, Openverse: ${openverseHasMore})`);
        console.log('=========================');

        res.json({
            query: query,
            page: page,
            total_images: images.length,
            total_available: totalAvailable,
            has_more: hasMore,
            sources_used: {
                pixabay: pixabayData.status === 'fulfilled' && pixabayData.value?.hits?.length > 0,
                openverse: openverseData.status === 'fulfilled' && openverseData.value?.results?.length > 0
            },
            images: images
        });

    } catch (error) {
        console.error('Image search error:', error);
        res.status(500).json({ 
            error: 'Image search failed',
            message: error.message 
        });
    }
});

// AI GENERATION - Search.com
app.get('/api/search/ai', async (req, res) => {
    const query = req.query.q;
    
    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    try {
        const data = await generateAIContent(query);
        res.json(data);

    } catch (error) {
        console.error('AI generation error:', error);
        res.status(500).json({ 
            error: 'AI generation failed',
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
