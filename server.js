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

        // Get total hits from Mojeek response
        const totalHits = data?.response?.head?.hits || 0;
        const resultsPerPage = 10;
        const currentResultCount = page * resultsPerPage;

        console.log(`Mojeek search: "${query}" - Page ${page} - Total hits: ${totalHits} - Results on page: ${results.length}`);

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

// IMAGE SEARCH - Pixabay only with pagination
app.get('/api/search/images', async (req, res) => {
    const query = req.query.q;
    const page = parseInt(req.query.page) || 1;
    
    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    try {
        const data = await fetchPixabay(query, page);
        
        const images = [];
        if (data?.hits) {
            data.hits.forEach(img => {
                images.push({
                    url: img.largeImageURL,
                    thumbnail: img.previewURL,
                    title: img.tags || query,
                    width: img.imageWidth,
                    height: img.imageHeight
                });
            });
        }

        const totalHits = data.totalHits || 0;
        const imagesPerPage = 200;
        const currentImageCount = page * imagesPerPage;

        console.log(`Pixabay search: "${query}" - Page ${page} - Total hits: ${totalHits} - Images on page: ${images.length}`);
        console.log(`Has more: ${currentImageCount < totalHits && images.length > 0}`);

        res.json({
            query: query,
            page: page,
            total_images: images.length,
            total_available: totalHits,
            has_more: currentImageCount < totalHits && images.length > 0,
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
