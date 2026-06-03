const http = require('http');
const httpProxy = require('http-proxy');

// 1. Kreye objè proxy a
const proxy = httpProxy.createProxyServer({});

// Render ap bay pò a otomatikman nan anviwònman li
const PORT = process.env.PORT || 9999; 

// Sèvè DNS sekirite ak jwèt (Cloudflare/Google)
const TARGET_DNS = 'https://dns.google';

// 2. PATI POU INJECTION AN (Lè yon demann ap pase)
proxy.on('proxyReq', function(proxyReq, req, res, options) {
    // Enjeksyon Headers pèsonalize yo nan trafik la
    proxyReq.setHeader('X-Developer', 'FAKE TECH DEVIL INJECT');
    proxyReq.setHeader('X-Power-Status', 'FAKE TECH IN');
    proxyReq.setHeader('X-Custom-Auth', 'FakeXsensiV1-Authorized');
    
    console.log(`[INJECTED] FAKE TECH DEVIL INJECT -> Trafik rezo optimize!`);
});

// 3. Demarre Sèvè HTTP Proxy a
const server = http.createServer(function(req, res) {
    // Pèmèt paj Vercel ou an kontakte sèvè sa a san blokaj CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // A. SI SE IPHONE LAN K AP SÈVI AK LYN NAN POU DNS (Free Fire)
    if (req.url.startsWith('/dns-query')) {
        proxy.web(req, res, { target: TARGET_DNS, changeOrigin: true });
        return;
    }
    
    // B. ROUTE STATUS POU PANEL VERCEL LAN (Pou bouton an ka vire vèt)
    if (req.url === '/status') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ status: "online", msg: "FAKE TECH DEVIL INJECT ACTIVE" }));
    }

    // C. SI YON MOUN KLIKE SOU LYEN AN DIRÈK (Ekran Akèy Pwojè a)
    if (req.url === '/' || req.url === '') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(`
            <style>
                body { background: #0a0a12; color: #00f0ff; font-family: monospace; text-align: center; padding-top: 50px; }
                h1 { text-shadow: 0 0 10px #00f0ff; color: #00f0ff; }
                h2 { color: #ff0055; text-shadow: 0 0 10px #ff0055; }
                .box { border: 1px solid #00f0ff; display: inline-block; padding: 20px; background: rgba(20,20,35,0.8); border-radius: 8px; box-shadow: 0 0 15px rgba(0,240,255,0.3); }
            </style>
            <div class="box">
                <h1>⚡ FAKE TECH IN ⚡</h1>
                <h2>PROXIED & INJECTED ACTIVE</h2>
                <p style="color:#fff;">Sèvè FakeXsensiV1 ap kouri ak siksè.</p>
                <p style="color:#00ff66;">[STATUS: FAKE TECH DEVIL INJECT]</p>
            </div>
        `);
    }

    // Pou nenpòt lòt kalite demann
    proxy.web(req, res, { target: TARGET_DNS, changeOrigin: true });
});

// 4. MESAJ LÈ SÈVÈ A FIN LIMEN NÈT
server.listen(PORT, () => {
    console.log(`=============================================`);
    console.log(`⚡               FAKE TECH IN               ⚡`);
    console.log(`=============================================`);
    console.log(`🔥 Sèvè FakeXsensiV1 an liy sou pò: ${PORT}   🔥`);
    console.log(`=============================================`);
});
