import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import './DenaroMachine.css';

// --- Mini SVG Equity Chart ---
function EquityChart({ profit }) {
    const [history, setHistory] = useState([118.91]);
    const maxPoints = 40;

    useEffect(() => {
        setHistory(prev => {
            const next = [...prev, profit];
            return next.length > maxPoints ? next.slice(-maxPoints) : next;
        });
    }, [profit]);

    const min = Math.min(...history) - 2;
    const max = Math.max(...history) + 2;
    const range = max - min || 1;
    const w = 400;
    const h = 100;

    const pts = history.map((v, i) => {
        const x = (i / (maxPoints - 1)) * w;
        const y = h - ((v - min) / range) * h;
        return `${x},${y}`;
    }).join(' ');

    const areaPath = `M0,${h} L${history.map((v, i) => {
        const x = (i / (maxPoints - 1)) * w;
        const y = h - ((v - min) / range) * h;
        return `${x},${y}`;
    }).join(' L')} L${((history.length - 1) / (maxPoints - 1)) * w},${h} Z`;

    const lastY = h - ((profit - min) / range) * h;
    const lastX = ((history.length - 1) / (maxPoints - 1)) * w;

    return (
        <div className="equity-chart-wrapper">
            <div className="equity-chart-header">
                <span className="equity-label">Equity Curve</span>
                <span className="equity-profit">+€{profit.toFixed(2)}</span>
            </div>
            <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="equity-svg">
                <defs>
                    <linearGradient id="equityGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4dfa94" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#4dfa94" stopOpacity="0.0" />
                    </linearGradient>
                </defs>
                <path d={areaPath} fill="url(#equityGrad)" />
                <polyline
                    points={pts}
                    fill="none"
                    stroke="#4dfa94"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                />
                {/* Live dot */}
                <circle cx={lastX} cy={lastY} r="4" fill="#4dfa94">
                    <animate attributeName="r" values="4;6;4" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
                </circle>
            </svg>
        </div>
    );
}

// --- Live Price Ticker ---
function PriceTicker() {
    const [prices, setPrices] = useState({
        SOL: 70.49,
        ADA: 0.385,
        BTC: 67450,
        ETH: 3820,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setPrices(prev => ({
                SOL: +(prev.SOL + (Math.random() - 0.5) * 0.5).toFixed(2),
                ADA: +(prev.ADA + (Math.random() - 0.5) * 0.003).toFixed(4),
                BTC: +(prev.BTC + (Math.random() - 0.5) * 50).toFixed(0),
                ETH: +(prev.ETH + (Math.random() - 0.5) * 10).toFixed(0),
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const [prev, setPrev] = useState(prices);
    const [dirs, setDirs] = useState({ SOL: 0, ADA: 0, BTC: 0, ETH: 0 });

    useEffect(() => {
        setDirs({
            SOL: prices.SOL > prev.SOL ? 1 : prices.SOL < prev.SOL ? -1 : 0,
            ADA: prices.ADA > prev.ADA ? 1 : prices.ADA < prev.ADA ? -1 : 0,
            BTC: prices.BTC > prev.BTC ? 1 : prices.BTC < prev.BTC ? -1 : 0,
            ETH: prices.ETH > prev.ETH ? 1 : prices.ETH < prev.ETH ? -1 : 0,
        });
        setPrev(prices);
    }, [prices]);

    const pairs = [
        { key: 'SOL', label: 'SOL/EUR', val: `€${prices.SOL}`, color: '#ffb636' },
        { key: 'ADA', label: 'ADA/EUR', val: `€${prices.ADA}`, color: '#4dfa94' },
        { key: 'BTC', label: 'BTC/USD', val: `$${prices.BTC.toLocaleString()}`, color: '#d175ff' },
        { key: 'ETH', label: 'ETH/USD', val: `$${prices.ETH.toLocaleString()}`, color: '#00f2ff' },
    ];

    return (
        <div className="price-ticker">
            {pairs.map(p => (
                <div key={p.key} className="ticker-item">
                    <span className="ticker-pair">{p.label}</span>
                    <span
                        className={`ticker-price ${dirs[p.key] === 1 ? 'up' : dirs[p.key] === -1 ? 'down' : ''}`}
                        style={{ color: p.color }}
                    >
                        {dirs[p.key] === 1 ? '▲' : dirs[p.key] === -1 ? '▼' : '▶'} {p.val}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default function DenaroMachine() {
    const { t } = useLanguage();
    const [logs, setLogs] = useState([]);
    const [activeNode, setActiveNode] = useState(null);
    const [profit, setProfit] = useState(118.91);
    const [trades, setTrades] = useState(374);
    const [isSimulating, setIsSimulating] = useState(false);
    const consoleBodyRef = useRef(null);

    const baseLogs = [
        { type: 'system', text: "[SYSTEM] Booting Denaro Multi-Node Trading Core..." },
        { type: 'system', text: "[SYSTEM] Establishing secure connection to Binance Spot API..." },
        { type: 'watchdog', text: "[WATCHDOG] Auto-healer daemon initialized and active (PID 337145)." },
        { type: 'nuvola', text: "[NUVOLA] Initializing Regime Grid node on SOL/EUR." },
        { type: 'nuvola', text: "[NUVOLA] Current SOL/EUR price: €70.49. Volatility check: Normal." },
        { type: 'nuvola', text: "[NUVOLA] Market regime classified: Low Volatility Bull. Spacing set to 0.25% ATR." },
        { type: 'mc2', text: "[MC2] Initializing Momentum Scalper. Connecting WebSockets for 28 USDT pairs..." },
        { type: 'mc2', text: "[MC2] WebSocket connection successful. 28 streams active." },
        { type: 'marcodg1', text: "[MARCODG1] Initializing Trend Grid node on ADA/EUR." },
        { type: 'marcodg1', text: "[MARCODG1] Current ADA/EUR price: €0.385. Active grid levels: 15 Buy / 15 Sell." },
        { type: 'watchdog', text: "[WATCHDOG] All nodes reported healthy. Total system uptime: 146 hours." },
        { type: 'nuvola', text: "[NUVOLA] LIMIT BUY filled: 0.139 SOL at €70.25." },
        { type: 'mc2', text: "[MC2] Momentum trigger on BTC/USDT. Scalping buy executed." },
        { type: 'mc2', text: "[MC2] Scalp closed at +0.78% profit target." },
        { type: 'marcodg1', text: "[MARCODG1] Grid level updated. LIMIT SELL placed at €0.392." },
        { type: 'system', text: "[SYSTEM] Profit consolidated on Binance sub-accounts." },
        { type: 'system', text: "[SYSTEM] Total completed trades: 374 | Total net profit: €118.91." }
    ];

    const loopLogs = [
        { type: 'nuvola', text: "[NUVOLA] SOL/EUR regime recalculation: stable grid parameters maintained." },
        { type: 'mc2', text: "[MC2] Scanning 28 pairs... ETH/USDT momentum building (+0.4% in 5m)." },
        { type: 'mc2', text: "[MC2] Scalp buy triggered on ETH/USDT at current market rate." },
        { type: 'mc2', text: "[MC2] Scalp sell order executed. Gain: +0.65% (€2.84)." },
        { type: 'marcodg1', text: "[MARCODG1] ADA/EUR ticker: €0.386. Monitoring grid limits." },
        { type: 'watchdog', text: "[WATCHDOG] System scan OK. Memory usage: 4.2% | CPU: 1.8%." }
    ];

    useEffect(() => {
        let currentLogs = [];
        const timer = setInterval(() => {
            if (currentLogs.length < baseLogs.length) {
                currentLogs = [...currentLogs, baseLogs[currentLogs.length]];
                setLogs(currentLogs);
            } else {
                clearInterval(timer);
            }
        }, 300);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (logs.length < baseLogs.length || isSimulating) return;
        const interval = setInterval(() => {
            const randomLog = loopLogs[Math.floor(Math.random() * loopLogs.length)];
            const timestamp = new Date().toLocaleTimeString();
            const formattedLog = {
                ...randomLog,
                text: randomLog.text.replace(/^[\[\w\]]+\s*/, (match) => `${match.trim()} [${timestamp}] `)
            };
            setLogs(prev => [...prev.slice(-30), formattedLog]);
        }, 5000);
        return () => clearInterval(interval);
    }, [logs.length, isSimulating]);

    useEffect(() => {
        if (consoleBodyRef.current) {
            consoleBodyRef.current.scrollTop = consoleBodyRef.current.scrollHeight;
        }
    }, [logs]);

    const injectEvent = (eventType) => {
        if (isSimulating) return;
        setIsSimulating(true);

        let eventLogs = [];
        let profitDelta = 0;
        let tradeDelta = 0;

        if (eventType === 'sol') {
            eventLogs = [
                { type: 'nuvola', text: `[NUVOLA] SOL/EUR Breakout detected! ATR velocity: +2.8%` },
                { type: 'nuvola', text: `[NUVOLA] Target level €71.80 reached. Executing trailing grid exit.` },
                { type: 'nuvola', text: `[NUVOLA] SELL ORDER filled: 0.18 SOL at €71.85.` },
                { type: 'system', text: `[SYSTEM] Consolidated gain: +€1.84 on Binance account.` }
            ];
            profitDelta = 1.84;
            tradeDelta = 1;
        } else if (eventType === 'ada') {
            eventLogs = [
                { type: 'marcodg1', text: `[MARCODG1] ADA/EUR pulled back to support. Current price: €0.375.` },
                { type: 'marcodg1', text: `[MARCODG1] LIMIT BUY filled: 120 ADA at €0.374.` },
                { type: 'marcodg1', text: `[MARCODG1] Order filled. Adjusting grid sell targets to €0.382.` },
                { type: 'watchdog', text: `[WATCHDOG] Node MARCODG1 collateral ratio healthy: 310%.` }
            ];
            profitDelta = 0;
            tradeDelta = 1;
        } else if (eventType === 'btc') {
            eventLogs = [
                { type: 'mc2', text: `[MC2] High-velocity momentum scalper triggered on BTC/USDT.` },
                { type: 'mc2', text: `[MC2] Market Buy: 0.002 BTC at $67,450.` },
                { type: 'mc2', text: `[MC2] Trailing take profit hit at $67,780. Closing position.` },
                { type: 'system', text: `[SYSTEM] Consolidated gain: +€2.45 on Binance account.` }
            ];
            profitDelta = 2.45;
            tradeDelta = 1;
        } else if (eventType === 'crash') {
            eventLogs = [
                { type: 'watchdog', text: `[WATCHDOG] WARNING: Crypto Market Flash Crash detected! Drop > 4% in 30s.` },
                { type: 'watchdog', text: `[WATCHDOG] Auto-healer: Activating safety margins.` },
                { type: 'system', text: `[SYSTEM] Moving NUVOLA and MARCODG1 grids to safe levels.` },
                { type: 'watchdog', text: `[WATCHDOG] Risk hedged successfully. Standing by for stability.` }
            ];
            profitDelta = -0.50;
            tradeDelta = 2;
        }

        const timestamp = new Date().toLocaleTimeString();
        const timedLogs = eventLogs.map(log => ({
            ...log,
            text: log.text.replace(/^\[\w+\]\s*/, (match) => `${match.trim()} [${timestamp}] `)
        }));

        let i = 0;
        const interval = setInterval(() => {
            if (i < timedLogs.length) {
                setLogs(prev => [...prev.slice(-25), timedLogs[i]]);
                i++;
            } else {
                clearInterval(interval);
                if (profitDelta !== 0) setProfit(p => p + profitDelta);
                if (tradeDelta !== 0) setTrades(t => t + tradeDelta);
                setIsSimulating(false);
            }
        }, 350);
    };

    return (
        <section className="denaro-section" id="denaro">
            <div className="section-container">
                <div className="section-header">
                    <span className="section-badge">{t('denaro_machine', 'badge')}</span>
                    <h2 className="section-title">
                        {t('denaro_machine', 'title')}
                        <a href="https://github.com/grivetto/alpha-omega-trading" target="_blank" rel="noopener noreferrer" className="github-link" title={t('denaro_machine', 'view_github')}>
                            <svg viewBox="0 0 16 16" width="24" height="24" fill="currentColor">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                            </svg>
                        </a>
                    </h2>
                    <p className="section-subtitle">{t('denaro_machine', 'subtitle')}</p>
                </div>

                {/* Live Price Ticker */}
                <PriceTicker />

                <div className="denaro-dashboard glass">
                    {/* Control Panel Grid */}
                    <div className="denaro-grid">
                        
                        {/* Left Column: System Status & Nodes */}
                        <div className="status-panel">
                            
                            {/* Live Status Indicators */}
                            <div className="system-health-card">
                                <div className="card-header">
                                    <h4>System Health Monitor</h4>
                                    <span className="live-pill">LIVE</span>
                                </div>
                                <div className="health-metrics">
                                    <div className="metric">
                                        <span className="label">{t('denaro_machine', 'stats_status')}</span>
                                        <span className="value status-ok">
                                            <span className="pulsing-led-green"></span>
                                            {t('denaro_machine', 'status_operational')}
                                        </span>
                                    </div>
                                    <div className="metric">
                                        <span className="label">Auto-Healer Status</span>
                                        <span className="value status-ok">
                                            <span className="pulsing-led-blue"></span>
                                            {t('denaro_machine', 'watchdog_ok')}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Node Cards */}
                            <div className="nodes-container">
                                <div 
                                    className={`node-card ${activeNode === 'nuvola' ? 'active' : ''}`}
                                    onMouseEnter={() => setActiveNode('nuvola')}
                                    onMouseLeave={() => setActiveNode(null)}
                                >
                                    <div className="node-header">
                                        <div className="node-title-group">
                                            <span className="pulsing-led-green"></span>
                                            <h5>Nuvola Node</h5>
                                        </div>
                                        <span className="node-pair">SOL/EUR</span>
                                    </div>
                                    <p className="node-desc">{t('denaro_machine', 'nuvola_desc')}</p>
                                </div>

                                <div 
                                    className={`node-card ${activeNode === 'mc2' ? 'active' : ''}`}
                                    onMouseEnter={() => setActiveNode('mc2')}
                                    onMouseLeave={() => setActiveNode(null)}
                                >
                                    <div className="node-header">
                                        <div className="node-title-group">
                                            <span className="pulsing-led-green"></span>
                                            <h5>Mc2 Orchestrator</h5>
                                        </div>
                                        <span className="node-pair">28 USDT Pairs</span>
                                    </div>
                                    <p className="node-desc">{t('denaro_machine', 'mc2_desc')}</p>
                                </div>

                                <div 
                                    className={`node-card ${activeNode === 'marcodg1' ? 'active' : ''}`}
                                    onMouseEnter={() => setActiveNode('marcodg1')}
                                    onMouseLeave={() => setActiveNode(null)}
                                >
                                    <div className="node-header">
                                        <div className="node-title-group">
                                            <span className="pulsing-led-green"></span>
                                            <h5>MARCODG1 Node</h5>
                                        </div>
                                        <span className="node-pair">ADA/EUR</span>
                                    </div>
                                    <p className="node-desc">{t('denaro_machine', 'marcodg1_desc')}</p>
                                </div>
                            </div>

                            {/* Scenario Event Injector Grid */}
                            <div className="action-container">
                                <span className="label" style={{ fontSize: '0.8rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
                                    Inject Live Market Event
                                </span>
                                <div className="action-container-grid">
                                    <button 
                                        type="button"
                                        className="btn-event sol" 
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); injectEvent('sol'); }}
                                        disabled={isSimulating}
                                    >
                                        📈 SOL Breakout
                                    </button>
                                    <button 
                                        type="button"
                                        className="btn-event ada" 
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); injectEvent('ada'); }}
                                        disabled={isSimulating}
                                    >
                                        📉 ADA Buy Grid
                                    </button>
                                    <button 
                                        type="button"
                                        className="btn-event btc" 
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); injectEvent('btc'); }}
                                        disabled={isSimulating}
                                    >
                                        ⚡ BTC Scalp
                                    </button>
                                    <button 
                                        type="button"
                                        className="btn-event crash" 
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); injectEvent('crash'); }}
                                        disabled={isSimulating}
                                    >
                                        ⚠️ Flash Crash
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Equity Chart + Terminal Console */}
                        <div className="console-column">
                            {/* Equity Curve Chart */}
                            <EquityChart profit={profit} />

                            {/* Terminal Console */}
                            <div className="console-panel">
                                <div className="console-header">
                                    <div className="console-controls">
                                        <span className="control-dot red"></span>
                                        <span className="control-dot yellow"></span>
                                        <span className="control-dot green"></span>
                                    </div>
                                    <span className="console-title">denaro_trading_core.log</span>
                                </div>
                                <div className="console-body" ref={consoleBodyRef}>
                                    <div className="log-entries">
                                        {logs.map((log, i) => (
                                            <div key={i} className={`log-entry ${log.type}`}>
                                                {log.text}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Footer Stats Grid */}
                    <div className="denaro-stats-row">
                        <div className="stat-card">
                            <div className="stat-label">{t('denaro_machine', 'stats_profit')}</div>
                            <div className="stat-number profit-value">€{profit.toFixed(2)}</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-label">{t('denaro_machine', 'stats_trades')}</div>
                            <div className="stat-number">{trades}</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-label">{t('denaro_machine', 'stats_winrate')}</div>
                            <div className="stat-number">22.2%</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
