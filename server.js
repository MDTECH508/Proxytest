const http = require('http');
const httpProxy = require('http-proxy');

// 1. Kreye objè proxy a
const proxy = httpProxy.createProxyServer({});

// Render ap ba ou yon pò otomatik nan anviwònman yo (process.env.PORT) oswa l ap pran 9999
const PORT = process.env.PORT || 9999; 
const TARGET_SERVER = 'https://dns.google';

// 2. PATI POU INJECTION AN (Lè yon demann ap pase)
proxy.on('proxyReq', function(proxyReq, req, res, options) {
    // Enjeksyon Headers pèsonalize yo
    proxyReq.setHeader('X-Developer', 'FAKE TECH DEVIL INJECT');
    proxyReq.setHeader('X-Power-Status', 'OVERRIDE-ACTIVE');
    proxyReq.setHeader('X-Custom-Auth', 'FakeXsensiV1-Authorized');
    
    // Mesaj k ap parèt nan log Render yo chak fwa yon moun ap itilize proxy a
    console.log(`[INJECTED] FAKE TECH DEVIL INJECT -> Trafik optimize avèk siksè!`);
});

// 3. Demarre Sèvè HTTP Proxy a
const server = http.createServer(function(req, res) {
    // Pèmèt paj Vercel ou an kontakte sèvè sa a san blokaj CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    
    // Yon senp liy pou tcheke si sèvè a an liy
    if (req.url === '/status') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ status: "online", msg: "FAKE TECH DEVIL INJECT ACTIVE" }));
    }

    proxy.web(req, res, { target: TARGET_SERVER, changeOrigin: true });
});

// 4. MESAJ LÈ PROXY A AKTIVE (Lè l limen)
server.listen(PORT, () => {
    console.log(`=============================================`);
    console.log(`⚡               FAKE TECH IN               ⚡`);
    console.log(`=============================================`);
    console.log(`🔥 Sèvè FakeXsensiV1 an liy sou pò: ${PORT}   🔥`);
    console.log(`=============================================`);
});
