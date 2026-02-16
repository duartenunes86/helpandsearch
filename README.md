# HelpAndSearch.com - Multi-Source Search Engine

A privacy-focused search engine that helps homeless charities with every search. Combines results from multiple sources for better coverage.

## 🌟 Features

- **Mixed Web Search**: Combines Mojeek + Search.com results
- **Mixed Image Search**: Combines Search.com + Pixabay images  
- **De-duplication**: Removes duplicate URLs automatically
- **OpenSearch Support**: Add as default browser search engine
- **Mobile Responsive**: Works on all devices
- **Privacy Focused**: Helps homeless charities with each search

## 🔑 API Sources

### Web Search:
1. **Mojeek** - £1/1,000 searches (Primary)
2. **Search.com** - FREE + revenue sharing (Secondary/Backup)

### Image Search:
1. **Search.com** - FREE images
2. **Pixabay** - FREE images (5,000/hour)

## 📋 **ACTION NEEDED: Get Pixabay API Key**

Go to https://pixabay.com/api/docs/ and sign up to get your FREE API key!

Then add it to Render environment variables:
- Variable name: `PIXABAY_API_KEY`
- Value: your_pixabay_key_here

## 💰 Cost Breakdown

- **Web Search**: £1 per 1,000 (Mojeek only, Search.com is free)
- **Image Search**: FREE (both Search.com and Pixabay)
- **Total Cost**: ~£1 per 1,000 web searches

## 🚀 Deployment

Upload these files to GitHub, then Render will auto-deploy!

**Live URL**: https://helpandsearch.onrender.com
