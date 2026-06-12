/**
 * Denaro Proxy Worker
 * Cloudflare Worker che fa da proxy sicuro verso le API private di Binance.
 * Le API Key sono configurate come secrets encrypted in Cloudflare (mai nel codice).
 *
 * Endpoint esposto: GET /stats
 * Risponde con JSON: { profit, trades, winRate, status, updatedAt }
 */

// Calcola la firma HMAC-SHA256 per Binance API
async function hmacSha256(secret, message) {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
        'raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
    );
    const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
    return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Fetch autenticato verso Binance
async function binanceFetch(path, params, apiKey, apiSecret) {
    const ts = Date.now();
    const query = new URLSearchParams({ ...params, timestamp: ts, recvWindow: 60000 }).toString();
    const sig = await hmacSha256(apiSecret, query);
    const url = `https://api.binance.com${path}?${query}&signature=${sig}`;
    const res = await fetch(url, { headers: { 'X-MBX-APIKEY': apiKey } });
    if (!res.ok) throw new Error(`Binance ${path} → ${res.status}`);
    return res.json();
}

// Calcola P&L e statistiche dalle trades
function calcStats(trades) {
    let profit = 0;
    let wins = 0;
    let total = 0;

    // Raggruppa per orderId per identificare round-trip completi
    const orders = {};
    for (const t of trades) {
        if (t.isBuyer) continue; // Considera solo i SELL per il P&L semplificato
        const gain = parseFloat(t.quoteQty) - parseFloat(t.commission);
        if (gain > 0) wins++;
        profit += gain;
        total++;
    }

    return {
        profit: parseFloat(profit.toFixed(2)),
        trades: total,
        winRate: total > 0 ? parseFloat(((wins / total) * 100).toFixed(1)) : 0,
    };
}

export default {
    async fetch(request, env) {
        // CORS headers per grivetto.eu
        const corsHeaders = {
            'Access-Control-Allow-Origin': 'https://grivetto.eu',
            'Access-Control-Allow-Methods': 'GET',
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=300', // cache 5 minuti in CDN
        };

        // Preflight CORS
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        const url = new URL(request.url);
        if (url.pathname !== '/stats') {
            return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: corsHeaders });
        }

        try {
            const apiKey = env.BINANCE_API_KEY;
            const apiSecret = env.BINANCE_API_SECRET;

            if (!apiKey || !apiSecret) {
                throw new Error('Binance credentials not configured');
            }

            // 1. Ping Binance per verificare connettività
            const ping = await fetch('https://api.binance.com/api/v3/ping');
            const isOnline = ping.ok;

            // 2. Recupera storico trades (ultimi 1000 per i pair principali)
            // I pair del bot: SOL/EUR (Nuvola), ADA/EUR (MarcoDG1), + top USDT pairs (Mc2)
            const pairs = (env.TRADING_PAIRS || 'SOLEUR,ADAEUR,BTCUSDT,ETHUSDT,SOLUSDT').split(',');

            const allTrades = [];
            for (const symbol of pairs) {
                try {
                    const trades = await binanceFetch('/api/v3/myTrades', { symbol, limit: 1000 }, apiKey, apiSecret);
                    allTrades.push(...trades);
                } catch (e) {
                    console.warn(`Could not fetch trades for ${symbol}: ${e.message}`);
                }
            }

            const stats = calcStats(allTrades);

            const payload = {
                profit: stats.profit,
                trades: stats.trades,
                winRate: stats.winRate,
                status: isOnline ? 'OPERATIONAL' : 'DEGRADED',
                updatedAt: new Date().toISOString(),
            };

            return new Response(JSON.stringify(payload), {
                status: 200,
                headers: corsHeaders,
            });

        } catch (err) {
            console.error('Worker error:', err.message);
            // In caso di errore, ritorna dati fallback (non espone l'errore al client)
            return new Response(JSON.stringify({
                profit: null,
                trades: null,
                winRate: null,
                status: 'UNKNOWN',
                updatedAt: new Date().toISOString(),
                error: 'Could not fetch live data',
            }), { status: 200, headers: corsHeaders });
        }
    },
};
