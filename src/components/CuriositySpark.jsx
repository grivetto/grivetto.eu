import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import './CuriositySpark.css';

const CURIOSITY_SPARKS = [
    "Il primo bug informatico fu una vera falena trovata nel computer Harvard Mark II nel 1947.",
    "Il primo sito web della storia è ancora online! (info.cern.ch)",
    "Video On Line (VOL) nel 1995 usava una mappa grafica della Sardegna come interfaccia principale.",
    "Una singola ricerca su Google usa la potenza di calcolo dell'intero programma Apollo.",
    "Il nome originale di Windows era 'Interface Manager'.",
    "Il primo dominio mai registrato fu Symbolics.com il 15 marzo 1985.",
    "L'email esisteva prima del World Wide Web.",
    "La tastiera QWERTY fu progettata per rallentare i dattilografi e prevenire l'inceppamento delle macchine da scrivere.",
    "Viviamo in una simulazione? La matematica suggerisce che c'è il 50% di probabilità.",
    "Nel 1993, il web aveva solo 623 siti. Oggi ce ne sono oltre 1,9 miliardi.",
    "Tim Berners-Lee ha regalato il web al mondo gratuitamente. Nessun brevetto, nessuna royalty.",
    "Il CRS4 in Sardegna ha ospitato il primo sito web italiano nel 1993.",
    "Il codice di errore '404' non prende il nome da una stanza del CERN. È un mito.",
    "Il colore CSS più 'pacifico' è probabilmente #B0E0E6 (Powder Blue).",
    "Programmare è la cosa più vicina alla magia che abbiamo.",
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
                <button onClick={() => onNavigate('app')} className="back-btn">← Indietro</button>
                <h1 className="cosmic-title">Curiosità Cosmica</h1>
            </header>

            <div className="spark-chamber card glass">
                {!spark ? (
                    <div className="center-stage">
                        <p className="instruction-text">Tocca la Sfera per accendere una scintilla di conoscenza.</p>
                        <div
                            className={`cosmic-orb ${isExploding ? 'pulsing fast' : 'pulsing'}`}
                            onClick={triggerCuriosity}
                        >
                            <span className="orb-icon">✨</span>
                        </div>
                    </div>
                ) : (
                    <div className="revelation fade-in">
                        <h2 className="did-you-know">Lo sapevi?</h2>
                        <p className="spark-content">"{spark}"</p>
                        <button className="btn-again" onClick={() => setSpark(null)}>
                            Ancora una?
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CuriositySpark;
