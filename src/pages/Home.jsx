import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from '../components/LanguageSelector';
import DenaroMachine from '../components/DenaroMachine';
import WebProjectsShowcase from '../components/WebProjectsShowcase';
import './Home.css';
import './HomeCyberpunk.css';

const Spline = React.lazy(() => import('@splinetool/react-spline'));

class SplineErrorBoundary extends React.Component {
    constructor(props) { super(props); this.state = { hasError: false }; }
    static getDerivedStateFromError() { return { hasError: true }; }
    render() { return this.state.hasError ? null : this.props.children; }
}

const QUICK_NAV_LABELS = {
    it: {
        work: 'Progetti Web',
        denaro: 'Trading Fleet',
        services: 'Servizi IT',
        resume: 'Curriculum',
        menuTitle: 'Navigazione Rapida'
    },
    en: {
        work: 'Web Projects',
        denaro: 'Trading Fleet',
        services: 'IT Services',
        resume: 'Resume / CV',
        menuTitle: 'Quick Navigation'
    },
    es: {
        work: 'Proyectos Web',
        denaro: 'Trading Fleet',
        services: 'Servicios IT',
        resume: 'Currículum',
        menuTitle: 'Navegación Rápida'
    },
    th: {
        work: 'โปรเจกต์เว็บ',
        denaro: 'ระบบเทรด',
        services: 'บริการไอที',
        resume: 'เรซูเม่',
        menuTitle: 'เมนูนำทาง'
    }
};

export default function Home({ onNavigate }) {
    const [scrollY, setScrollY] = useState(0);
    const [theme] = useState('cyberpunk');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
    const { t, language } = useLanguage();
    const quickNav = QUICK_NAV_LABELS[language] || QUICK_NAV_LABELS.en;

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth >= 768) {
                setScrollY(window.scrollY);
            }
        };
        const checkMobile = () => setIsMobile(window.innerWidth < 768);

        checkMobile();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    return (
        <div className={`modern-home ${theme} lang-${language}`}>
            {/* Ambient Background */}
            <div className="ambient-bg">
                <div className="gradient-orb orb-1" style={{ transform: `translateY(${scrollY * 0.3}px)` }}></div>
                <div className="gradient-orb orb-2" style={{ transform: `translateY(${scrollY * 0.2}px)` }}></div>
                <div className="gradient-orb orb-3" style={{ transform: `translateY(${scrollY * 0.4}px)` }}></div>
            </div>

            {/* Navigation */}
            <nav className="modern-nav">
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

                    {isMenuOpen && (
                        <div
                            className="mobile-nav-backdrop"
                            onClick={() => setIsMenuOpen(false)}
                            aria-hidden="true"
                        />
                    )}
                    <div className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
                        <div className="mobile-drawer-header">
                            <span className="mobile-drawer-title">{quickNav.menuTitle}</span>
                            <button
                                type="button"
                                className="mobile-drawer-close"
                                onClick={() => setIsMenuOpen(false)}
                                aria-label="Close menu"
                            >
                                ✕
                            </button>
                        </div>
                        <a href="#work" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                            <span className="nav-link-icon">🚀</span>
                            <span>{t('nav', 'work')}</span>
                        </a>
                        <a href="#denaro" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                            <span className="nav-link-icon">📈</span>
                            <span>{quickNav.denaro}</span>
                        </a>
                        <a href="#services" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                            <span className="nav-link-icon">🐧</span>
                            <span>{t('services', 'title')}</span>
                        </a>
                        <button onClick={() => { onNavigate('resume'); setIsMenuOpen(false); }} className="nav-link-btn">
                            <span>📄 {t('nav', 'resume')}</span>
                        </button>
                    </div>
                </div>
            </nav>

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
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="hero-content"
                    style={{ position: 'relative', zIndex: 1, pointerEvents: 'none' }}
                >
                    <div className="hero-badge" style={{ pointerEvents: 'auto' }}>
                        <span className="badge-dot"></span>
                        {t('hero', 'badge')}
                    </div>

                    <h1 className="hero-title">
                        {t('hero', 'title_part1')} <span className="gradient-text">{t('hero', 'title_tech')}</span>
                        <br />
                        {t('hero', 'title_part2')} <span className="gradient-text-alt">{t('hero', 'title_mind')}</span>
                    </h1>

                    <p className="hero-subtitle" style={{ whiteSpace: 'pre-line' }}>
                        {t('hero', 'subtitle')}
                    </p>

                    <div className="hero-cta" style={{ pointerEvents: 'auto' }}>
                        <button onClick={() => onNavigate('portfolio')} className="btn-primary">
                            <span>{t('hero', 'cta_portfolio')}</span>
                            <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    {/* Quick-Jump Dock (Mobile & Desktop) */}
                    <div className="hero-quick-dock" style={{ pointerEvents: 'auto' }}>
                        <a href="#work" className="quick-dock-pill">
                            <span className="quick-dock-icon">🚀</span>
                            <span>{quickNav.work}</span>
                        </a>
                        <a href="#denaro" className="quick-dock-pill quick-dock-pill-accent">
                            <span className="quick-dock-icon">📈</span>
                            <span>{quickNav.denaro}</span>
                        </a>
                        <a href="#services" className="quick-dock-pill">
                            <span className="quick-dock-icon">🐧</span>
                            <span>{quickNav.services}</span>
                        </a>
                        <button type="button" onClick={() => onNavigate('resume')} className="quick-dock-pill">
                            <span className="quick-dock-icon">📄</span>
                            <span>{quickNav.resume}</span>
                        </button>
                    </div>

                    <div className="hero-stats" style={{ pointerEvents: 'auto' }}>
                        <div className="stat-item">
                            <div className="stat-value">30+</div>
                            <div className="stat-label">{t('hero', 'stat_exp')}</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-value">50+</div>
                            <div className="stat-label">{t('hero', 'stat_proj')}</div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Expertise Bento Grid */}
            <section className="expertise-section" id="work">
                <div className="section-container">
                    <div className="section-header">
                        <a href="https://www.grivetto.eu/aura-quiet-living/index.html" target="_blank" rel="noopener noreferrer" className="section-badge" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                            {t('expertise', 'badge')}
                        </a>
                        <h2 className="section-title">{t('expertise', 'title')}</h2>
                        <p className="section-subtitle">{t('expertise', 'subtitle')}</p>
                    </div>

                    <div className="bento-grid">
                        <div className="bento-card bento-large">
                            <div className="bento-card-top">
                                <div className="bento-icon">🚀</div>
                                <div>
                                    <h3 className="bento-title">{t('expertise', 'card_web').title}</h3>
                                    <p className="bento-description">
                                        {t('expertise', 'card_web').desc}
                                    </p>
                                </div>
                            </div>

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

                            <p className="bento-sub-label bento-sub-label-cyan">
                                {t('expertise', 'card_web').label_business}
                            </p>
                            <div className="bento-links-container" style={{ position: 'relative', zIndex: 10 }}>
                                <a href="https://www.manuelaaires.it/" className="bento-link-card" target="_blank" rel="noopener noreferrer">
                                    <span className="bento-link-icon">⚕️</span>
                                    <span className="bento-link-text">{t('expertise', 'card_web').link_manuela.replace(' →', '').replace('→', '')}</span>
                                    <span className="bento-link-arrow">↗</span>
                                </a>
                                <a href="https://www.grivetto.it/" className="bento-link-card" target="_blank" rel="noopener noreferrer">
                                    <span className="bento-link-icon">👨‍💻</span>
                                    <span className="bento-link-text">{t('expertise', 'card_web').link_grivetto.replace(' →', '').replace('→', '')}</span>
                                    <span className="bento-link-arrow">↗</span>
                                </a>
                                <a href="https://vivirito.it/" className="bento-link-card" target="_blank" rel="noopener noreferrer">
                                    <span className="bento-link-icon">🏠</span>
                                    <span className="bento-link-text">{t('expertise', 'card_web').link_vivirito.replace(' →', '').replace('→', '')}</span>
                                    <span className="bento-link-arrow">↗</span>
                                </a>
                                <a href="https://web.grivetto.eu/" className="bento-link-card" target="_blank" rel="noopener noreferrer">
                                    <span className="bento-link-icon">📈</span>
                                    <span className="bento-link-text">{t('expertise', 'card_web').link_web_grivetto.replace(' →', '').replace('→', '')}</span>
                                    <span className="bento-link-arrow">↗</span>
                                </a>
                                <a href="https://serenissima99.it/" className="bento-link-card" target="_blank" rel="noopener noreferrer">
                                    <span className="bento-link-icon">🌟</span>
                                    <span className="bento-link-text">{t('expertise', 'card_web').link_serenissima.replace(' →', '').replace('→', '')}</span>
                                    <span className="bento-link-arrow">↗</span>
                                </a>
                            </div>

                            <div className="bento-divider" />

                            <p className="bento-sub-label">
                                {t('expertise', 'card_web').label_projects}
                            </p>
                            <WebProjectsShowcase />
                        </div>

                        <div className="bento-card">
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
                        </div>

                        <div className="bento-card">
                            <div className="bento-icon">📜</div>
                            <h3 className="bento-title">{t('expertise', 'card_archives').title}</h3>
                            <p className="bento-description">
                                {t('expertise', 'card_archives').desc}
                            </p>
                            <a href="https://archive.org/" className="bento-link" target="_blank" rel="noopener noreferrer" style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto', marginTop: '1rem' }}>
                                {t('expertise', 'card_archives').link_history}
                            </a>
                        </div>

                        <div className="bento-card bento-tall">
                            <div className="bento-icon">🛠️</div>
                            <h3 className="bento-title">{t('expertise', 'card_support').title}</h3>
                            <p className="bento-description">
                                {t('expertise', 'card_support').desc}
                            </p>
                            <div className="bento-tags bento-tags-stack">
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
                        </div>

                        <div className="bento-card bento-accent">
                            <div className="quote-mark">"</div>
                            <blockquote className="bento-quote">
                                {t('expertise', 'quote')}
                            </blockquote>
                            <cite className="bento-cite">{t('expertise', 'cite')}</cite>
                        </div>
                    </div>
                </div>
            </section>

            {/* Denaro Bot Dashboard Section */}
            <DenaroMachine />

            {/* Services Section */}
            <section className="services-section" id="services">
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-badge">{t('services', 'title')}</span>
                        <h2 className="section-title">{t('services', 'subtitle')}</h2>
                    </div>

                    <div className="services-grid">
                        <div className="service-card glass">
                            <div className="service-icon">🐧</div>
                            <h3>{t('services', 'linux').title}</h3>
                            <p>{t('services', 'linux').desc}</p>
                        </div>
                        <div className="service-card glass">
                            <div className="service-icon">📊</div>
                            <h3>{t('services', 'monitoring').title}</h3>
                            <p>{t('services', 'monitoring').desc}</p>
                        </div>
                        <div className="service-card glass">
                            <div className="service-icon">💻</div>
                            <h3>{t('services', 'web').title}</h3>
                            <p>{t('services', 'web').desc}</p>
                        </div>
                        <div className="service-card glass">
                            <div className="service-icon">🛡️</div>
                            <h3>{t('services', 'security').title}</h3>
                            <p>{t('services', 'security').desc}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section">
                <div className="section-container">
                    <h2 className="section-title" style={{ textAlign: 'center' }}>{t('testimonials', 'title')}</h2>
                    <div className="testimonials-grid">
                        {t('testimonials', 'items').map((item, index) => (
                            <div key={index} className="testimonial-card glass">
                                <p className="testimonial-text">"{item.text}"</p>
                                <p className="testimonial-author">{item.author}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Section */}
            <section className="blog-section">
                <div className="section-container">
                    <div className="section-header">
                        <h2 className="section-title">{t('blog', 'title')}</h2>
                        <p className="section-subtitle">{t('blog', 'subtitle')}</p>
                    </div>
                    <div className="blog-grid">
                        {t('blog', 'posts').map((post, index) => (
                            <div key={index} className="blog-card glass">
                                <h3>{post.title}</h3>
                                <p>{post.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <a href="https://www.linkedin.com/in/sgrivett/" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                            {t('blog', 'cta')}
                        </a>
                    </div>
                </div>
            </section>

            {/* About & Philosophy Section */}
            <section className="philosophy-section">
                <div className="section-container">
                    <div className="philosophy-content glass">
                        <h2 className="section-title">{t('hero', 'title_tech')} & {t('hero', 'title_mind')}</h2>
                        <div className="section-text">
                            <p dangerouslySetInnerHTML={{ __html: t('philosophy', 'p1') }} />
                            <p dangerouslySetInnerHTML={{ __html: t('philosophy', 'p2') }} />
                            <p dangerouslySetInnerHTML={{ __html: t('philosophy', 'p3') }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section" id="history">
                <div className="cta-container">
                    <h2 className="cta-title">{t('cta', 'title')}</h2>
                    <p className="cta-subtitle">
                        {t('cta', 'subtitle')}
                    </p>
                    <div className="cta-buttons">
                        <a href="https://www.linkedin.com/in/sgrivett/" className="btn-secondary" target="_blank" rel="noopener noreferrer">
                            {t('cta', 'btn_linkedin')}
                        </a>
                    </div>
                </div>
            </section>

            {/* Modern Footer with Contact Links */}
            <footer className="modern-footer">
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
                                <p className="footer-info-item">📞 <a href="tel:+393711741209" className="footer-link" style={{ display: 'inline' }}>{t('footer', 'phone')}</a></p>
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
            </footer>
        </div>
    );
}
