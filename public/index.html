<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HelpAndSearch - Search that helps homeless charities</title>
    
    <!-- OpenSearch Description for adding as default search engine -->
    <link rel="search" type="application/opensearchdescription+xml" 
          href="/opensearch.xml" 
          title="HelpAndSearch">
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background: #f8f9fa;
            color: #333;
        }

        /* Modal styles */
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            animation: fadeIn 0.3s;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .modal-content {
            background-color: white;
            margin: 10% auto;
            padding: 30px;
            border-radius: 12px;
            max-width: 500px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            animation: slideIn 0.3s;
            max-height: 80vh;
            overflow-y: auto;
        }

        @keyframes slideIn {
            from {
                transform: translateY(-50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .modal-header h2 {
            color: #1a73e8;
            font-size: 22px;
            margin: 0;
        }

        .close-btn {
            background: none;
            border: none;
            font-size: 28px;
            color: #5f6368;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            line-height: 1;
        }

        .close-btn:hover {
            color: #333;
        }

        .modal-body {
            color: #333;
            line-height: 1.6;
        }

        .modal-body h3 {
            color: #1a73e8;
            font-size: 16px;
            margin-top: 15px;
            margin-bottom: 10px;
        }

        .modal-body ol {
            margin-left: 20px;
            margin-bottom: 15px;
        }

        .modal-body li {
            margin-bottom: 8px;
        }

        .modal-body code {
            background: #f5f5f5;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 13px;
            color: #d93025;
        }

        .browser-icon {
            font-size: 20px;
            margin-right: 8px;
        }

        /* Header for results page */
        .header {
            background: white;
            padding: 20px 40px;
            display: flex;
            align-items: center;
            gap: 30px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.06);
            border-bottom: 1px solid #e8eaed;
        }

        .logo {
            font-size: 24px;
            font-weight: 600;
            color: #1a73e8;
            text-decoration: none;
            white-space: nowrap;
            transition: color 0.2s;
            cursor: pointer;
        }

        .logo:hover {
            color: #1557b0;
        }

        .search-container {
            flex: 1;
            max-width: 700px;
            display: flex;
            align-items: center;
            position: relative;
        }

        .search-box {
            width: 100%;
            padding: 12px 50px 12px 20px;
            border: 1px solid #dfe1e5;
            border-radius: 24px;
            font-size: 16px;
            outline: none;
            transition: all 0.2s;
        }

        .search-box:hover {
            box-shadow: 0 1px 6px rgba(32,33,36,.28);
            border-color: rgba(223,225,229,0);
        }

        .search-box:focus {
            box-shadow: 0 1px 6px rgba(32,33,36,.28);
            border-color: rgba(223,225,229,0);
        }

        .search-btn {
            position: absolute;
            right: 15px;
            background: none;
            border: none;
            cursor: pointer;
            font-size: 20px;
            padding: 5px;
            color: #1a73e8;
        }

        /* Tabs */
        .tabs {
            display: flex;
            gap: 20px;
            padding: 0 40px;
            background: white;
            border-bottom: 1px solid #e8eaed;
        }

        .tab {
            padding: 12px 16px;
            cursor: pointer;
            border-bottom: 3px solid transparent;
            color: #5f6368;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.2s;
        }

        .tab:hover {
            color: #1a73e8;
        }

        .tab.active {
            color: #1a73e8;
            border-bottom-color: #1a73e8;
        }

        .tab-icon {
            margin-right: 6px;
        }

        /* Home page container */
        .home-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 0 20px;
            text-align: center;
        }

        .home-content {
            max-width: 650px;
            width: 100%;
        }

        .home-logo {
            font-size: 64px;
            font-weight: 600;
            margin-bottom: 40px;
            color: #1a73e8;
            letter-spacing: -1px;
        }

        .home-search-container {
            position: relative;
            width: 100%;
            margin-bottom: 30px;
        }

        .home-search-box {
            width: 100%;
            padding: 16px 60px 16px 24px;
            border: 1px solid #dfe1e5;
            border-radius: 28px;
            font-size: 16px;
            outline: none;
            background: white;
            transition: all 0.2s;
        }

        .home-search-box:hover {
            box-shadow: 0 2px 8px rgba(32,33,36,.15);
            border-color: rgba(223,225,229,0);
        }

        .home-search-box:focus {
            box-shadow: 0 2px 8px rgba(32,33,36,.15);
            border-color: rgba(223,225,229,0);
        }

        /* Add to browser button */
        .add-to-browser-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 28px;
            background: white;
            border: 1px solid #dadce0;
            border-radius: 24px;
            color: #1a73e8;
            text-decoration: none;
            font-weight: 500;
            font-size: 14px;
            transition: all 0.2s;
            box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            cursor: pointer;
        }

        .add-to-browser-btn:hover {
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            border-color: #1a73e8;
        }

        .add-to-browser-btn::before {
            content: "🔍";
            font-size: 16px;
        }

        /* Results container */
        .results-container {
            max-width: 850px;
            margin: 30px auto;
            padding: 0 20px;
        }

        .result-item {
            background: white;
            padding: 18px 20px;
            margin-bottom: 16px;
            border-radius: 8px;
            border: 1px solid #f0f0f0;
            transition: all 0.2s;
        }

        .result-item:hover {
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            border-color: #e0e0e0;
        }

        .result-url {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 6px;
            font-size: 14px;
            color: #5f6368;
        }

        .result-favicon {
            width: 18px;
            height: 18px;
            border-radius: 4px;
        }

        .result-title {
            font-size: 20px;
            font-weight: 400;
            color: #1a0dab;
            text-decoration: none;
            display: block;
            margin-bottom: 6px;
            line-height: 1.3;
        }

        .result-title:hover {
            text-decoration: underline;
        }

        .result-description {
            font-size: 14px;
            color: #4d5156;
            line-height: 1.58;
        }

        /* Image results */
        .image-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 16px;
            padding: 20px 0;
        }

        .image-item {
            position: relative;
            cursor: pointer;
            border-radius: 8px;
            overflow: hidden;
            transition: transform 0.2s;
            background: white;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .image-item:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .image-item img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            display: block;
        }

        /* AI Results */
        .ai-response {
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            margin: 20px 0;
            line-height: 1.8;
        }

        .ai-response h2 {
            color: #1a73e8;
            font-size: 24px;
            margin-bottom: 20px;
        }

        .ai-response p {
            color: #333;
            font-size: 16px;
            margin-bottom: 15px;
        }

        .ai-disclaimer {
            background: #f8f9fa;
            border-left: 4px solid #1a73e8;
            padding: 15px;
            margin-top: 20px;
            font-size: 14px;
            color: #5f6368;
            border-radius: 4px;
        }

        .loading {
            text-align: center;
            padding: 60px 20px;
            color: #5f6368;
            font-size: 16px;
        }

        .error {
            text-align: center;
            padding: 40px 20px;
            color: #d93025;
            background: white;
            margin: 20px;
            border-radius: 8px;
            border: 1px solid #f0f0f0;
        }

        .hidden {
            display: none;
        }

        .stats {
            color: #70757a;
            font-size: 14px;
            margin-bottom: 20px;
        }

        footer {
            background: white;
            padding: 20px 30px;
            margin-top: auto;
            border-top: 1px solid #e8eaed;
            color: #70757a;
            font-size: 14px;
            text-align: center;
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
            .home-logo {
                font-size: 40px;
            }

            .home-container {
                padding: 0 15px;
            }

            .home-search-box {
                font-size: 14px;
                padding: 14px 55px 14px 20px;
            }

            .add-to-browser-btn {
                font-size: 13px;
                padding: 10px 24px;
            }

            .result-title {
                font-size: 18px;
            }

            .header {
                padding: 15px 20px;
            }

            .logo {
                font-size: 18px;
            }

            .search-container {
                max-width: 100%;
            }

            .result-item {
                padding: 16px;
            }

            .tabs {
                padding: 0 20px;
            }

            .image-grid {
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                gap: 12px;
            }

            .image-item img {
                height: 150px;
            }
        }

        @media (max-width: 480px) {
            .home-logo {
                font-size: 32px;
            }

            .home-search-box {
                font-size: 13px;
                padding: 12px 50px 12px 18px;
            }

            .image-grid {
                grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            }
        }
    </style>
</head>
<body>
    <!-- Home View -->
    <div id="homeView">
        <div class="home-container">
            <div class="home-content">
                <div class="home-logo">HelpAndSearch.com</div>
                <div class="home-search-container">
                    <input type="text" class="home-search-box" id="homeSearchInput" placeholder="When you search here you help homeless charities">
                    <button class="search-btn" onclick="performSearch()">🔍</button>
                </div>
                <button class="add-to-browser-btn" onclick="addSearchEngine(event)">Add HelpAndSearch to your browser</button>
            </div>
        </div>
    </div>

    <!-- Results View -->
    <div id="resultsView" class="hidden">
        <div class="header">
            <div class="logo" onclick="showHome()">HelpAndSearch.com</div>
            <div class="search-container">
                <input type="text" class="search-box" id="resultsSearchInput" placeholder="When you search here you help homeless charities">
                <button class="search-btn" onclick="performSearch()">🔍</button>
            </div>
        </div>

        <!-- Tabs -->
        <div class="tabs">
            <div class="tab active" id="webTab" onclick="switchTab('web')">
                <span class="tab-icon">🌐</span>Web
            </div>
            <div class="tab" id="imagesTab" onclick="switchTab('images')">
                <span class="tab-icon">🖼️</span>Images
            </div>
            <div class="tab" id="aiTab" onclick="switchTab('ai')">
                <span class="tab-icon">🤖</span>AI
            </div>
        </div>
        
        <div class="results-container">
            <div id="stats" class="stats"></div>
            <div id="loading" class="loading hidden">Searching...</div>
            <div id="error" class="error hidden"></div>
            
            <!-- Web Results -->
            <div id="webResults"></div>
            
            <!-- Image Results -->
            <div id="imageResults" class="hidden"></div>
            
            <!-- AI Results -->
            <div id="aiResults" class="hidden"></div>
        </div>
    </div>

    <!-- Modal for browser instructions -->
    <div id="addBrowserModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>🔍 Add HelpAndSearch</h2>
                <button class="close-btn" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body" id="modalBody">
                <!-- Content will be inserted by JavaScript -->
            </div>
        </div>
    </div>

    <footer>
        © 2026 HelpAndSearch.com - All rights reserved | Every search helps homeless charities
    </footer>

    <script>
        // Current search state
        let currentQuery = '';
        let currentTab = 'web';

        // Handle Enter key
        document.getElementById('homeSearchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });

        document.getElementById('resultsSearchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });

        function showHome() {
            document.getElementById('homeView').classList.remove('hidden');
            document.getElementById('resultsView').classList.add('hidden');
            document.getElementById('homeSearchInput').value = '';
            document.getElementById('homeSearchInput').focus();
        }

        function showResults() {
            document.getElementById('homeView').classList.add('hidden');
            document.getElementById('resultsView').classList.remove('hidden');
        }

        function switchTab(tab) {
            currentTab = tab;
            
            // Update tab styling
            document.getElementById('webTab').classList.toggle('active', tab === 'web');
            document.getElementById('imagesTab').classList.toggle('active', tab === 'images');
            document.getElementById('aiTab').classList.toggle('active', tab === 'ai');
            
            // Show/hide results
            document.getElementById('webResults').classList.toggle('hidden', tab !== 'web');
            document.getElementById('imageResults').classList.toggle('hidden', tab !== 'images');
            document.getElementById('aiResults').classList.toggle('hidden', tab !== 'ai');
            
            // If switching tabs and we have a query, fetch new results
            if (currentQuery) {
                if (tab === 'web' && document.getElementById('webResults').innerHTML === '') {
                    performSearch();
                } else if (tab === 'images' && document.getElementById('imageResults').innerHTML === '') {
                    performSearch();
                } else if (tab === 'ai' && document.getElementById('aiResults').innerHTML === '') {
                    performSearch();
                }
            }
        }

        async function performSearch() {
            const homeInput = document.getElementById('homeSearchInput');
            const resultsInput = document.getElementById('resultsSearchInput');
            
            // Get the query from whichever input is active
            let query = '';
            if (document.getElementById('homeView').classList.contains('hidden')) {
                query = resultsInput.value.trim();
            } else {
                query = homeInput.value.trim();
            }

            if (!query) return;

            currentQuery = query;

            // Sync both search boxes
            homeInput.value = query;
            resultsInput.value = query;

            // Show results view
            showResults();

            // Show loading state
            document.getElementById('loading').classList.remove('hidden');
            document.getElementById('error').classList.add('hidden');
            document.getElementById('stats').innerHTML = '';

            try {
                if (currentTab === 'web') {
                    await fetchWebResults(query);
                } else if (currentTab === 'images') {
                    await fetchImageResults(query);
                } else if (currentTab === 'ai') {
                    await fetchAIResults(query);
                }
            } catch (error) {
                console.error('Search error:', error);
                document.getElementById('loading').classList.add('hidden');
                document.getElementById('error').classList.remove('hidden');
                document.getElementById('error').textContent = 'An error occurred. Please try again.';
            }
        }

        async function fetchWebResults(query) {
            const response = await fetch(`/api/search/web?q=${encodeURIComponent(query)}`);
            
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            displayWebResults(data);
        }

        async function fetchImageResults(query) {
            const response = await fetch(`/api/search/images?q=${encodeURIComponent(query)}`);
            
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            displayImageResults(data);
        }

        async function fetchAIResults(query) {
            const response = await fetch(`/api/search/ai?q=${encodeURIComponent(query)}`);
            
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            displayAIResults(data);
        }

        function displayWebResults(data) {
            document.getElementById('loading').classList.add('hidden');
            const resultsDiv = document.getElementById('webResults');
            const statsDiv = document.getElementById('stats');

            // Check if we have results
            if (!data.results || data.results.length === 0) {
                resultsDiv.innerHTML = '<p style="color: #5f6368;">No results found.</p>';
                return;
            }

            // Display stats
            statsDiv.textContent = `About ${data.total_results} results`;

            // Clear previous results
            resultsDiv.innerHTML = '';
            
            // Display results
            data.results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';

                const url = new URL(result.url);
                const domain = url.hostname.replace('www.', '');

                resultItem.innerHTML = `
                    <div class="result-url">
                        <img class="result-favicon" src="https://www.google.com/s2/favicons?domain=${domain}" onerror="this.style.display='none'">
                        <span>${domain}</span>
                    </div>
                    <a href="${result.url}" class="result-title" target="_blank">${result.title}</a>
                    <div class="result-description">${result.desc || ''}</div>
                `;

                resultsDiv.appendChild(resultItem);
            });
        }

        function displayImageResults(data) {
            document.getElementById('loading').classList.add('hidden');
            const resultsDiv = document.getElementById('imageResults');
            const statsDiv = document.getElementById('stats');

            // Check if we have images
            if (!data.images || data.images.length === 0) {
                resultsDiv.innerHTML = '<p style="color: #5f6368;">No images found.</p>';
                return;
            }

            // Display stats without showing source names
            statsDiv.textContent = `${data.total_images} images`;

            // Clear previous results
            resultsDiv.innerHTML = '<div class="image-grid" id="imageGrid"></div>';
            const imageGrid = document.getElementById('imageGrid');
            
            // Display images without source badges
            data.images.forEach(img => {
                const imageItem = document.createElement('div');
                imageItem.className = 'image-item';
                imageItem.onclick = () => window.open(img.url, '_blank');

                imageItem.innerHTML = `
                    <img src="${img.thumbnail}" alt="${img.title}" loading="lazy">
                `;

                imageGrid.appendChild(imageItem);
            });
        }

        function displayAIResults(data) {
            document.getElementById('loading').classList.add('hidden');
            const resultsDiv = document.getElementById('aiResults');
            const statsDiv = document.getElementById('stats');

            // Hide stats for AI
            statsDiv.textContent = '';

            // Check if we have a response
            if (!data.response) {
                resultsDiv.innerHTML = '<p style="color: #5f6368;">No response generated.</p>';
                return;
            }

            // Clear previous results
            resultsDiv.innerHTML = '';

            // Display AI response
            const aiResponse = document.createElement('div');
            aiResponse.className = 'ai-response';

            // Format the response - split by line breaks
            const formattedResponse = data.response.split('\n').map(line => {
                if (line.trim().startsWith('##')) {
                    return `<h2>${line.replace('##', '').trim()}</h2>`;
                } else if (line.trim()) {
                    return `<p>${line}</p>`;
                }
                return '';
            }).join('');

            aiResponse.innerHTML = `
                ${formattedResponse}
                <div class="ai-disclaimer">
                    💡 AI-generated content. Always verify important information.
                </div>
            `;

            resultsDiv.appendChild(aiResponse);
        }

        function addSearchEngine(event) {
            event.preventDefault();
            
            // Detect browser
            const userAgent = navigator.userAgent.toLowerCase();
            let browser = 'chrome';
            
            if (userAgent.indexOf('firefox') > -1) {
                browser = 'firefox';
            } else if (userAgent.indexOf('safari') > -1 && userAgent.indexOf('chrome') === -1) {
                browser = 'safari';
            } else if (userAgent.indexOf('edg') > -1) {
                browser = 'edge';
            } else if (userAgent.indexOf('brave') > -1 || navigator.brave) {
                browser = 'brave';
            }
            
            const modal = document.getElementById('addBrowserModal');
            const modalBody = document.getElementById('modalBody');
            
            let instructions = '';
            const searchUrl = window.location.origin + '/search?q=%s';
            
            if (browser === 'firefox') {
                instructions = `
                    <h3><span class="browser-icon">🦊</span>Firefox</h3>
                    <p style="margin-bottom: 15px;"><strong>Step 1: Add the search engine</strong></p>
                    <ol>
                        <li><strong>Right-click</strong> in the address bar (while on this page)</li>
                        <li>Select <strong>"Add HelpAndSearch"</strong></li>
                        <li>If you see "already exists" - skip to Step 2!</li>
                    </ol>
                    <p style="margin-top: 15px; margin-bottom: 10px;"><strong>Step 2: Make it your default</strong></p>
                    <ol>
                        <li>Type <code>about:preferences#search</code> in the address bar</li>
                        <li>Or go to Settings → Search</li>
                        <li>Under "Default Search Engine", select <strong>HelpAndSearch</strong></li>
                    </ol>
                `;
            } else if (browser === 'safari') {
                instructions = `
                    <h3><span class="browser-icon">🧭</span>Safari</h3>
                    <p style="background: #fff3cd; padding: 10px; border-radius: 6px; margin-bottom: 15px; font-size: 14px;">
                        ⚠️ Safari doesn't support custom search engines without extensions
                    </p>
                    <p><strong>Options:</strong></p>
                    <ol>
                        <li>Bookmark this page and use it directly</li>
                        <li>Or install an extension like "Any Search" from the App Store</li>
                    </ol>
                `;
            } else if (browser === 'edge') {
                instructions = `
                    <h3><span class="browser-icon">🔷</span>Microsoft Edge</h3>
                    <p style="margin-bottom: 15px;"><strong>Step 1: Add the search engine</strong></p>
                    <ol>
                        <li>Click the three dots (⋮) → <strong>Settings</strong></li>
                        <li>Go to <strong>Privacy, search, and services</strong></li>
                        <li>Scroll down to <strong>Services</strong></li>
                        <li>Click <strong>Address bar and search</strong></li>
                        <li>Click <strong>Manage search engines</strong></li>
                        <li>Click <strong>Add</strong></li>
                        <li>Enter:<br>
                            • Search engine: <code>HelpAndSearch</code><br>
                            • Keyword: <code>helpandsearch</code><br>
                            • URL: <code>${searchUrl}</code>
                        </li>
                        <li>Click <strong>Add</strong></li>
                    </ol>
                    <p style="margin-top: 15px; margin-bottom: 10px;"><strong>Step 2: Make it default</strong></p>
                    <ol>
                        <li>Find HelpAndSearch in the list</li>
                        <li>Click the three dots (⋮) next to it</li>
                        <li>Click <strong>"Make default"</strong></li>
                    </ol>
                `;
            } else if (browser === 'brave') {
                instructions = `
                    <h3><span class="browser-icon">🦁</span>Brave Browser</h3>
                    <p style="margin-bottom: 15px;"><strong>Step 1: Add the search engine</strong></p>
                    <ol>
                        <li>Click the three lines (☰) → <strong>Settings</strong></li>
                        <li>Go to <strong>Search engine</strong></li>
                        <li>Click <strong>Manage search engines and site search</strong></li>
                        <li>Under "Site search", click <strong>Add</strong></li>
                        <li>Enter:<br>
                            • Search engine: <code>HelpAndSearch</code><br>
                            • Shortcut: <code>helpandsearch</code><br>
                            • URL: <code>${searchUrl}</code>
                        </li>
                        <li>Click <strong>Add</strong></li>
                    </ol>
                    <p style="margin-top: 15px; margin-bottom: 10px;"><strong>Step 2: Make it default</strong></p>
                    <ol>
                        <li>Find HelpAndSearch in the list</li>
                        <li>Click the three dots (⋮) next to it</li>
                        <li>Click <strong>"Make default"</strong></li>
                    </ol>
                `;
            } else {
                instructions = `
                    <h3><span class="browser-icon">🌐</span>Chrome</h3>
                    <p style="margin-bottom: 15px;"><strong>Step 1: Add the search engine</strong></p>
                    <ol>
                        <li>Click the three dots (⋮) → <strong>Settings</strong></li>
                        <li>In the left sidebar, click <strong>Search engine</strong></li>
                        <li>Click <strong>Manage search engines and site search</strong></li>
                        <li>Under "Site search", click <strong>Add</strong></li>
                        <li>Enter:<br>
                            • Search engine: <code>HelpAndSearch</code><br>
                            • Shortcut: <code>helpandsearch</code><br>
                            • URL: <code>${searchUrl}</code>
                        </li>
                        <li>Click <strong>Add</strong></li>
                    </ol>
                    <p style="margin-top: 15px; margin-bottom: 10px;"><strong>Step 2: Make it default</strong></p>
                    <ol>
                        <li>Find HelpAndSearch in the list</li>
                        <li>Click the three dots (⋮) next to it</li>
                        <li>Click <strong>"Make default"</strong></li>
                    </ol>
                `;
            }
            
            modalBody.innerHTML = instructions;
            modal.style.display = 'block';
        }

        function closeModal() {
            document.getElementById('addBrowserModal').style.display = 'none';
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            const modal = document.getElementById('addBrowserModal');
            if (event.target === modal) {
                closeModal();
            }
        }

        // Focus on search input when page loads
        window.onload = () => {
            document.getElementById('homeSearchInput').focus();
            
            // Check if there's a search query in the URL (from OpenSearch)
            const urlParams = new URLSearchParams(window.location.search);
            const searchQuery = urlParams.get('q');
            
            if (searchQuery) {
                document.getElementById('homeSearchInput').value = searchQuery;
                document.getElementById('resultsSearchInput').value = searchQuery;
                performSearch();
            }
        };
    </script>
</body>
</html>
