import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './NotFound.css';

const NotFound = ({ onNavigate }) => {
    const { t } = useLanguage();

    return (
        <div className="not-found-container">
            <div className="not-found-content glass">
                <h1 className="not-found-title">404</h1>
                <h2 className="not-found-subtitle">{t('not_found', 'title') || 'Page Not Found'}</h2>
                <p className="not-found-text">
                    {t('not_found', 'message') || "Oops! It seems you've drifted into deep space. Let's get you back to safety."}
                </p>
                <button className="btn-primary" onClick={() => onNavigate('home')}>
                    {t('not_found', 'back_home') || 'Back to Reality'}
                </button>
            </div>
            <div className="not-found-bg">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
            </div>
        </div>
    );
};

export default NotFound;
