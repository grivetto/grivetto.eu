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

// Ottiene il tempo corrente sincronizzato con Binance
async function getBinanceTime() {
    try {
        const res = await fetch('https://api.binance.com/api/v3/time');
        const data = await res.json();
        return data.serverTime;
    } catch {
        return Date.now();
    }
}

// Fetch autenticato verso Binance
async function binanceFetch(path, params, apiKey, apiSecret) {
    const ts = await getBinanceTime();
    const query = new URLSearchParams({ ...params, timestamp: ts, recvWindow: 60000 }).toString();
    const sig = await hmacSha256(apiSecret, query);
    const url = `https://api.binance.com${path}?${query}&signature=${sig}`;
    const res = await fetch(url, { headers: { 'X-MBX-APIKEY': apiKey } });
    if (!res.ok) {
        const errBody = await res.text();
        throw new Error(`Binance ${path} → ${res.status}: ${errBody}`);
    }
    return res.json();
}

// Calcola P&L e statistiche dalle trades di tutti gli account
function calcStats(trades) {
    let profit = 0;
    let wins = 0;
    let total = 0;

    for (const t of trades) {
        if (t.isBuyer) continue; // Considera solo i SELL per il P&L semplificato
        const gain = parseFloat(t.quoteQty) - parseFloat(t.commission || 0);
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

            const pairs = (env.TRADING_PAIRS || 'SOLEUR,ADAEUR,BTCUSDT,ETHUSDT,SOLUSDT').split(',');
            const allTrades = [];

            // 2. Recupera trade dall'account principale
            for (const symbol of pairs) {
                try {
                    const trades = await binanceFetch('/api/v3/myTrades', { symbol, limit: 1000 }, apiKey, apiSecret);
                    allTrades.push(...trades);
                } catch (e) {
                    console.warn(`Could not fetch main account trades for ${symbol}: ${e.message}`);
                }
            }

            // 3. Recupera lista sub-account ed effettua il fetch delle trade per ciascun sub-account
            try {
                const subAccountRes = await binanceFetch('/sapi/v1/sub-account/list', {}, apiKey, apiSecret);
                if (subAccountRes && subAccountRes.subAccounts) {
                    for (const sub of subAccountRes.subAccounts) {
                        const email = sub.email;
                        for (const symbol of pairs) {
                            try {
                                // Usa l'endpoint per le trade dei sub-account
                                const subTrades = await binanceFetch('/sapi/v1/sub-account/sub/userHistory', {
                                    email,
                                    symbol,
                                    limit: 1000
                                }, apiKey, apiSecret);
                                if (Array.isArray(subTrades)) {
                                    allTrades.push(...subTrades);
                                }
                            } catch (err) {
                                console.warn(`Could not fetch sub-account (${email}) trades for ${symbol}: ${err.message}`);
                            }
                        }
                    }
                }
            } catch (subErr) {
                console.warn(`Could not fetch sub-accounts list: ${subErr.message}`);
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
