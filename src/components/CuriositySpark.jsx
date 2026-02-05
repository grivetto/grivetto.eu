import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../contexts/LanguageContext';
import './CuriositySpark.css';

const CuriositySpark = ({ onNavigate }) => {
    const [spark, setSpark] = useState(null);
    const [isExploding, setIsExploding] = useState(false);
    const { t, getFacts } = useLanguage();

    const triggerCuriosity = () => {
        if (isExploding) return;
        setIsExploding(true);

        // 1. Fire Confetti
        const duration = 2000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());

        // 2. Select visual spark text
        setTimeout(() => {
            const facts = getFacts();
            const randomFact = facts[Math.floor(Math.random() * facts.length)];
            setSpark(randomFact);
            setIsExploding(false);
        }, 500);
    };

    return (
        <div className="curiosity-container fade-in">
            <header className="hero-compact">
                <button onClick={() => onNavigate('home')} className="back-btn">{t('curiosity', 'btn_back')}</button>
                <h1 className="cosmic-title">{t('curiosity', 'title')}</h1>
            </header>

            <div className="spark-chamber card glass">
                {!spark ? (
                    <div className="center-stage">
                        <p className="instruction-text">{t('curiosity', 'instruction')}</p>
                        <div
                            className={`cosmic-orb ${isExploding ? 'pulsing fast' : 'pulsing'}`}
                            onClick={triggerCuriosity}
                        >
                            <span className="orb-icon">✨</span>
                        </div>
                    </div>
                ) : (
                    <div className="revelation fade-in">
                        <h2 className="did-you-know">{t('curiosity', 'did_you_know')}</h2>
                        <p className="spark-content">"{spark}"</p>
                        <button className="btn-again" onClick={() => setSpark(null)}>
                            {t('curiosity', 'btn_again')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CuriositySpark;
