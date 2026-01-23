import React from 'react';
import './ModernShowcase.css';
import { motion } from 'framer-motion';

export default function ModernShowcase() {
  return (
    <div className="modern-bg">
      <motion.header
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="modern-hero"
      >
        <h1>✨ Benvenuto nella Nuova Era di grivetto.eu ✨</h1>
        <p>Design moderno, animazioni fluide, esperienza utente al top!</p>
        <a href="/" className="modern-btn">Torna alla Home</a>
      </motion.header>
      <main className="modern-main">
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="modern-features"
        >
          <h2>🚀 Cosa offre questa pagina?</h2>
          <ul>
            <li>🌈 Colori vivaci e layout responsive</li>
            <li>⚡ Animazioni con <b>Framer Motion</b></li>
            <li>🖥️ Pronta per React 19 + Vite</li>
            <li>📱 Mobile friendly</li>
            <li>💡 Facile da personalizzare</li>
          </ul>
        </motion.section>
        <motion.div
          className="modern-cta"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
        >
          <h3>Vuoi una pagina così per tutto il sito?</h3>
          <a href="mailto:info@grivetto.eu" className="modern-btn">Contattaci!</a>
        </motion.div>
      </main>
    </div>
  );
}