import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import './CuriositySpark.css';

const CURIOSITY_SPARKS = [
    "The first computer bug was an actual moth found in the Harvard Mark II computer in 1947.",
    "The first website in history is still online! (info.cern.ch)",
    "Video On Line (VOL) in 1995 used a graphical map of Sardinia as its main interface.",
    "A single Google search uses the computing power of the entire Apollo program.",
    "The original name of Windows was 'Interface Manager'.",
    "The first domain ever registered was Symbolics.com on March 15, 1985.",
    "Email existed before the World Wide Web.",
    "The QWERTY keyboard was designed to slow down typists and prevent typewriter jamming.",
    "Do we live in a simulation? Mathematics suggests there is a 50% probability.",
    "In 1993, the web had only 623 sites. Today there are over 1.9 billion.",
    "Tim Berners-Lee gave the web to the world for free. No patents, no royalties.",
    "CRS4 in Sardinia hosted the first Italian website in 1993.",
    "The '404' error code is not named after a room at CERN. That is a myth.",
    "The most 'peaceful' CSS color is probably #B0E0E6 (Powder Blue).",
    "Programming is the closest thing to magic we have.",
];

const CuriositySpark = ({ onNavigate }) => {
    const [spark, setSpark] = useState(null);
    const [isExploding, setIsExploding] = useState(false);

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
            const randomFact = CURIOSITY_SPARKS[Math.floor(Math.random() * CURIOSITY_SPARKS.length)];
            setSpark(randomFact);
            setIsExploding(false);
        }, 500);
    };

    return (
        <div className="curiosity-container fade-in">
            <header className="hero-compact">
                <button onClick={() => onNavigate('app')} className="back-btn">← Back</button>
                <h1 className="cosmic-title">Cosmic Curiosity</h1>
            </header>

            <div className="spark-chamber card glass">
                {!spark ? (
                    <div className="center-stage">
                        <p className="instruction-text">Touch the Orb to ignite a spark of knowledge.</p>
                        <div
                            className={`cosmic-orb ${isExploding ? 'pulsing fast' : 'pulsing'}`}
                            onClick={triggerCuriosity}
                        >
                            <span className="orb-icon">✨</span>
                        </div>
                    </div>
                ) : (
                    <div className="revelation fade-in">
                        <h2 className="did-you-know">Did you know?</h2>
                        <p className="spark-content">"{spark}"</p>
                        <button className="btn-again" onClick={() => setSpark(null)}>
                            Another one?
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CuriositySpark;
