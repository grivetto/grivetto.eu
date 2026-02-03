import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Home.css';
import './HomeCyberpunk.css';

export default function Home({ onNavigate }) {
    const [scrollY, setScrollY] = useState(0);
    const [theme, setTheme] = useState('cyberpunk'); // Toggle between 'default' and 'cyberpunk'

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
        <div className={`modern-home ${theme}`}>
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
                    <div className="nav-links">
                        <a href="#work" className="nav-link">Work</a>
                        <a href="#mindfulness" className="nav-link">Mindfulness</a>
                        <a href="#history" className="nav-link">History</a>
                        <button onClick={() => onNavigate('resume')} className="nav-link-btn">Resume</button>
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
                        Available for collaboration
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="hero-title"
                    >
                        Bridging <span className="gradient-text">Technology</span>
                        <br />
                        and <span className="gradient-text-alt">Mindfulness</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                        className="hero-subtitle"
                    >
                        Crafting digital experiences that harmonize innovation with inner peace.
                        <br />
                        Building the future with calm precision.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.1 }}
                        className="hero-cta"
                    >
                        <button onClick={() => onNavigate('portfolio')} className="btn-primary">
                            View Portfolio
                            <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <button onClick={() => onNavigate('links')} className="btn-secondary">
                            Peaceful Thoughts
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
                            <div className="stat-label">years of experience</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-value">50+</div>
                            <div className="stat-label">Projects Delivered</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-value">∞</div>
                            <div className="stat-label">Inner Peace</div>
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
                        <span className="section-badge">Expertise</span>
                        <h2 className="section-title">Selected Domains</h2>
                        <p className="section-subtitle">Areas of mastery and continuous innovation</p>
                    </motion.div>

                    <div className="bento-grid">
                        <motion.div variants={itemVariants} className="bento-card bento-large">
                            <div className="bento-icon">🚀</div>
                            <h3 className="bento-title">Modern Web Development</h3>
                            <p className="bento-description">
                                Building scalable, performant Single Page Applications with React ecosystem,
                                focusing on exceptional user experience and code quality.
                            </p>
                            <div className="bento-tags">
                                <span className="tag">React 19</span>
                                <span className="tag">Vite</span>
                                <span className="tag">PWA</span>
                                <span className="tag">TypeScript</span>
                            </div>
                            <a href="https://www.manuelaaires.it/" className="bento-link" target="_blank" rel="noopener noreferrer" style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto', marginTop: '1rem', display: 'block' }}>
                                View Recent Work: ManuelaAires.it →
                            </a>
                            <a href="https://www.grivetto.it/" className="bento-link" target="_blank" rel="noopener noreferrer" style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto', marginTop: '0.5rem', display: 'block', marginBottom: '1rem' }}>
                                View Recent Work: Grivetto.it →
                            </a>

                            <div className="bento-tags" style={{ flexDirection: 'column', gap: '8px', alignItems: 'stretch', marginTop: '10px' }}>
                                <button onClick={() => onNavigate('curiosity')} className="tag" style={{ background: 'rgba(0, 242, 255, 0.1)', border: '1px solid #00f2ff', color: '#00f2ff', cursor: 'pointer', textAlign: 'center', position: 'relative', zIndex: 20, pointerEvents: 'auto' }}>
                                    ✨ Curiosità Cosmica
                                </button>
                                <button onClick={() => window.open('https://www.grivetto.eu/web-apps/neon-tunnel/', '_blank')} className="tag" style={{ background: 'rgba(0, 242, 255, 0.1)', border: '1px solid #00f2ff', color: '#00f2ff', cursor: 'pointer', textAlign: 'center', position: 'relative', zIndex: 20, pointerEvents: 'auto' }}>
                                    🌀 Neon Tunnel
                                </button>
                                <button onClick={() => onNavigate('tictactoe')} className="tag" style={{ background: 'rgba(0, 242, 255, 0.1)', border: '1px solid #00f2ff', color: '#00f2ff', cursor: 'pointer', textAlign: 'center', position: 'relative', zIndex: 20, pointerEvents: 'auto' }}>
                                    ⭕ Neon Tic-Tac-Toe
                                </button>
                                <button onClick={() => onNavigate('tetris')} className="tag" style={{ background: 'rgba(0, 242, 255, 0.1)', border: '1px solid #00f2ff', color: '#00f2ff', cursor: 'pointer', textAlign: 'center', position: 'relative', zIndex: 20, pointerEvents: 'auto' }}>
                                    🕹️ Neon Tetris
                                </button>
                                <button onClick={() => onNavigate('rubiks')} className="tag" style={{ background: 'rgba(0, 242, 255, 0.1)', border: '1px solid #00f2ff', color: '#00f2ff', cursor: 'pointer', textAlign: 'center', position: 'relative', zIndex: 20, pointerEvents: 'auto' }}>
                                    🎲 3D Cube
                                </button>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="bento-card">
                            <div className="bento-icon">🧘</div>
                            <h3 className="bento-title">Historic Italian Internet brands</h3>
                            <p className="bento-description">
                                Exploring Italy's pioneering digital heritage and vintage web culture.
                            </p>
                            <button onClick={() => onNavigate('links')} className="bento-link" style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto', cursor: 'pointer' }}>
                                Explore →
                            </button>
                        </motion.div>

                        <motion.div variants={itemVariants} className="bento-card">
                            <div className="bento-icon">📜</div>
                            <h3 className="bento-title">Digital Archives</h3>
                            <p className="bento-description">
                                Preserving Italian internet history from CRS4 and Video On Line eras.
                            </p>
                            <a href="https://archive.org/" className="bento-link" target="_blank" rel="noopener noreferrer" style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto', marginTop: '1rem' }}>
                                View History →
                            </a>
                        </motion.div>

                        <motion.div variants={itemVariants} className="bento-card bento-tall">
                            <div className="bento-icon">🛠️</div>
                            <h3 className="bento-title">Support Systems</h3>
                            <p className="bento-description">
                                Implementing robust helpdesk and mail administration solutions with
                                focus on reliability and efficient communication.
                            </p>
                            <div className="bento-tags" style={{ flexDirection: 'column', gap: '8px', alignItems: 'stretch' }}>
                                <button onClick={() => onNavigate('hesk')} className="tag" style={{ background: 'rgba(0, 242, 255, 0.1)', border: '1px solid #00f2ff', color: '#00f2ff', cursor: 'pointer', textAlign: 'center', position: 'relative', zIndex: 20, pointerEvents: 'auto' }}>
                                    HESK
                                </button>
                                <button onClick={() => onNavigate('terminal')} className="tag" style={{ background: 'rgba(0, 242, 255, 0.1)', border: '1px solid #00f2ff', color: '#00f2ff', cursor: 'pointer', textAlign: 'center', position: 'relative', zIndex: 20, pointerEvents: 'auto' }}>
                                    System Admin
                                </button>
                                <button onClick={() => onNavigate('terminal-demo')} className="tag" style={{ background: 'rgba(0, 242, 255, 0.1)', border: '1px solid #00f2ff', color: '#00f2ff', cursor: 'pointer', textAlign: 'center', position: 'relative', zIndex: 20, pointerEvents: 'auto' }}>
                                    Terminal Session
                                </button>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="bento-card bento-accent">
                            <div className="quote-mark">"</div>
                            <blockquote className="bento-quote">
                                In the midst of movement and chaos, keep stillness inside of you.
                            </blockquote>
                            <cite className="bento-cite">— Philosophy of Peace</cite>
                        </motion.div>
                    </div>
                </motion.div >
            </section >

            {/* Featured Projects */}
            < section className="projects-section" id="mindfulness" >
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="section-container"
                >
                    <motion.div variants={itemVariants} className="section-header">
                        <span className="section-badge">Portfolio</span>
                        <h2 className="section-title">Featured Work</h2>
                        <p className="section-subtitle">A selection of projects that showcase my expertise</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="project-card-unified">
                        <div className="unified-grid">
                            {/* Aura Item */}
                            <div className="unified-item">
                                <a href="/aura-quiet-living/index.html" target="_blank" className="project-image-placeholder unified-thumb" style={{ cursor: 'pointer', display: 'block', textDecoration: 'none' }}>
                                    <img src="/images/aura_card.png" alt="Aura Quiet Living" className="project-thumb" />
                                    <div className="project-tag">Web App</div>
                                </a>
                                <div className="project-content" style={{ padding: 0 }}>
                                    <h3 className="project-title">Aura Quiet Living</h3>
                                    <p className="project-description">
                                        AI-powered wellness application focused on mindfulness and peaceful living.
                                    </p>
                                    <a href="/aura-quiet-living/index.html" target="_blank" className="project-link" style={{ marginRight: '15px' }}>
                                        View Project →
                                    </a>
                                    <a href="https://www.grivetto.eu/aura-quiet-living/index.html" target="_blank" className="project-link">
                                        Launch Aura →
                                    </a>
                                </div>
                            </div>

                            {/* Apps Item */}
                            <div className="unified-item">
                                <div onClick={() => onNavigate('app')} className="project-image-placeholder unified-thumb" style={{ cursor: 'pointer' }}>
                                    <img src="/images/apps_card.png" alt="Interactive Web Apps" className="project-thumb" />
                                    <div className="project-tag">Interactive</div>
                                </div>
                                <div className="project-content" style={{ padding: 0 }}>
                                    <h3 className="project-title">Web Applications</h3>
                                    <p className="project-description">
                                        Interactive demos: <strong>Cosmic Curiosity</strong>, Web Terminal, Retro Games, and more.
                                    </p>
                                    <button onClick={() => onNavigate('app')} className="project-link">
                                        Explore Apps →
                                    </button>
                                </div>
                            </div>

                            {/* Portfolio Item */}
                            <div className="unified-item">
                                <div onClick={() => onNavigate('portfolio')} className="project-image-placeholder unified-thumb" style={{ cursor: 'pointer' }}>
                                    <img src="/images/portfolio_card.png" alt="Portfolio" className="project-thumb" />
                                    <div className="project-tag">Portfolio</div>
                                </div>
                                <div className="project-content" style={{ padding: 0 }}>
                                    <h3 className="project-title">Complete Portfolio</h3>
                                    <p className="project-description">
                                        Comprehensive showcase of all projects and professional experience.
                                    </p>
                                    <button onClick={() => onNavigate('portfolio')} className="project-link" style={{ marginRight: '15px' }}>
                                        View All →
                                    </button>
                                    <button onClick={() => onNavigate('resume')} className="project-link">
                                        View Resume →
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
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
                    <h2 className="cta-title">Let's Create Something Extraordinary</h2>
                    <p className="cta-subtitle">
                        Combining technical excellence with mindful design philosophy
                    </p>
                    <div className="cta-buttons">
                        <a href="https://www.grivetto.eu/hesk/index.php" className="btn-primary" target="_blank" rel="noopener noreferrer">
                            Get in Touch
                        </a>
                        <a href="https://linkedin.com/in/sgrivett" className="btn-secondary" target="_blank" rel="noopener noreferrer">
                            Connect on LinkedIn
                        </a>
                    </div>
                </motion.div>
            </section >

            {/* Modern Footer with Contact Links */}
            < footer className="modern-footer" >
                <div className="footer-container">
                    <div className="footer-grid">
                        <div className="footer-column">
                            <h3 className="footer-heading">Connect</h3>
                            <nav className="footer-links">
                                <a href="https://linkedin.com/in/sgrivett" className="footer-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                <a href="https://github.com/grivetto" className="footer-link" target="_blank" rel="noopener noreferrer">GitHub</a>
                            </nav>
                        </div>

                        <div className="footer-column">
                            <h3 className="footer-heading">Support</h3>
                            <nav className="footer-links">
                                <a href="https://www.grivetto.eu/hesk/index.php" className="footer-link" target="_blank" rel="noopener noreferrer">Help Desk</a>
                                <a href="mailto:sergio@grivetto.eu" className="footer-link">Email Contact</a>
                            </nav>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p className="footer-copyright">© {new Date().getFullYear()} Sergio Grivetto. All rights reserved.</p>
                        <p className="footer-tagline">Bridging Technology and Mindfulness</p>
                    </div>
                </div>
            </footer >
        </div >
    );
}
