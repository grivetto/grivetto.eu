import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSelector = ({ theme = 'default' }) => {
    const { language, toggleLanguage } = useLanguage();

    const getCurrentLanguageInfo = () => {
        if (language === 'en') {
            return {
                code: 'EN',
                label: 'Switch to Italiano', // Label still indicates what happens on click
                flag: 'https://flagcdn.com/w40/gb.png',
                alt: 'English'
            };
        }
        if (language === 'it') {
            return {
                code: 'IT',
                label: 'Cambia in Español',
                flag: 'https://flagcdn.com/w40/it.png',
                alt: 'Italiano'
            };
        }
        if (language === 'es') {
            return {
                code: 'ES',
                label: 'Switch to Thai',
                flag: 'https://flagcdn.com/w40/es.png',
                alt: 'Español'
            };
        }
        if (language === 'th') {
            return {
                code: 'TH',
                label: 'Switch to English',
                flag: 'https://flagcdn.com/w40/th.png',
                alt: 'Thai'
            };
        }
        // Fallback
        return {
            code: 'EN',
            label: 'Switch to Italiano',
            flag: 'https://flagcdn.com/w40/gb.png',
            alt: 'English'
        };
    };

    const current = getCurrentLanguageInfo();
    const isCyberpunk = theme === 'cyberpunk';

    return (
        <button
            onClick={toggleLanguage}
            className="lang-toggle-btn"
            title={current.label}
            style={{
                background: isCyberpunk ? 'rgba(0, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)',
                border: isCyberpunk ? '1px solid hsla(180, 100%, 50%, 0.5)' : '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                cursor: 'pointer',
                padding: '6px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease',
                boxShadow: isCyberpunk ? '0 0 10px hsla(180, 100%, 50%, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.05)',
                color: isCyberpunk ? '#00fbff' : 'hsl(210, 25%, 25%)',
                zIndex: 1002,
                position: 'relative'
            }}
        >
            <img
                src={current.flag}
                alt={current.alt}
                style={{
                    width: '20px',
                    height: 'auto',
                    borderRadius: '2px',
                    filter: isCyberpunk ? 'brightness(1.2)' : 'none'
                }}
            />
            <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.5px' }}>
                {current.code}
            </span>
        </button>
    );
};

export default LanguageSelector;
