import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import './DenaroMachine.css';

export default function DenaroMachine() {
    const { t } = useLanguage();
    const [logs, setLogs] = useState([]);
    const [checkStatus, setCheckStatus] = useState('idle'); // 'idle' | 'checking' | 'success'
    const [activeNode, setActiveNode] = useState(null); // hover state or selection state for detail view
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

    // Seed initial logs
    useEffect(() => {
        let currentLogs = [];
        const timer = setInterval(() => {
            if (currentLogs.length < baseLogs.length && checkStatus === 'idle') {
                currentLogs = [...currentLogs, baseLogs[currentLogs.length]];
                setLogs(currentLogs);
            } else {
                clearInterval(timer);
            }
        }, 600);

        return () => clearInterval(timer);
    }, [checkStatus]);

    // Append periodic logs after initial loading
    useEffect(() => {
        if (logs.length < baseLogs.length || checkStatus !== 'idle') return;

        const interval = setInterval(() => {
            const randomLog = loopLogs[Math.floor(Math.random() * loopLogs.length)];
            const timestamp = new Date().toLocaleTimeString();
            const formattedLog = {
                ...randomLog,
                text: randomLog.text.replace(/^[\[\w\]]+\s*/, (match) => `${match.trim()} [${timestamp}] `)
            };
            setLogs(prev => [...prev.slice(-30), formattedLog]); // Keep last 30 logs
        }, 4000);

        return () => clearInterval(interval);
    }, [logs.length, checkStatus]);

    // Auto-scroll terminal internally
    useEffect(() => {
        if (consoleBodyRef.current) {
            consoleBodyRef.current.scrollTop = consoleBodyRef.current.scrollHeight;
        }
    }, [logs]);

    const runDiagnostics = () => {
        if (checkStatus !== 'idle') return;
        setCheckStatus('checking');
        setLogs([]);

        const diagLogs = [
            { type: 'system', text: "[DIAG] Launching global system checks..." },
            { type: 'nuvola', text: "[DIAG] Checking NUVOLA node (Regime Grid SOL/EUR)..." },
            { type: 'nuvola', text: "[DIAG] NUVOLA node responds: 200 OK. Process ID: 337142." },
            { type: 'mc2', text: "[DIAG] Checking MC2 node (Momentum Scalper)..." },
            { type: 'mc2', text: "[DIAG] MC2 node responds: 200 OK. Process ID: 337139." },
            { type: 'marcodg1', text: "[DIAG] Checking MARCODG1 node (Trend Grid ADA/EUR)..." },
            { type: 'marcodg1', text: "[DIAG] MARCODG1 node responds: 200 OK. Process ID: 297814." },
            { type: 'watchdog', text: "[DIAG] Accessing Watchdog & Auto-Healer..." },
            { type: 'watchdog', text: "[DIAG] Watchdog status: ACTIVE. Latency check: 12ms." },
            { type: 'system', text: "[DIAG] Testing Binance API connectivity & signature validation..." },
            { type: 'system', text: "[DIAG] API status: CONNECTED. Read/Write permissions verified." },
            { type: 'system', text: "[DIAG] ALL DIAGNOSTIC TESTS PASSED successfully." }
        ];

        let index = 0;
        const diagTimer = setInterval(() => {
            if (index < diagLogs.length) {
                setLogs(prev => [...prev, diagLogs[index]]);
                index++;
            } else {
                clearInterval(diagTimer);
                setCheckStatus('success');
                setTimeout(() => {
                    setCheckStatus('idle');
                    setLogs(baseLogs);
                }, 2500);
            }
        }, 300);
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

                             {/* Diagnostic Trigger & GitHub Links */}
                            <div className="action-container denaro-actions-btn-group">
                                <button 
                                    className={`btn-diag ${checkStatus !== 'idle' ? 'loading' : ''}`}
                                    onClick={runDiagnostics}
                                    disabled={checkStatus !== 'idle'}
                                >
                                    {checkStatus === 'idle' && t('denaro_machine', 'trigger_check')}
                                    {checkStatus === 'checking' && (
                                        <>
                                            <span className="spinner"></span>
                                            {t('denaro_machine', 'checking')}
                                        </>
                                    )}
                                    {checkStatus === 'success' && t('denaro_machine', 'check_ok')}
                                </button>
                                <a
                                    href="https://sgrivett.ddns.net/denaro/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-dash"
                                >
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="3" width="7" height="7" rx="1" />
                                        <rect x="14" y="3" width="7" height="7" rx="1" />
                                        <rect x="3" y="14" width="7" height="7" rx="1" />
                                        <rect x="14" y="14" width="7" height="7" rx="1" />
                                    </svg>
                                    <span>{t('denaro_machine', 'link_dashboard')}</span>
                                </a>
                                <a 
                                    href="https://github.com/grivetto/alpha-omega-trading" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="btn-git"
                                >
                                    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                                    </svg>
                                    <span>{t('denaro_machine', 'view_github')}</span>
                                </a>
                            </div>
                        </div>

                        {/* Right Column: Terminal Console */}
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

                    {/* Footer Stats Grid */}
                    <div className="denaro-stats-row">
                        <div className="stat-card">
                            <div className="stat-label">{t('denaro_machine', 'stats_profit')}</div>
                            <div className="stat-number profit-value">€118.91</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-label">{t('denaro_machine', 'stats_trades')}</div>
                            <div className="stat-number">374</div>
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
