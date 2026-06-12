import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './DenaroMachine.css';

// URL del Cloudflare Worker proxy
// Dopo il deploy del Worker, sostituire con l'URL reale (es: https://denaro-proxy.<account>.workers.dev/stats)
const WORKER_URL = 'https://denaro-proxy.grivetto.eu/stats';

// Intervallo di refresh dei dati live (5 minuti)
const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

// Valori di fallback (usati se il Worker non risponde)
const FALLBACK_STATS = { profit: 118.91, trades: 374, winRate: 22.2 };

const LOG_POOL = [
    { type: 'system',   text: '[SYSTEM] Denaro Multi-Node Trading Core - ONLINE' },
    { type: 'watchdog', text: '[WATCHDOG] All nodes healthy | uptime 146h | CPU 1.8%' },
    { type: 'nuvola',   text: '[NUVOLA] SOL/EUR 70.49 | regime: Low-Vol Bull | grid OK' },
    { type: 'nuvola',   text: '[NUVOLA] LIMIT BUY filled: 0.139 SOL at 70.25' },
    { type: 'mc2',      text: '[MC2] BTC/USDT momentum trigger - scalp BUY executed' },
    { type: 'mc2',      text: '[MC2] Scalp closed +0.78% | gain: 2.84' },
    { type: 'marcodg1', text: '[MARCODG1] ADA/EUR 0.385 | 15 Buy / 15 Sell levels active' },
    { type: 'marcodg1', text: '[MARCODG1] LIMIT SELL placed at 0.392' },
    { type: 'watchdog', text: '[WATCHDOG] Profit consolidated on Binance sub-accounts' },
    { type: 'system',   text: '[SYSTEM] Fetching live data from Binance...' },
];

const EVENTS = [
    { key: 'sol',   label: 'SOL Breakout', icon: '📈', color: 'sol',   logs: ['[NUVOLA] SOL/EUR breakout! ATR +2.8%', '[NUVOLA] SELL 0.18 SOL at 71.85', '[SYSTEM] Gain: +1.84'], delta: 1.84 },
    { key: 'ada',   label: 'ADA Grid',     icon: '📉', color: 'ada',   logs: ['[MARCODG1] ADA pullback to 0.375', '[MARCODG1] BUY 120 ADA at 0.374', '[MARCODG1] Grid targets set'], delta: 0 },
    { key: 'btc',   label: 'BTC Scalp',    icon: '⚡', color: 'btc',   logs: ['[MC2] BTC momentum trigger', '[MC2] BUY 0.002 BTC at 67450', '[SYSTEM] Gain: +2.45'], delta: 2.45 },
    { key: 'crash', label: 'Flash Crash',  icon: '⚠', color: 'crash', logs: ['[WATCHDOG] Flash Crash! Drop >4% in 30s', '[WATCHDOG] Safety margins activated', '[SYSTEM] Grids moved to safe levels'], delta: -0.50 },
];

export default function DenaroMachine() {
    const { t } = useLanguage();
    const [logs, setLogs] = useState([]);
    const [profit, setProfit] = useState(FALLBACK_STATS.profit);
    const [trades, setTrades] = useState(FALLBACK_STATS.trades);
    const [winRate, setWinRate] = useState(FALLBACK_STATS.winRate);
    const [status, setStatus] = useState('OPERATIONAL');
    const [liveOk, setLiveOk] = useState(false);   // true se dati live ricevuti
    const [busy, setBusy] = useState(false);
    const [lastUpdate, setLastUpdate] = useState(null);
    const bodyRef = useRef(null);

    // Fetch dati live dal Worker
    const fetchLiveStats = useCallback(function() {
        fetch(WORKER_URL)
            .then(function(res) { return res.ok ? res.json() : Promise.reject('HTTP ' + res.status); })
            .then(function(data) {
                if (data.profit !== null && data.profit !== undefined) {
                    setProfit(data.profit);
                    setTrades(data.trades);
                    setWinRate(data.winRate);
                }
                setStatus(data.status === 'OPERATIONAL' ? 'OPERATIONAL' : data.status);
                setLiveOk(true);
                setLastUpdate(new Date());
                // Aggiungi log di aggiornamento nel terminale
                const now = new Date().toLocaleTimeString();
                setLogs(function(prev) {
                    return prev.slice(-45).concat([
                        { type: 'system', text: '[SYSTEM] Live sync OK — profit: ' + (data.profit !== null ? data.profit.toFixed(2) : '--') + ' | trades: ' + (data.trades || '--') + ' [' + now + ']' }
                    ]);
                });
            })
            .catch(function(err) {
                console.warn('DenaroMachine: live fetch failed, using cached data.', err);
                setLiveOk(false);
            });
    }, []);

    // Boot: animazione log iniziali
    useEffect(function() {
        let idx = 0;
        const timer = setInterval(function() {
            if (idx < LOG_POOL.length) {
                const entry = LOG_POOL[idx];
                setLogs(function(prev) { return prev.concat([entry]); });
                idx++;
            } else {
                clearInterval(timer);
                // Dopo la sequenza di boot, fetch immediato
                fetchLiveStats();
            }
        }, 280);
        return function() { clearInterval(timer); };
    }, [fetchLiveStats]);

    // Refresh periodico ogni 5 minuti
    useEffect(function() {
        const interval = setInterval(fetchLiveStats, REFRESH_INTERVAL_MS);
        return function() { clearInterval(interval); };
    }, [fetchLiveStats]);

    // Auto-scroll terminale
    useEffect(function() {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, [logs]);

    // Inject market event (demo interattivo)
    function inject(ev) {
        if (busy) return;
        setBusy(true);
        let idx = 0;
        const logType = ev.key === 'crash' ? 'watchdog' : ev.key === 'sol' ? 'nuvola' : ev.key === 'ada' ? 'marcodg1' : 'mc2';
        const timer = setInterval(function() {
            if (idx < ev.logs.length) {
                const entry = { type: logType, text: ev.logs[idx] };
                setLogs(function(prev) { return prev.slice(-40).concat([entry]); });
                idx++;
            } else {
                clearInterval(timer);
                if (ev.delta !== 0) setProfit(function(p) { return parseFloat((p + ev.delta).toFixed(2)); });
                setTrades(function(n) { return n + 1; });
                setBusy(false);
            }
        }, 400);
    }

    var badge = t('denaro_machine', 'badge');
    var title = t('denaro_machine', 'title');
    var subtitle = t('denaro_machine', 'subtitle');
    var labelProfit = t('denaro_machine', 'stats_profit');
    var labelTrades = t('denaro_machine', 'stats_trades');
    var labelWinrate = t('denaro_machine', 'stats_winrate');
    var labelStatus = t('denaro_machine', 'stats_status');
    var statusOk = t('denaro_machine', 'status_operational');
    var nuvolaDesc = t('denaro_machine', 'nuvola_desc');
    var mc2Desc = t('denaro_machine', 'mc2_desc');
    var marcodg1Desc = t('denaro_machine', 'marcodg1_desc');

    return (
        <section className="dm-section" id="denaro">
            <div className="dm-container">

                <div className="dm-header">
                    <span className="dm-badge">{badge}</span>
                    <h2 className="dm-title">
                        {title}
                        <a href="https://github.com/grivetto/alpha-omega-trading"
                           target="_blank" rel="noopener noreferrer"
                           className="dm-github">
                            <svg viewBox="0 0 16 16" width={22} height={22} fill="currentColor">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                            </svg>
                        </a>
                    </h2>
                    <p className="dm-subtitle">{subtitle}</p>
                </div>

                <div className="dm-stats">
                    <div className="dm-stat">
                        <span className="dm-stat-label">{labelProfit}</span>
                        <span className="dm-stat-value dm-green">&euro;{profit.toFixed(2)}</span>
                    </div>
                    <div className="dm-stat">
                        <span className="dm-stat-label">{labelTrades}</span>
                        <span className="dm-stat-value">{trades}</span>
                    </div>
                    <div className="dm-stat">
                        <span className="dm-stat-label">{labelWinrate}</span>
                        <span className="dm-stat-value">{winRate}%</span>
                    </div>
                    <div className="dm-stat">
                        <span className="dm-stat-label">{labelStatus}</span>
                        <span className="dm-stat-value dm-green">
                            <span className={'dm-led' + (liveOk ? '' : ' dm-led-warn')}></span>
                            {statusOk}
                        </span>
                    </div>
                </div>

                {lastUpdate && (
                    <div className="dm-live-badge">
                        <span className="dm-live-dot"></span>
                        LIVE &bull; aggiornato alle {lastUpdate.toLocaleTimeString()}
                    </div>
                )}

                <div className="dm-body">
                    <div className="dm-nodes">
                        <div className="dm-node">
                            <div className="dm-node-top">
                                <span className="dm-led"></span>
                                <strong>Nuvola</strong>
                                <span className="dm-chip">SOL/EUR</span>
                            </div>
                            <p>{nuvolaDesc}</p>
                        </div>
                        <div className="dm-node">
                            <div className="dm-node-top">
                                <span className="dm-led dm-blue"></span>
                                <strong>Mc2</strong>
                                <span className="dm-chip">28 Pairs</span>
                            </div>
                            <p>{mc2Desc}</p>
                        </div>
                        <div className="dm-node">
                            <div className="dm-node-top">
                                <span className="dm-led dm-purple"></span>
                                <strong>MarcoDG1</strong>
                                <span className="dm-chip">ADA/EUR</span>
                            </div>
                            <p>{marcodg1Desc}</p>
                        </div>

                        <div className="dm-events">
                            <span className="dm-events-label">Inject Market Event</span>
                            <div className="dm-events-grid">
                                {EVENTS.map(function(ev) {
                                    return (
                                        <button
                                            key={ev.key}
                                            type="button"
                                            className={'dm-btn dm-btn-' + ev.color}
                                            onClick={function() { inject(ev); }}
                                            disabled={busy}
                                        >
                                            {ev.icon} {ev.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="dm-terminal">
                        <div className="dm-term-bar">
                            <span className="dm-dot red"></span>
                            <span className="dm-dot yellow"></span>
                            <span className="dm-dot green"></span>
                            <span className="dm-term-title">denaro_trading_core.log</span>
                        </div>
                        <div className="dm-term-body" ref={bodyRef}>
                            {logs.map(function(log, i) {
                                return (
                                    <div key={i} className={'dm-log dm-log-' + log.type}>
                                        {log.text}
                                    </div>
                                );
                            })}
                            <span className="dm-cursor">&#9608;</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
