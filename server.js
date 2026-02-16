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

// Helper function to fetch images from Pixabay
async function fetchPixabay(query) {
    const params = new URLSearchParams({
        key: process.env.PIXABAY_API_KEY,
        q: query,
        image_type: 'photo',
        per_page: 30
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

// WEB SEARCH - Mojeek only
app.get('/api/search/web', async (req, res) => {
    const query = req.query.q;
    
    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    try {
        const data = await fetchMojeek(query);
        
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

        res.json({
            query: query,
            total_results: results.length,
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

// IMAGE SEARCH - Pixabay only
app.get('/api/search/images', async (req, res) => {
    const query = req.query.q;
    
    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    try {
        const data = await fetchPixabay(query);
        
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

        res.json({
            query: query,
            total_images: images.length,
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
