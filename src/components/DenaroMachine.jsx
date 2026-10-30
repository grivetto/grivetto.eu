import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './DenaroMachine.css';

// URL del file JSON con le statistiche aggregate esportate via FTP
const WORKER_URL = '/denaro-live.json';

// Intervallo di refresh dei dati live (5 minuti)
const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

// Valori di fallback (usati se il Worker non risponde)
const FALLBACK_STATS = { profit: 118.91, trades: 374, winRate: 22.2 };

const LOG_POOL = [
    { type: 'system',       text: '[SYSTEM] Denaro v6 Predictive Fleet — ONLINE' },
    { type: 'watchdog',     text: '[WATCHDOG] Nodes healthy: nuvola (mc2), MARCODG1' },
    { type: 'zero_oom',     text: '[NUVOLA] Kraken API sign OK | execution OK' },
    { type: 'zero_oom',     text: '[NUVOLA] Adaptive DCA trigger: BUY filled' },
    { type: 'neon_sniper',  text: '[MARCODG1] OKX fleet sync | Volatility scaled risk active' },
    { type: 'neon_sniper',  text: '[MARCODG1] Dump defense guard: enabled' },
    { type: 'micro_spread', text: '[FLEET] Multi-exchange liquidity check passed' },
    { type: 'micro_spread', text: '[FLEET] LIMIT SELL placed across exchanges' },
    { type: 'watchdog',     text: '[WATCHDOG] Profit consolidated on main sub-accounts' },
    { type: 'system',       text: '[SYSTEM] Fetching live telemetry from fleet...' },
];

const EVENTS = [
    {
        key: 'sol',
        label: 'Adaptive Grid',
        badge: '+€1.84',
        icon: '📈',
        color: 'sol',
        logs: [
            '[NUVOLA] Adaptive grid expansion triggered',
            '[NUVOLA] Limit BUY executed on Kraken spot',
            '[SYSTEM] Cycle closed — realized gain: +€1.84'
        ],
        delta: 1.84
    },
    {
        key: 'ada',
        label: 'Multi-Exchange',
        badge: '+€0.15',
        icon: '🔄',
        color: 'ada',
        logs: [
            '[FLEET] Cross-exchange spread imbalance detected',
            '[FLEET] Simultaneous BUY Kraken / SELL OKX',
            '[FLEET] Micro-spread arbitrage captured: +€0.15'
        ],
        delta: 0.15
    },
    {
        key: 'btc',
        label: 'Dump Defense',
        badge: 'SHIELD',
        icon: '🛡️',
        color: 'btc',
        logs: [
            '[MARCODG1] High volatility anomaly detected',
            '[MARCODG1] Dump defense protocol engaged',
            '[SYSTEM] Drawdown prevented — capital protected'
        ],
        delta: 0
    },
    {
        key: 'crash',
        label: 'Flash Crash',
        badge: '-€0.50',
        icon: '⚡',
        color: 'crash',
        logs: [
            '[WATCHDOG] Flash Crash alert! Drop >4% in 30s',
            '[WATCHDOG] Emergency stop-loss & safety margins active',
            '[SYSTEM] Grids repositioned to deep support levels'
        ],
        delta: -0.50
    },
];

const UI_COPY = {
    it: {
        versionTag: 'v6 Predictive',
        liveSync: 'TELEMETRIA LIVE',
        standbySync: 'TELEMETRIA CACHED',
        updatedAt: 'Sincronizzato alle',
        openApp: 'Apri Dashboard Live',
        githubRepo: 'Codice Sorgente',
        simulateTitle: 'Simulatore Scenari di Mercato',
        simulateHint: 'Clicca su un evento per testare la risposta algoritmica',
        capitalPrefix: 'Capitale Attivo',
        profitSub: 'Rendimento netto consolidato',
        tradesSub: 'Eseguite su Kraken, OKX & Binance',
        winrateSub: 'Efficienza cicli DCA / Grid',
        statusHeadline: 'OPERATIVA',
        refreshBtn: 'Sincronizza ora',
        streamBadge: 'LIVE STREAM',
        nodesTitle: 'Topologia Nodi Distribuiti',
        webAppTitle: 'Live Web App Studio',
        webAppSubtitle: 'Interfaccia remota connessa in tempo reale a web.grivetto.eu',
    },
    en: {
        versionTag: 'v6 Predictive',
        liveSync: 'LIVE TELEMETRY',
        standbySync: 'CACHED TELEMETRY',
        updatedAt: 'Synced at',
        openApp: 'Open Live Dashboard',
        githubRepo: 'Source Code',
        simulateTitle: 'Market Scenario Simulator',
        simulateHint: 'Click an event to test fleet algorithmic response in real-time',
        capitalPrefix: 'Active Capital',
        profitSub: 'Consolidated net yield',
        tradesSub: 'Executed across Kraken, OKX & Binance',
        winrateSub: 'DCA / Grid cycle efficiency',
        statusHeadline: 'OPERATIONAL',
        refreshBtn: 'Sync now',
        streamBadge: 'LIVE STREAM',
        nodesTitle: 'Distributed Node Topology',
        webAppTitle: 'Live Web App Studio',
        webAppSubtitle: 'Remote interface connected live to web.grivetto.eu',
    },
    es: {
        versionTag: 'v6 Predictive',
        liveSync: 'TELEMETRÍA EN VIVO',
        standbySync: 'TELEMETRÍA EN CACHÉ',
        updatedAt: 'Sincronizado a las',
        openApp: 'Abrir Panel en Vivo',
        githubRepo: 'Código Fuente',
        simulateTitle: 'Simulador de Escenarios',
        simulateHint: 'Haz clic para probar la respuesta algorítmica en tiempo real',
        capitalPrefix: 'Capital Activo',
        profitSub: 'Rendimiento neto consolidado',
        tradesSub: 'Ejecutadas en Kraken, OKX y Binance',
        winrateSub: 'Eficiencia de ciclos DCA / Grid',
        statusHeadline: 'OPERATIVO',
        refreshBtn: 'Sincronizar',
        streamBadge: 'EN VIVO',
        nodesTitle: 'Topología de Nodos Distribuidos',
        webAppTitle: 'Panel en Vivo',
        webAppSubtitle: 'Interfaz remota conectada en vivo a web.grivetto.eu',
    },
    th: {
        versionTag: 'v6 Predictive',
        liveSync: 'เทเลเมทรีสด',
        standbySync: 'ข้อมูลแคช',
        updatedAt: 'ซิงค์เมื่อ',
        openApp: 'เปิดแดชบอร์ดสด',
        githubRepo: 'ซอร์สโค้ด',
        simulateTitle: 'จำลองสถานการณ์ตลาด',
        simulateHint: 'คลิกเพื่อทดสอบการตอบสนองของระบบในเวลาจริง',
        capitalPrefix: 'เงินทุนหมุนเวียน',
        profitSub: 'กำไรสุทธิรวม',
        tradesSub: 'ดำเนินการบน Kraken, OKX และ Binance',
        winrateSub: 'ประสิทธิภาพรอบ DCA / Grid',
        statusHeadline: 'พร้อมใช้งาน',
        refreshBtn: 'ซิงค์ข้อมูล',
        streamBadge: 'สตรีมสด',
        nodesTitle: 'สถาปัตยกรรมโหนดแบบกระจาย',
        webAppTitle: 'แดชบอร์ดสด',
        webAppSubtitle: 'เชื่อมต่อกับ web.grivetto.eu แบบเรียลไทม์',
    }
};

function parseLogEntry(text) {
    const match = text.match(/^\[([^\]]+)\]\s*(.*)$/);
    if (!match) {
        return { tag: 'LOG', body: text };
    }
    return { tag: match[1], body: match[2] };
}

export default function DenaroMachine() {
    const { t, language } = useLanguage();
    const copy = UI_COPY[language] || UI_COPY.en;

    const [logs, setLogs] = useState([]);
    const [profit, setProfit] = useState(FALLBACK_STATS.profit);
    const [trades, setTrades] = useState(FALLBACK_STATS.trades);
    const [winRate, setWinRate] = useState(FALLBACK_STATS.winRate);
    const [liveOk, setLiveOk] = useState(false);
    const [busy, setBusy] = useState(false);
    const [lastUpdate, setLastUpdate] = useState(null);
    const [capital, setCapital] = useState(null);
    const [activeEventKey, setActiveEventKey] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [iframeInteractive, setIframeInteractive] = useState(false);
    const bodyRef = useRef(null);

    // Fetch dati live dal Worker
    const fetchLiveStats = useCallback(function() {
        setIsRefreshing(true);
        fetch(WORKER_URL)
            .then(function(res) { return res.ok ? res.json() : Promise.reject('HTTP ' + res.status); })
            .then(function(data) {
                if (data.profit !== null && data.profit !== undefined) {
                    setProfit(data.profit);
                    setTrades(data.trades);
                    setWinRate(data.winRate);
                }
                if (data.capital !== null && data.capital !== undefined) {
                    setCapital(data.capital);
                }
                setLiveOk(true);
                setLastUpdate(new Date());
                const now = new Date().toLocaleTimeString();
                setLogs(function(prev) {
                    return prev.slice(-45).concat([
                        {
                            type: 'system',
                            text: '[SYSTEM] Live sync OK — profit: €' + (data.profit !== null ? data.profit.toFixed(2) : '--') + ' | trades: ' + (data.trades || '--') + ' [' + now + ']'
                        }
                    ]);
                });
            })
            .catch(function(err) {
                console.warn('DenaroMachine: live fetch failed, using cached data.', err);
                setLiveOk(false);
            })
            .finally(function() {
                setTimeout(() => setIsRefreshing(false), 500);
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
                fetchLiveStats();
            }
        }, 200);
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
        setActiveEventKey(ev.key);

        let idx = 0;
        const logType = ev.key === 'crash' ? 'watchdog' : ev.key === 'sol' ? 'zero_oom' : ev.key === 'ada' ? 'micro_spread' : 'neon_sniper';
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
                setTimeout(function() { setActiveEventKey(null); }, 600);
            }
        }, 320);
    }

    const badge = t('denaro_machine', 'badge');
    const rawTitle = t('denaro_machine', 'title') || 'Denaro Fleet';
    const cleanTitle = rawTitle.replace(/\s*\(v6 Predictive\)/i, '');
    const subtitle = t('denaro_machine', 'subtitle');
    const labelProfit = t('denaro_machine', 'stats_profit');
    const labelTrades = t('denaro_machine', 'stats_trades');
    const labelWinrate = t('denaro_machine', 'stats_winrate');
    const labelStatus = t('denaro_machine', 'stats_status');
    const statusOk = t('denaro_machine', 'status_operational');
    const nuvolaDesc = t('denaro_machine', 'nuvola_node_desc') || t('denaro_machine', 'zero_oom_desc');
    const marcodg1Desc = t('denaro_machine', 'marcodg1_node_desc') || t('denaro_machine', 'neon_sniper_desc');
    const microSpreadDesc = t('denaro_machine', 'micro_spread_desc');

    return (
        <section className="dm-section" id="denaro">
            <div className="dm-ambient-glow dm-glow-cyan" aria-hidden="true"></div>
            <div className="dm-ambient-glow dm-glow-emerald" aria-hidden="true"></div>

            <div className="dm-container">
                <div className="dm-showcase-shell">

                    {/* --- Top Header Elegante --- */}
                    <div className="dm-header">
                        <div className="dm-eyebrow-row">
                            <span className="dm-badge">
                                <span className="dm-badge-dot"></span>
                                {badge}
                            </span>

                            <div className={'dm-telemetry-pill' + (liveOk ? ' is-live' : '')}>
                                <span className="dm-live-dot"></span>
                                <span>
                                    {liveOk ? copy.liveSync : copy.standbySync}
                                    {lastUpdate ? ` • ${copy.updatedAt} ${lastUpdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''}
                                </span>
                                <button
                                    type="button"
                                    className={'dm-sync-btn' + (isRefreshing ? ' is-spinning' : '')}
                                    onClick={fetchLiveStats}
                                    title={copy.refreshBtn}
                                    aria-label={copy.refreshBtn}
                                >
                                    ↻
                                </button>
                            </div>
                        </div>

                        <div className="dm-title-row">
                            <h2 className="dm-title">
                                <span className="dm-title-main">{cleanTitle}</span>
                                <span className="dm-version-pill">{copy.versionTag}</span>
                            </h2>
                        </div>

                        <p className="dm-subtitle">{subtitle}</p>

                        <div className="dm-header-actions">
                            <a
                                href="https://web.grivetto.eu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="dm-action-btn dm-action-primary"
                            >
                                <span className="dm-action-led"></span>
                                <span>{copy.openApp}</span>
                                <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M7 13L13 7M13 7H8M13 7V12" />
                                </svg>
                            </a>

                            <a
                                href="https://github.com/grivetto/money"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="dm-action-btn dm-action-secondary"
                            >
                                <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                                </svg>
                                <span>{copy.githubRepo}</span>
                            </a>
                        </div>
                    </div>

                    {/* --- KPI Metrics Grid Istituzionale --- */}
                    <div className="dm-stats">
                        {/* Rendimento / Profitto */}
                        <div className="dm-stat dm-stat-profit">
                            <div className="dm-stat-head">
                                <span className="dm-stat-label">{labelProfit}</span>
                                <span className="dm-stat-icon dm-icon-emerald" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                        <polyline points="17 6 23 6 23 12"></polyline>
                                    </svg>
                                </span>
                            </div>
                            <div className="dm-stat-value-row">
                                <span className="dm-stat-value dm-green">+&euro;{profit.toFixed(2)}</span>
                                {capital !== null && (
                                    <span className="dm-capital-pill">
                                        {copy.capitalPrefix}: &euro;{capital.toFixed(2)}
                                    </span>
                                )}
                            </div>
                            <span className="dm-stat-caption">{copy.profitSub}</span>
                        </div>

                        {/* Operazioni / Trades */}
                        <div className="dm-stat dm-stat-trades">
                            <div className="dm-stat-head">
                                <span className="dm-stat-label">{labelTrades}</span>
                                <span className="dm-stat-icon dm-icon-cyan" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                    </svg>
                                </span>
                            </div>
                            <div className="dm-stat-value-row">
                                <span className="dm-stat-value">{trades}</span>
                                <span className="dm-micro-tag">SPOT / GRID</span>
                            </div>
                            <span className="dm-stat-caption">{copy.tradesSub}</span>
                        </div>

                        {/* Tasso di Successo / Win Rate */}
                        <div className="dm-stat dm-stat-winrate">
                            <div className="dm-stat-head">
                                <span className="dm-stat-label">{labelWinrate}</span>
                                <span className="dm-stat-icon dm-icon-purple" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M12 6v6l4 2"></path>
                                    </svg>
                                </span>
                            </div>
                            <div className="dm-stat-value-row">
                                <span className="dm-stat-value">{winRate}%</span>
                                <div className="dm-progress-track" aria-hidden="true">
                                    <div
                                        className="dm-progress-fill"
                                        style={{ width: `${Math.min(100, Math.max(14, winRate))}%` }}
                                    ></div>
                                </div>
                            </div>
                            <span className="dm-stat-caption">{copy.winrateSub}</span>
                        </div>

                        {/* Stato Flotta */}
                        <div className="dm-stat dm-stat-health">
                            <div className="dm-stat-head">
                                <span className="dm-stat-label">{labelStatus}</span>
                                <span className="dm-stat-icon dm-icon-emerald" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                    </svg>
                                </span>
                            </div>
                            <div className="dm-stat-value-row">
                                <span className="dm-stat-value dm-status-val dm-green">
                                    <span className={'dm-led' + (liveOk ? '' : ' dm-led-warn')}></span>
                                    {copy.statusHeadline}
                                </span>
                            </div>
                            <span className="dm-stat-caption">{statusOk}</span>
                        </div>
                    </div>

                    {/* --- Cockpit Unificato (Tutto visibile in un unico colpo d'occhio) --- */}
                    <div className="dm-cockpit-grid">

                        {/* COLONNA SINISTRA: Live Web App Studio */}
                        <div className="dm-cockpit-col dm-cockpit-left">
                            <div className="dm-panel-header">
                                <span className="dm-panel-title">
                                    <span className="dm-panel-dot"></span>
                                    {copy.webAppTitle}
                                </span>
                                <span className="dm-panel-sub">{copy.webAppSubtitle}</span>
                            </div>

                            <div className="dm-webapp-preview">
                                <div className="dm-browser-bar">
                                    <div className="dm-window-dots" aria-hidden="true">
                                        <span className="dm-dot red"></span>
                                        <span className="dm-dot yellow"></span>
                                        <span className="dm-dot green"></span>
                                    </div>

                                    <a
                                        href="https://web.grivetto.eu"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="dm-browser-url"
                                        title="web.grivetto.eu/live-telemetry"
                                    >
                                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dm-lock-icon">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                        </svg>
                                        <span className="dm-url-domain">web.grivetto.eu</span>
                                        <span className="dm-url-divider">/</span>
                                        <span className="dm-url-path">live-telemetry</span>
                                    </a>

                                    <div className="dm-browser-actions">
                                        {iframeInteractive && (
                                            <button
                                                type="button"
                                                className="dm-browser-btn dm-unlock-scroll-btn"
                                                onClick={() => setIframeInteractive(false)}
                                            >
                                                <span>✕ Scroll</span>
                                            </button>
                                        )}
                                        <a
                                            href="https://web.grivetto.eu"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="dm-browser-btn dm-browser-btn-accent"
                                            title={copy.openApp}
                                        >
                                            <span>↗</span>
                                        </a>
                                    </div>
                                </div>
                                <div className={'dm-iframe-stage' + (iframeInteractive ? ' is-interactive' : '')}>
                                    <iframe
                                        src="https://web.grivetto.eu"
                                        className="dm-iframe"
                                        title="Denaro Web App"
                                        loading="lazy"
                                    ></iframe>
                                    {!iframeInteractive && (
                                        <div
                                            className="dm-touch-guard"
                                            onClick={() => setIframeInteractive(true)}
                                            role="button"
                                            tabIndex={0}
                                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIframeInteractive(true); }}
                                        >
                                            <span className="dm-touch-guard-pill">
                                                <span>👆</span>
                                                <span>{language === 'it' ? 'Tocca per interagire con la Live App' : language === 'es' ? 'Toca para interactuar con la App' : language === 'th' ? 'แตะเพื่อโต้ตอบกับแอปสด' : 'Tap to interact with Live App'}</span>
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* COLONNA DESTRA: Engine Console (Nodi + Simulatore + Terminale) */}
                        <div className="dm-cockpit-col dm-cockpit-right">

                            {/* 1. Nodi Distribuiti */}
                            <div className="dm-cockpit-block">
                                <div className="dm-panel-header">
                                    <span className="dm-panel-title">
                                        <span className="dm-panel-dot dm-dot-cyan"></span>
                                        {copy.nodesTitle}
                                    </span>
                                </div>

                                <div className="dm-nodes-layout">
                                    <div className="dm-node dm-node-emerald">
                                        <div className="dm-node-top">
                                            <span className="dm-led"></span>
                                            <strong>Node Nuvola (mc2)</strong>
                                            <span className="dm-chip dm-chip-emerald">Kraken</span>
                                        </div>
                                        <p>{nuvolaDesc}</p>
                                        <div className="dm-node-meta">
                                            <span>Orchestrator • DCA Grid</span>
                                            <span className="dm-node-ping">42ms</span>
                                        </div>
                                    </div>

                                    <div className="dm-node dm-node-cyan">
                                        <div className="dm-node-top">
                                            <span className="dm-led dm-blue"></span>
                                            <strong>Node MARCODG1</strong>
                                            <span className="dm-chip dm-chip-cyan">OKX/Binance</span>
                                        </div>
                                        <p>{marcodg1Desc}</p>
                                        <div className="dm-node-meta">
                                            <span>Dump Guard • Scaled Risk</span>
                                            <span className="dm-node-ping">38ms</span>
                                        </div>
                                    </div>

                                    <div className="dm-node dm-node-purple">
                                        <div className="dm-node-top">
                                            <span className="dm-led dm-purple"></span>
                                            <strong>Fleet Manager</strong>
                                            <span className="dm-chip dm-chip-purple">Multi-Sync</span>
                                        </div>
                                        <p>{microSpreadDesc}</p>
                                        <div className="dm-node-meta">
                                            <span>Cross-Exchange Spread</span>
                                            <span className="dm-node-ping">Active</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 2. Simulatore Scenari */}
                            <div className="dm-cockpit-block">
                                <div className="dm-simulator-strip">
                                    <div className="dm-sim-info">
                                        <span className="dm-sim-title">
                                            <span className="dm-sim-sparkle">✨</span>
                                            {copy.simulateTitle}
                                        </span>
                                        <span className="dm-sim-hint">{copy.simulateHint}</span>
                                    </div>

                                    <div className="dm-events-grid-compact">
                                        {EVENTS.map(function(ev) {
                                            const isRunning = activeEventKey === ev.key;
                                            return (
                                                <button
                                                    key={ev.key}
                                                    type="button"
                                                    className={'dm-btn dm-btn-' + ev.color + (isRunning ? ' is-active' : '')}
                                                    onClick={function() { inject(ev); }}
                                                    disabled={busy}
                                                >
                                                    <span className="dm-btn-left">
                                                        <span className="dm-btn-icon">{ev.icon}</span>
                                                        <span className="dm-btn-text">{ev.label}</span>
                                                    </span>
                                                    <span className="dm-btn-delta">{ev.badge}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* 3. Terminale Streaming */}
                            <div className="dm-cockpit-block dm-terminal-block">
                                <div className="dm-terminal">
                                    <div className="dm-term-bar">
                                        <div className="dm-window-dots" aria-hidden="true">
                                            <span className="dm-dot red"></span>
                                            <span className="dm-dot yellow"></span>
                                            <span className="dm-dot green"></span>
                                        </div>
                                        <span className="dm-term-title">denaro_trading_core.log</span>
                                        <span className="dm-term-stream">
                                            <span className="dm-stream-dot"></span>
                                            {copy.streamBadge}
                                        </span>
                                    </div>

                                    <div className="dm-term-body" ref={bodyRef}>
                                        {logs.map(function(log, i) {
                                            const parsed = parseLogEntry(log.text);
                                            return (
                                                <div key={i} className={'dm-log dm-log-' + log.type}>
                                                    <span className="dm-log-idx">{String(i + 1).padStart(2, '0')}</span>
                                                    <span className={'dm-log-tag dm-tag-' + log.type}>{parsed.tag}</span>
                                                    <span className="dm-log-msg">{parsed.body}</span>
                                                </div>
                                            );
                                        })}
                                        <div className="dm-cursor-line">
                                            <span className="dm-prompt">fleet@denaro-v6:~$</span>
                                            <span className="dm-cursor">&#9608;</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
