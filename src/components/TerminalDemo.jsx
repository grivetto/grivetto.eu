
import React, { useEffect } from 'react';
import './WebTerminal.css'; // Reuse terminal styling

const TerminalDemo = ({ onNavigate }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://asciinema.org/a/405507.js";
        script.id = "asciicast-405507";
        script.async = true;
        script.dataset.autoplay = "true";
        script.dataset.loop = "true";
        script.dataset.speed = "1"; // Normal speed to avoid skipping intro
        script.dataset.poster = "npt:0.1"; // Force preview to start frame
        script.dataset.idleTimeLimit = "2"; // Cap idle time to keep it moving but not instant

        const container = document.getElementById('asciinema-container-demo');
        if (container && !container.hasChildNodes()) {
            container.appendChild(script);
        }

        return () => {
            if (container && container.contains(script)) {
                container.removeChild(script);
            }
        };
    }, []);

    return (
        <div className="terminal-container-fullscreen" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: '#0a0a0a',
            padding: '20px'
        }}>
            <h2 style={{
                color: '#00f2ff',
                marginBottom: '20px',
                fontFamily: '"Courier New", monospace',
                textShadow: '0 0 10px rgba(0, 242, 255, 0.5)'
            }}>Terminal Session Demo</h2>

            <div id="asciinema-container-demo" style={{
                width: '95vw',
                border: '1px solid #00f2ff',
                boxShadow: '0 0 20px rgba(0, 242, 255, 0.2)',
                background: '#121314' // Default asciinema bg match
            }}></div>

            <div className="terminal-controls" style={{ marginTop: '30px' }}>
                <button className="btn-retro" onClick={() => onNavigate('home')}>POWER OFF</button>
            </div>
        </div>
    );
};

export default TerminalDemo;
