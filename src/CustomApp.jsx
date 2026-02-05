import React from 'react';
import { useLanguage } from './contexts/LanguageContext';

const CustomApp = ({ onNavigate }) => {
    const { t } = useLanguage();

    return (
        <>
            <header className="hero fade-in">
                <div className="hero-content">
                    <h1>AI generated APP</h1>

                    <div className="mini-apps-buttons" style={{ marginTop: '2rem', marginBottom: '1rem' }}>
                        <button onClick={() => onNavigate('rubiks')} className="app-btn cube-btn">
                            <span className="icon">🎲</span> 3D Cube
                        </button>
                        <button onClick={() => onNavigate('tictactoe')} className="app-btn neon-btn">
                            {t('expertise', 'card_web').btn_tictactoe}
                        </button>
                        <button onClick={() => onNavigate('tetris')} className="app-btn" style={{ background: 'linear-gradient(135deg, #d500f9, #651fff)', boxShadow: '0 4px 15px rgba(213, 0, 249, 0.3)' }}>
                            {t('expertise', 'card_web').btn_tetris}
                        </button>
                    </div>
                    <div className="mini-apps-buttons" style={{ marginTop: '0' }}>
                        <button onClick={() => window.location.href = 'https://www.grivetto.eu/web-apps/neon-tunnel/'} className="app-btn" style={{ background: 'linear-gradient(135deg, #11998e, #38ef7d)', boxShadow: '0 4px 15px rgba(56, 239, 125, 0.3)' }}>
                            {t('expertise', 'card_web').btn_tunnel}
                        </button>
                        <button onClick={() => onNavigate('curiosity')} className="app-btn" style={{ background: 'linear-gradient(135deg, #aa00ff, #ea80fc)', boxShadow: '0 4px 15px rgba(234, 128, 252, 0.3)', minWidth: '200px' }}>
                            {t('expertise', 'card_web').btn_curiosity}
                        </button>
                    </div>
                    <div className="mini-apps-buttons" style={{ marginTop: '0' }}>
                        <button onClick={() => onNavigate('terminal')} className="app-btn" style={{ background: 'none', border: '1px solid #00f2ff', boxShadow: '0 0 10px rgba(0, 242, 255, 0.2)', color: '#00f2ff', borderRadius: '50px', padding: '10px 30px' }}>
                            {t('expertise', 'card_support').btn_sysadmin}
                        </button>
                    </div>
                </div>
            </header>

            <main>
                <section className="card glass" style={{ textAlign: 'center', padding: '40px' }}>
                    <h2>Select an App</h2>
                    <p>Choose one of the AI-generated applications above to start.</p>
                </section>

                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <button onClick={() => onNavigate('home')} className="btn">{t('curiosity', 'btn_back')}</button>
                </div>
            </main>
        </>
    );
};

export default CustomApp;
