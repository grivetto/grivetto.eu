
import React from 'react';
import './WebTerminal.css'; // Reuse terminal styling

const HeskWrapper = ({ onNavigate }) => {
    return (
        <div className="terminal-container-fullscreen" style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0a0a0a' }}>
            <div style={{ padding: '10px', borderBottom: '1px solid #00f2ff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0, 242, 255, 0.05)' }}>
                <span style={{ color: '#00f2ff', fontFamily: '"Courier New", monospace' }}>HESK Help Desk System</span>
                <button className="btn-retro" style={{ padding: '5px 15px', fontSize: '0.8rem' }} onClick={() => onNavigate('home')}>POWER OFF</button>
            </div>
            <iframe
                src="https://www.grivetto.eu/hesk/index.php"
                style={{ flex: 1, border: 'none', width: '100%' }}
                title="HESK"
            />
        </div>
    );
};

export default HeskWrapper;
