# Search Engine with Secure Backend

A Google-like search engine powered by Mojeek Search API with a secure Node.js backend that hides your API key.

## 🔒 Why Use a Backend?

**Security**: Your API key is stored on the server, not in the browser code where anyone can steal it.
**Protection**: You can add rate limiting, authentication, and other security measures on the server.
**Control**: Monitor and manage API usage from one place.

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)
- A Mojeek API key

## 🚀 Quick Start

### 1. Get a Mojeek API Key

1. Visit https://www.mojeek.com/services/search/web-search-api/
2. Click "Get in touch" to request API access
3. You'll receive your API key (free trial available)

### 2. Install Dependencies

```bash
npm install
```

This installs:
- `express` - Web server
- `cors` - Allow frontend to talk to backend
- `dotenv` - Manage environment variables

### 3. Configure Your API Key

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and add your Mojeek API key:
```
MOJEEK_API_KEY=your_actual_api_key_here
PORT=3000
```

⚠️ **IMPORTANT**: Never commit the `.env` file to GitHub! It's already in `.gitignore`.

### 4. Run Locally

```bash
npm start
```

Your search engine will be available at: http://localhost:3000

## 📁 Project Structure

```
search-engine/
├── server.js              # Backend server (hides API key)
├── public/
│   └── index.html        # Frontend (no API key here!)
├── package.json          # Dependencies
├── .env.example          # Template for environment variables
├── .env                  # Your actual API key (never commit!)
└── .gitignore           # Protects sensitive files
```

## 🌐 Deploying to Production

### Option 1: Render (Recommended - Free Tier)

1. Push your code to GitHub
2. Go to https://render.com
3. Sign up and click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add environment variable:
   - Key: `MOJEEK_API_KEY`
   - Value: Your API key
7. Click "Create Web Service"

Your site will be live at `https://your-app-name.onrender.com`

### Option 2: Railway

1. Push your code to GitHub
2. Go to https://railway.app
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variable `MOJEEK_API_KEY`
6. Deploy!

### Option 3: Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-search-engine`
4. Set API key: `heroku config:set MOJEEK_API_KEY=your_key`
5. Deploy: `git push heroku main`

### Option 4: DigitalOcean App Platform

1. Push to GitHub
2. Go to https://cloud.digitalocean.com/apps
3. Click "Create App" → Connect GitHub
4. Add environment variable `MOJEEK_API_KEY`
5. Deploy!

## 🛡️ Security Features

✅ **API Key Hidden**: Stored on server, not in browser code
✅ **CORS Enabled**: Only your frontend can access the API
✅ **.gitignore**: Prevents committing sensitive files
✅ **Environment Variables**: Secure key management

## 🔧 Optional: Add Rate Limiting

To prevent abuse, you can add rate limiting. Install:

```bash
npm install express-rate-limit
```

Then add to `server.js`:

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## 📊 Monitoring Usage

Check your Mojeek dashboard regularly to monitor:
- Number of API calls
- Remaining quota
- Costs (if on paid plan)

## 🆘 Troubleshooting

**"Cannot find module 'express'"**
- Run `npm install`

**"MOJEEK_API_KEY is not defined"**
- Make sure you created `.env` file
- Check that the key is spelled correctly

**"CORS error"**
- Make sure your backend is running
- Check that CORS is enabled in `server.js`

**"Port 3000 already in use"**
- Change PORT in `.env` to something else (like 3001)
- Or stop the other process using port 3000

## 📝 Development vs Production

**Local Development:**
- Frontend and backend run together on localhost:3000
- Uses `.env` file for API key

**Production:**
- Backend runs on hosting service (Render, Railway, etc.)
- API key stored in hosting platform's environment variables
- Frontend served from the same server

## 🎯 Next Steps

1. **Add Analytics**: Track search queries to understand usage
2. **Implement Caching**: Cache popular searches to reduce API calls
3. **Add Features**: Search filters, image search, news search
4. **Custom Domain**: Point your domain to the hosted app

## 💰 Cost Estimates

**Hosting**: Free tier available on Render, Railway, Heroku
**API Costs**: Contact Mojeek for exact pricing (lower than Bing's $15/1k)

## 📄 License

Free to use and modify.
