const http = require('http');
const httpProxy = require('http-proxy');

// 1. Kreye objè proxy a
const proxy = httpProxy.createProxyServer({});

// Pò otomatik Render
const PORT = process.env.PORT || 9999; 

// N ap sèvi ak Cloudflare pou vitès bypass la ultra-rapid
const TARGET_DNS = 'https://1.1.1.1';

// 2. PATI POU INJECTION AN
proxy.on('proxyReq', function(proxyReq, req, res, options) {
    // Enjeksyon Headers pèsonalize yo
    proxyReq.setHeader('X-Developer', 'FAKE TECH DEVIL INJECT');
    proxyReq.setHeader('X-Power-Status', 'FAKE TECH IN');
    proxyReq.setHeader('X-Custom-Auth', 'FakeXsensiV1-Authorized');
});

// 3. Sèvè HTTP Proxy
const server = http.createServer(function(req, res) {
    // Règleman CORS konplè pou pèmèt Vercel li PING lan san restriksyon
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');

    // Reponn byen rapid si navigatè a fè yon demann "OPTIONS" (Pre-flight CORS)
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        return res.end();
    }

    // A. TRAFIK IPHONE POU JWÈT LA (/dns-query)
    if (req.url.startsWith('/dns-query')) {
        proxy.web(req, res, { target: TARGET_DNS, changeOrigin: true });
        return;
    }
    
    // B. ROUTE STATUS AJUSTE POU PING AN TAN REYÈL CHAK SEGOND
    // Nou itilize .startsWith paske URL la ap gen "?t=1234567..." anndan l
    if (req.url.startsWith('/status')) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ status: "online", msg: "POWERED BY FAKE TECH SENSI V1" }));
    }

    // C. EKRAN AKÈY SIT LA AVÈK NEW STYLE LAN
    if (req.url === '/' || req.url === '') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>FAKE TECH SENSI V1</title>
                <style>
                    body { 
                        background: #05050a; 
                        color: #ffffff; 
                        font-family: 'Courier New', monospace; 
                        text-align: center; 
                        padding-top: 80px;
                        margin: 0;
                    }
                    .box { 
                        border: 2px dashed #ff0055; 
                        display: inline-block; 
                        padding: 35px; 
                        background: rgba(10, 10, 20, 0.9); 
                        border-radius: 12px; 
                        box-shadow: 0 0 25px rgba(255, 0, 85, 0.4); 
                    }
                    h1 { 
                        color: #ff0055; 
                        text-shadow: 0 0 15px #ff0055; 
                        font-size: 28px;
                        letter-spacing: 3px;
                        margin-bottom: 5px;
                    }
                    h2 { 
                        color: #00f0ff; 
                        text-shadow: 0 0 15px #00f0ff; 
                        font-size: 18px;
                        margin-top: 5px;
                    }
                    .status {
                        color: #00ff66;
                        font-weight: bold;
                        text-shadow: 0 0 8px #00ff66;
                        font-size: 14px;
                        margin-top: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="box">
                    <h1>⚡ POWERED BY FAKE TECH SENSI V1 ⚡</h1>
                    <h2>HEAD DNS 100!@ SAFE SECURE AND MORE.</h2>
                    <p style="color: #888; font-size: 12px;">SYSTEM STATUS: BYPASS OVERRIDE ACTIVE</p>
                    <div class="status">[ ONLINE & INJECTING ]</div>
                </div>
            </body>
            </html>
        `);
    }

    proxy.web(req, res, { target: TARGET_SERVER, changeOrigin: true });
});

// 4. Limen sèvè a
server.listen(PORT, () => {
    console.log(`=============================================`);
    console.log(`🚀       ULTRA FAST ENGINE DEPLOYED          🚀`);
    console.log(`=============================================`);
});
