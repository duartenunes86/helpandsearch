# Simple Search Engine

A clean, Google-like search engine powered by the Mojeek Search API.

## Setup Instructions

### 1. Get a Mojeek API Key

1. Go to https://www.mojeek.com/services/search/web-search-api/
2. Click "Get in touch" to discuss your requirements and get API access
3. You'll receive your API key (they offer a free trial with limited queries)

### 2. Configure the Application

1. Open `index.html` in a text editor
2. Find the line: `const API_KEY = 'YOUR_MOJEEK_API_KEY_HERE';`
3. Replace `YOUR_MOJEEK_API_KEY_HERE` with your actual API key
4. Save the file

### 3. Run the Application

You have several options:

**Option A: Simple HTTP Server (Python)**
```bash
python3 -m http.server 8000
```
Then open http://localhost:8000 in your browser

**Option B: Simple HTTP Server (Node.js)**
```bash
npx serve
```

**Option C: Just open the file**
You can also just open `index.html` directly in your browser, but some browsers may block API requests due to CORS. Using a local server is recommended.

### 4. Deploy Online (Optional)

To make it publicly accessible:

**Free Options:**
- **GitHub Pages**: Push to GitHub, enable Pages in settings
- **Netlify**: Drag and drop the file
- **Vercel**: Import from GitHub or drag and drop
- **Cloudflare Pages**: Connect to GitHub or upload directly

## Features

- Clean, Google-like interface
- Fast search results from Mojeek's independent search index
- No sign-up or authentication required
- Mobile responsive
- Shows favicons and result snippets
- Privacy-focused (Mojeek doesn't track users)

## Important Notes

⚠️ **Security Warning**: Your API key will be visible in the browser's source code. For a production application, you should:
- Use a backend server to hide your API key
- Implement rate limiting to prevent abuse
- Add monitoring for usage

⚠️ **Cost Warning**: Mojeek pricing:
- Free trial with limited queries available
- Pricing is "significantly lower than Bing's $15/1,000 queries" (contact them for exact rates)
- Independent search index (not reselling Google/Bing results)
- Can get up to 40-100 results per query
- Complete freedom to reorder results or combine with other search engines

Without rate limiting, your API usage could spike quickly if the site gets traffic. Monitor your usage on the Mojeek dashboard.

## Why Mojeek?

- **Independent**: Mojeek crawls its own web index, not dependent on Google or Bing
- **Privacy**: No user tracking
- **Flexible**: Freedom to reorder results, combine with other sources
- **Competitive pricing**: Lower than many alternatives
- **Customizable**: Extensive API options for snippet length, safe search, clustering, etc.

## Recommended Next Steps

Once you test this and see if people use it, consider:
1. Moving the API key to a backend server (Node.js/Express, Python/Flask, etc.)
2. Adding IP-based rate limiting
3. Implementing basic analytics to track usage
4. Adding a CAPTCHA for additional protection

## License

Free to use and modify.
