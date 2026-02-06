import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import './Home.css';
import './HomeCyberpunk.css';

export default function Home({ onNavigate }) {
    const [scrollY, setScrollY] = useState(0);
    const [theme, setTheme] = useState('cyberpunk'); // Toggle between 'default' and 'cyberpunk'
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t, language, toggleLanguage } = useLanguage();

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <div className={`modern-home ${theme} lang-${language}`}>
            {/* Ambient Background */}
            <div className="ambient-bg">
                <div className="gradient-orb orb-1" style={{ transform: `translateY(${scrollY * 0.3}px)` }}></div>
                <div className="gradient-orb orb-2" style={{ transform: `translateY(${scrollY * 0.2}px)` }}></div>
                <div className="gradient-orb orb-3" style={{ transform: `translateY(${scrollY * 0.4}px)` }}></div>
            </div>

            {/* Navigation */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="modern-nav"
            >
                <div className="nav-container">
                    <div className="nav-logo">
                        <span className="logo-text">Sergio Grivetto</span>
                        <span className="logo-badge">Digital Architect</span>
                    </div>

                    <div className="nav-actions">
                        <button onClick={toggleLanguage} className="lang-toggle-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px' }}>
                            <img
                                src={language === 'en' ? "/images/it_flag.png" : "https://flagcdn.com/w40/gb.png"}
                                alt={language === 'en' ? "Switch to Italian" : "Switch to English"}
                                style={{ width: '30px', height: 'auto', borderRadius: '4px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
                            />
                        </button>

                        <button
                            className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle navigation"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>

                    <div className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
                        <a href="#work" className="nav-link" onClick={() => setIsMenuOpen(false)}>{t('nav', 'work')}</a>
                        <a href="#history" className="nav-link" onClick={() => setIsMenuOpen(false)}>{t('nav', 'history')}</a>
                        <button onClick={() => { onNavigate('resume'); setIsMenuOpen(false); }} className="nav-link-btn">{t('nav', 'resume')}</button>
                    </div>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section className="hero-section">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="hero-content"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="hero-badge"
                    >
                        <span className="badge-dot"></span>
                        {t('hero', 'badge')}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="hero-title"
                    >
                        {t('hero', 'title_part1')} <span className="gradient-text">{t('hero', 'title_tech')}</span>
                        <br />
                        {t('hero', 'title_part2')} <span className="gradient-text-alt">{t('hero', 'title_mind')}</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                        className="hero-subtitle"
                        style={{ whiteSpace: 'pre-line' }}
                    >
                        {t('hero', 'subtitle')}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.1 }}
                        className="hero-cta"
                    >
                        <button onClick={() => onNavigate('portfolio')} className="btn-primary">
                            {t('hero', 'cta_portfolio')}
                            <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <button onClick={() => onNavigate('links')} className="btn-secondary">
                            {t('hero', 'cta_peace')}
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.3 }}
                        className="hero-stats"
                    >
                        <div className="stat-item">
                            <div className="stat-value">30+</div>
                            <div className="stat-label">{t('hero', 'stat_exp')}</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-value">50+</div>
                            <div className="stat-label">{t('hero', 'stat_proj')}</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-value">∞</div>
                            <div className="stat-label">{t('hero', 'stat_peace')}</div>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Expertise Bento Grid */}
            <section className="expertise-section" id="work">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="section-container"
                >
                    <motion.div variants={itemVariants} className="section-header">
                        <a href="https://www.grivetto.eu/aura-quiet-living/index.html" target="_blank" rel="noopener noreferrer" className="section-badge" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                            {t('expertise', 'badge')}
                        </a>
                        <h2 className="section-title">{t('expertise', 'title')}</h2>
                        <p className="section-subtitle">{t('expertise', 'subtitle')}</p>
                    </motion.div>

                    <div className="bento-grid">
                        <motion.div variants={itemVariants} className="bento-card bento-large">
                            <div className="bento-icon">🚀</div>
                            <h3 className="bento-title">{t('expertise', 'card_web').title}</h3>
                            <p className="bento-description">
                                {t('expertise', 'card_web').desc}
                            </p>
                            <div className="bento-tags">
                                <button onClick={() => onNavigate('curiosity')} className="tag" style={{ position: 'relative', zIndex: 20, pointerEvents: 'auto' }}>
                                    {t('expertise', 'card_web').btn_curiosity}
                                </button>
                                <button onClick={() => window.open('https://www.grivetto.eu/web-apps/neon-tunnel/', '_blank')} className="tag" style={{ position: 'relative', zIndex: 20, pointerEvents: 'auto' }}>
                                    {t('expertise', 'card_web').btn_tunnel}
                                </button>
                                <button onClick={() => onNavigate('tictactoe')} className="tag" style={{ position: 'relative', zIndex: 20, pointerEvents: 'auto' }}>
                                    {t('expertise', 'card_web').btn_tictactoe}
                                </button>
                                <button onClick={() => onNavigate('tetris')} className="tag" style={{ position: 'relative', zIndex: 20, pointerEvents: 'auto' }}>
                                    {t('expertise', 'card_web').btn_tetris}
                                </button>
                                <button onClick={() => onNavigate('rubiks')} className="tag" style={{ position: 'relative', zIndex: 20, pointerEvents: 'auto' }}>
                                    {t('expertise', 'card_web').btn_cube}
                                </button>
                                <button onClick={() => window.location.href = 'https://www.grivetto.eu/aura-quiet-living/index.html'} className="tag" style={{ position: 'relative', zIndex: 20, pointerEvents: 'auto' }}>
                                    {t('expertise', 'card_web').btn_aura}
                                </button>
                            </div>
                            <a href="https://www.manuelaaires.it/" className="bento-link" target="_blank" rel="noopener noreferrer" style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto', marginTop: '1rem', display: 'block' }}>
                                {t('expertise', 'card_web').link_manuela}
                            </a>
                            <a href="https://www.grivetto.it/" className="bento-link" target="_blank" rel="noopener noreferrer" style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto', marginTop: '0.5rem', display: 'block' }}>
                                {t('expertise', 'card_web').link_grivetto}
                            </a>
                            <a href="https://grivetto.github.io/" className="bento-link" target="_blank" rel="noopener noreferrer" style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto', marginTop: '0.5rem', display: 'block', marginBottom: '1rem' }}>
                                {t('expertise', 'card_web').link_github}
                            </a>
                        </motion.div>

                        <motion.div variants={itemVariants} className="bento-card">
                            <div className="bento-icon">🧘</div>
                            <h3 className="bento-title">{t('expertise', 'card_history').title}</h3>
                            <p className="bento-description">
                                {t('expertise', 'card_history').desc}
                            </p>
                            <button onClick={() => onNavigate('links')} className="bento-link" style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto', cursor: 'pointer' }}>
                                {t('expertise', 'card_history').btn_explore}
                            </button>
                        </motion.div>

                        <motion.div variants={itemVariants} className="bento-card">
                            <div className="bento-icon">📜</div>
                            <h3 className="bento-title">{t('expertise', 'card_archives').title}</h3>
                            <p className="bento-description">
                                {t('expertise', 'card_archives').desc}
                            </p>
                            <a href="https://archive.org/" className="bento-link" target="_blank" rel="noopener noreferrer" style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto', marginTop: '1rem' }}>
                                {t('expertise', 'card_archives').link_history}
                            </a>
                        </motion.div>

                        <motion.div variants={itemVariants} className="bento-card bento-tall">
                            <div className="bento-icon">🛠️</div>
                            <h3 className="bento-title">{t('expertise', 'card_support').title}</h3>
                            <p className="bento-description">
                                {t('expertise', 'card_support').desc}
                            </p>
                            <div className="bento-tags" style={{ flexDirection: 'column', gap: '8px', alignItems: 'stretch' }}>
                                <button onClick={() => onNavigate('hesk')} className="tag" style={{ position: 'relative', zIndex: 20, pointerEvents: 'auto' }}>
                                    {t('expertise', 'card_support').btn_hesk}
                                </button>
                                <button onClick={() => onNavigate('terminal')} className="tag" style={{ position: 'relative', zIndex: 20, pointerEvents: 'auto' }}>
                                    {t('expertise', 'card_support').btn_sysadmin}
                                </button>
                                <button onClick={() => onNavigate('terminal-demo')} className="tag" style={{ position: 'relative', zIndex: 20, pointerEvents: 'auto' }}>
                                    {t('expertise', 'card_support').btn_terminal}
                                </button>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="bento-card bento-accent">
                            <div className="quote-mark">"</div>
                            <blockquote className="bento-quote">
                                {t('expertise', 'quote')}
                            </blockquote>
                            <cite className="bento-cite">{t('expertise', 'cite')}</cite>
                        </motion.div>
                    </div>
                </motion.div >
            </section >






            {/* CTA Section */}
            < section className="cta-section" id="history" >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="cta-container"
                >
                    <h2 className="cta-title">{t('cta', 'title')}</h2>
                    <p className="cta-subtitle">
                        {t('cta', 'subtitle')}
                    </p>
                    <div className="cta-buttons">
                        <a href="https://www.grivetto.eu/hesk/index.php" className="btn-primary" target="_blank" rel="noopener noreferrer">
                            {t('cta', 'btn_touch')}
                        </a>
                        <a href="https://linkedin.com/in/sgrivett" className="btn-secondary" target="_blank" rel="noopener noreferrer">
                            {t('cta', 'btn_linkedin')}
                        </a>
                    </div>
                </motion.div>
            </section >

            {/* Modern Footer with Contact Links */}
            < footer className="modern-footer" >
                <div className="footer-container">
                    <div className="footer-grid">
                        <div className="footer-column">
                            <h3 className="footer-heading">{t('footer', 'connect')}</h3>
                            <nav className="footer-links">
                                <a href="https://linkedin.com/in/sgrivett" className="footer-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                <a href="https://github.com/grivetto" className="footer-link" target="_blank" rel="noopener noreferrer">GitHub</a>
                            </nav>
                        </div>

                        <div className="footer-column">
                            <h3 className="footer-heading">{t('footer', 'support')}</h3>
                            <nav className="footer-links">
                                <a href="https://www.grivetto.eu/hesk/index.php" className="footer-link" target="_blank" rel="noopener noreferrer">{t('footer', 'helpdesk')}</a>
                                <a href="mailto:sergio@grivetto.eu" className="footer-link">{t('footer', 'email')}</a>
                            </nav>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p className="footer-copyright">© {new Date().getFullYear()} Sergio Grivetto. {t('footer', 'rights')}</p>
                        <p className="footer-tagline">{t('footer', 'tagline')}</p>
                    </div>
                </div>
            </footer >
        </div >
    );
}
