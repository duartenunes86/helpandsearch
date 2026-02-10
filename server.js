const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow requests from your frontend
app.use(express.json());
app.use(express.static('public')); // Serve frontend files

// Search endpoint - this hides your API key
app.get('/api/search', async (req, res) => {
    const query = req.query.q;
    
    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    try {
        // Build Mojeek API URL
        const params = new URLSearchParams({
            api_key: process.env.MOJEEK_API_KEY, // API key is hidden on server
            q: query,
            t: 10,  // Number of results
            fmt: 'json'
        });

        const mojeekUrl = `https://www.mojeek.com/search?${params.toString()}`;

        // Make request to Mojeek
        const response = await fetch(mojeekUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Mojeek API error: ${response.status}`);
        }

        const data = await response.json();
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
