import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from '../components/LanguageSelector';
import DenaroMachine from '../components/DenaroMachine';
import { translations } from '../translations';
import './Home.css';
import './HomeCyberpunk.css';

const Spline = React.lazy(() => import('@splinetool/react-spline'));

class SplineErrorBoundary extends React.Component {
    constructor(props) { super(props); this.state = { hasError: false }; }
    static getDerivedStateFromError() { return { hasError: true }; }
    render() { return this.state.hasError ? null : this.props.children; }
}

export default function Home({ onNavigate }) {
    const [scrollY, setScrollY] = useState(0);
    const [theme, setTheme] = useState('cyberpunk'); // Toggle between 'default' and 'cyberpunk'
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
    const { t, language, toggleLanguage } = useLanguage();

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        
        checkMobile();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', checkMobile);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', checkMobile);
        };
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
                        <span className="logo-badge">IT Specialist</span>
                    </div>

                    <div className="nav-actions">
                        <LanguageSelector theme={theme} />

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
                        <a href="#services" className="nav-link" onClick={() => setIsMenuOpen(false)}>{t('services', 'title')}</a>
                        <button onClick={() => { onNavigate('resume'); setIsMenuOpen(false); }} className="nav-link-btn">{t('nav', 'resume')}</button>
                    </div>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section className="hero-section" style={{ position: 'relative', overflow: 'hidden' }}>
                {!isMobile && (
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                        <SplineErrorBoundary>
                            <Suspense fallback={null}>
                                <Spline scene="https://prod.spline.design/JCCgHs42uvms7Jrx/scene.splinecode" />
                            </Suspense>
                        </SplineErrorBoundary>
                    </div>
                )}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="hero-content"
                    style={{ position: 'relative', zIndex: 1, pointerEvents: 'none' }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="hero-badge"
                        style={{ pointerEvents: 'auto' }}
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
                        style={{ pointerEvents: 'auto' }}
                    >
                        <button onClick={() => onNavigate('portfolio')} className="btn-primary">
                            {t('hero', 'cta_portfolio')}
                            <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
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
                    <div className="section-header">
                        <a href="https://www.grivetto.eu/aura-quiet-living/index.html" target="_blank" rel="noopener noreferrer" className="section-badge" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                            {t('expertise', 'badge')}
                        </a>
                        <h2 className="section-title">{t('expertise', 'title')}</h2>
                        <p className="section-subtitle">{t('expertise', 'subtitle')}</p>
                    </div>

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
                                 <button onClick={() => window.open('/aura/', '_blank')} className="tag" style={{ position: 'relative', zIndex: 20, pointerEvents: 'auto' }}>
                                    {t('expertise', 'card_web').btn_aura}
                                </button>
                            </div>

                            <p style={{ fontSize: '0.8rem', fontWeight: '700', color: 'hsl(195, 60%, 45%)', marginTop: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.8 }}>
                                {t('expertise', 'card_web').label_business}
                            </p>
                            <div className="bento-links-container" style={{ position: 'relative', zIndex: 10 }}>
                                <a href="https://www.manuelaaires.it/" className="bento-link-card" target="_blank" rel="noopener noreferrer">
                                    <span className="bento-link-icon">⚕️</span>
                                    <span className="bento-link-text">{t('expertise', 'card_web').link_manuela.replace(' →', '').replace('→', '')}</span>
                                </a>
                                <a href="https://www.grivetto.it/" className="bento-link-card" target="_blank" rel="noopener noreferrer">
                                    <span className="bento-link-icon">👨‍💻</span>
                                    <span className="bento-link-text">{t('expertise', 'card_web').link_grivetto.replace(' →', '').replace('→', '')}</span>
                                </a>
                                <a href="https://vivirito.it/" className="bento-link-card" target="_blank" rel="noopener noreferrer">
                                    <span className="bento-link-icon">🏠</span>
                                    <span className="bento-link-text">{t('expertise', 'card_web').link_vivirito.replace(' →', '').replace('→', '')}</span>
                                </a>
                                <a href="https://serenissima99.it/" className="bento-link-card" target="_blank" rel="noopener noreferrer">
                                    <span className="bento-link-icon">🌟</span>
                                    <span className="bento-link-text">{t('expertise', 'card_web').link_serenissima.replace(' →', '').replace('→', '')}</span>
                                </a>
                            </div>

                            <div style={{ height: '1px', background: 'rgba(0,0,0,0.05)', margin: '1.25rem 0 1rem' }} />

                            <p style={{ fontSize: '0.8rem', fontWeight: '700', color: 'hsl(210, 15%, 50%)', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.7 }}>
                                {t('expertise', 'card_web').label_projects}
                            </p>
                            <div className="bento-links-container" style={{ position: 'relative', zIndex: 10 }}>
                                <a href="https://grivetto.github.io/soms/" className="bento-link-card" target="_blank" rel="noopener noreferrer">
                                    <span className="bento-link-icon">🏛️</span>
                                    <span className="bento-link-text">{t('expertise', 'card_web').link_github.replace(' →', '').replace('→', '')}</span>
                                </a>
                                <a href="https://autoscoola-qwg7u6ny.manus.space/" className="bento-link-card" target="_blank" rel="noopener noreferrer">
                                    <span className="bento-link-icon">🚗</span>
                                    <span className="bento-link-text">{t('expertise', 'card_web').link_autoschool.replace(' →', '').replace('→', '')}</span>
                                </a>
                                <a href="https://grivetto.github.io/estetista/" className="bento-link-card" target="_blank" rel="noopener noreferrer">
                                    <span className="bento-link-icon">💅</span>
                                    <span className="bento-link-text">{t('expertise', 'card_web').link_estetica.replace(' →', '').replace('→', '')}</span>
                                </a>
                                <a href="https://gestione-clinica-veterinaria-prenotazioni-244018943158.europe-west1.run.app" className="bento-link-card" target="_blank" rel="noopener noreferrer">
                                    <span className="bento-link-icon">🐾</span>
                                    <span className="bento-link-text">{t('expertise', 'card_web').link_drpaws.replace(' →', '').replace('→', '')}</span>
                                </a>
                                <a href="https://grivetto.github.io/ristorante/" className="bento-link-card" target="_blank" rel="noopener noreferrer">
                                    <span className="bento-link-icon">🍽️</span>
                                    <span className="bento-link-text">{t('expertise', 'card_web').link_ristorante.replace(' →', '').replace('→', '')}</span>
                                </a>
                                <a href="https://grivetto.github.io/guida/" className="bento-link-card" target="_blank" rel="noopener noreferrer">
                                    <span className="bento-link-icon">📍</span>
                                    <span className="bento-link-text">{t('expertise', 'card_web').link_guida.replace(' →', '').replace('→', '')}</span>
                                </a>
                                <a href="https://grivetto.github.io/autoscuola/" className="bento-link-card" target="_blank" rel="noopener noreferrer">
                                    <span className="bento-link-icon">🚘</span>
                                    <span className="bento-link-text">{t('expertise', 'card_web').link_autoscuola.replace(' →', '').replace('→', '')}</span>
                                </a>
                                <a href="https://grivetto.github.io/thay/" className="bento-link-card" target="_blank" rel="noopener noreferrer">
                                    <span className="bento-link-icon">🍜</span>
                                    <span className="bento-link-text">{t('expertise', 'card_web').link_thay.replace(' →', '').replace('→', '')}</span>
                                </a>
                                <a href="https://grivetto.github.io/nena/" className="bento-link-card" target="_blank" rel="noopener noreferrer">
                                    <span className="bento-link-icon">✨</span>
                                    <span className="bento-link-text">{t('expertise', 'card_web').link_nena.replace(' →', '').replace('→', '')}</span>
                                </a>
                                <a href="https://grivetto.github.io/michi/" className="bento-link-card" target="_blank" rel="noopener noreferrer">
                                    <span className="bento-link-icon">👤</span>
                                    <span className="bento-link-text">{t('expertise', 'card_web').link_michi.replace(' →', '').replace('→', '')}</span>
                                </a>
                                <a href="https://grivetto.github.io/ballerina/" className="bento-link-card" target="_blank" rel="noopener noreferrer">
                                    <span className="bento-link-icon">🩰</span>
                                    <span className="bento-link-text">Ballerina</span>
                                </a>
                                <a href="https://grivetto.github.io/caf/" className="bento-link-card" target="_blank" rel="noopener noreferrer">
                                    <span className="bento-link-icon">🏢</span>
                                    <span className="bento-link-text">{t('expertise', 'card_web').link_caf.replace(' →', '').replace('→', '')}</span>
                                </a>
                                <a href="https://omni-landing-244018943158.europe-west1.run.app" className="bento-link-card" target="_blank" rel="noopener noreferrer">
                                    <span className="bento-link-icon">😊</span>
                                    <span className="bento-link-text">{t('expertise', 'card_web').link_vimade.replace(' →', '').replace('→', '')}</span>
                                </a>
                            </div>
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
                            <button onClick={() => onNavigate('vintage')} className="bento-link" style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto', cursor: 'pointer', marginTop: '0.5rem' }}>
                                {t('expertise', 'card_history').btn_vintage}
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

            {/* Denaro Bot Dashboard Section */}
            <DenaroMachine />

            {/* Services Section */}
            <section className="services-section" id="services">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="section-container"
                >
                    <div className="section-header">
                        <span className="section-badge">{t('services', 'title')}</span>
                        <h2 className="section-title">{t('services', 'subtitle')}</h2>
                    </div>

                    <div className="services-grid">
                        <motion.div variants={itemVariants} className="service-card glass">
                            <div className="service-icon">🐧</div>
                            <h3>{t('services', 'linux').title}</h3>
                            <p>{t('services', 'linux').desc}</p>
                        </motion.div>
                        <motion.div variants={itemVariants} className="service-card glass">
                            <div className="service-icon">📊</div>
                            <h3>{t('services', 'monitoring').title}</h3>
                            <p>{t('services', 'monitoring').desc}</p>
                        </motion.div>
                        <motion.div variants={itemVariants} className="service-card glass">
                            <div className="service-icon">💻</div>
                            <h3>{t('services', 'web').title}</h3>
                            <p>{t('services', 'web').desc}</p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="service-card glass">
                            <div className="service-icon">🛡️</div>
                            <h3>{t('services', 'security').title}</h3>
                            <p>{t('services', 'security').desc}</p>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="section-container"
                >
                    <h2 className="section-title">{t('testimonials', 'title')}</h2>
                    <div className="testimonials-grid">
                        {t('testimonials', 'items').map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                className="testimonial-card glass"
                            >
                                <p className="testimonial-text">"{item.text}"</p>
                                <p className="testimonial-author">{item.author}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Blog Section */}
            <section className="blog-section">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-container"
                >
                    <div className="section-header">
                        <h2 className="section-title">{t('blog', 'title')}</h2>
                        <p className="section-subtitle">{t('blog', 'subtitle')}</p>
                    </div>
                    <div className="blog-grid">
                        {t('blog', 'posts').map((post, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="blog-card glass"
                            >
                                <h3>{post.title}</h3>
                                <p>{post.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <a href="https://www.linkedin.com/in/sgrivett/" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                            {t('blog', 'cta')}
                        </a>
                    </div>
                </motion.div>
            </section>



            {/* About & Philosophy Section (Increased Text Content) */}
            <section className="philosophy-section">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="section-container"
                >
                    <div className="philosophy-content glass">
                        <h2 className="section-title">{t('hero', 'title_tech')} & {t('hero', 'title_mind')}</h2>
                        <div className="section-text">
                            <p dangerouslySetInnerHTML={{ __html: t('philosophy', 'p1') }} />
                            <p dangerouslySetInnerHTML={{ __html: t('philosophy', 'p2') }} />
                            <p dangerouslySetInnerHTML={{ __html: t('philosophy', 'p3') }} />
                        </div>
                    </div>
                </motion.div>
            </section>

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
                        <a href="https://www.linkedin.com/in/sgrivett/" className="btn-secondary" target="_blank" rel="noopener noreferrer">
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
                                <a href="https://www.linkedin.com/in/sgrivett/" className="footer-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                <a href="https://github.com/grivetto" className="footer-link" target="_blank" rel="noopener noreferrer">GitHub</a>
                                <a href="https://www.facebook.com/sgrivetto/" className="footer-link" target="_blank" rel="noopener noreferrer">{t('footer', 'facebook')}</a>
                                <a href="https://x.com/sgrivett" className="footer-link" target="_blank" rel="noopener noreferrer">{t('footer', 'twitter')}</a>
                                <a href="https://www.youtube.com/@sergiogrivetto" className="footer-link" target="_blank" rel="noopener noreferrer">{t('footer', 'youtube')}</a>
                            </nav>
                        </div>

                        <div className="footer-column">
                            <h3 className="footer-heading">{t('footer', 'support')}</h3>
                            <nav className="footer-links">
                                <a href="https://www.grivetto.eu/hesk/index.php" className="footer-link" target="_blank" rel="noopener noreferrer">{t('footer', 'helpdesk')}</a>
                                <a href="mailto:sergio@grivetto.eu" className="footer-link">{t('footer', 'email')}</a>
                                <a href={t('footer', 'instagram_url')} className="footer-link" target="_blank" rel="noopener noreferrer">{t('footer', 'instagram')}</a>
                            </nav>
                        </div>

                        <div className="footer-column">
                            <h3 className="footer-heading">Contact</h3>
                            <div className="footer-info">
                                <p className="footer-info-item">📞 {t('footer', 'phone')}</p>
                                <p className="footer-info-item">📍 {t('footer', 'address')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p className="footer-copyright">© {new Date().getFullYear()} Sergio Grivetto. {t('footer', 'rights')}</p>
                        <p className="footer-tagline">{t('footer', 'tagline')}</p>
                        <p className="footer-updated" style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '0.5rem' }}>{t('footer', 'last_updated')}</p>
                    </div>
                </div>
            </footer >
        </div >
    );
}
