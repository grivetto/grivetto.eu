import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import './Portfolio.css';

const Portfolio = ({ onNavigate }) => {
    const { t } = useLanguage();
    const [selectedProject, setSelectedProject] = useState(null);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const { scrollYProgress } = useScroll();

    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const projects = [
        {
            id: 1,
            title: t('page_portfolio', 'projects').p1.title,
            category: t('page_portfolio', 'projects').p1.category,
            description: t('page_portfolio', 'projects').p1.desc,
            gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            icon: "🕊️",
            tags: ["React", "Design", "Mindfulness"],
            stats: { views: "10K+", rating: "4.9" },
            link: "home"
        },
        {
            id: 2,
            title: t('page_portfolio', 'projects').p2.title,
            category: t('page_portfolio', 'projects').p2.category,
            description: t('page_portfolio', 'projects').p2.desc,
            gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            icon: "📄",
            tags: ["TypeScript", "Animation", "UX"],
            stats: { views: "8K+", rating: "5.0" },
            link: "resume"
        },
        {
            id: 3,
            title: t('page_portfolio', 'projects').p3.title,
            category: t('page_portfolio', 'projects').p3.category,
            description: t('page_portfolio', 'projects').p3.desc,
            gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            icon: "🎮",
            tags: ["React", "Gaming", "Education"],
            stats: { views: "15K+", rating: "4.8" },
            link: "quiz"
        },
        {
            id: 4,
            title: t('page_portfolio', 'projects').p4.title,
            category: t('page_portfolio', 'projects').p4.category,
            description: t('page_portfolio', 'projects').p4.desc,
            gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            icon: "🖼️",
            tags: ["CSS Grid", "Animation", "Photography"],
            stats: { views: "12K+", rating: "4.7" },
            link: "grid"
        },
        {
            id: 5,
            title: t('page_portfolio', 'projects').p5.title,
            category: t('page_portfolio', 'projects').p5.category,
            description: t('page_portfolio', 'projects').p5.desc,
            gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
            icon: "🌐",
            tags: ["History", "Archive", "Web"],
            stats: { views: "6K+", rating: "4.9" },
            link: "links"
        },
        {
            id: 6,
            title: t('page_portfolio', 'projects').p6.title,
            category: t('page_portfolio', 'projects').p6.category,
            description: t('page_portfolio', 'projects').p6.desc,
            gradient: "linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)",
            icon: "🎲",
            tags: ["3D", "WebGL", "Interactive"],
            stats: { views: "20K+", rating: "5.0" },
            link: "rubiks"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0, scale: 0.9 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    const floatingAnimation = {
        y: [0, -10, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    return (
        <div className="portfolio-container">
            {/* Custom Cursor */}
            <motion.div
                className="custom-cursor"
                animate={{
                    x: cursorPosition.x - 10,
                    y: cursorPosition.y - 10,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
            />

            {/* Back Button */}
            <button className="back-button glass" onClick={() => onNavigate('home')}>
                ← {t('resume', 'btn_back')}
            </button>

            {/* Hero Section */}
            <motion.section
                className="portfolio-hero"
                style={{ opacity, scale }}
            >
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="portfolio-title">
                        <span className="gradient-text">{t('page_portfolio', 'title')}</span>
                        <motion.span
                            className="title-accent"
                            animate={floatingAnimation}
                        >
                            ✨
                        </motion.span>
                    </h1>
                    <p className="portfolio-subtitle">
                        {t('page_portfolio', 'subtitle')}
                    </p>
                </motion.div>

                {/* Floating Elements */}
                <div className="floating-elements">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="floating-orb"
                            style={{
                                left: `${20 + i * 15}%`,
                                top: `${30 + (i % 2) * 20}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                x: [0, 15, 0],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 4 + i * 0.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.2
                            }}
                        />
                    ))}
                </div>
            </motion.section>

            {/* Stats Section */}
            <motion.section
                className="stats-section"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <div className="stats-grid">
                    {[
                        { label: t('page_portfolio', 'stats').projects, value: "15+", icon: "🚀" },
                        { label: t('page_portfolio', 'stats').tech, value: "20+", icon: "⚡" },
                        { label: t('page_portfolio', 'stats').hours, value: "1000+", icon: "💻" },
                        { label: t('page_portfolio', 'stats').coffee, value: "∞", icon: "☕" }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            className="stat-card glass"
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, type: "spring" }}
                            whileHover={{ scale: 1.05, rotate: 5 }}
                        >
                            <div className="stat-icon">{stat.icon}</div>
                            <div className="stat-value">{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Projects Grid */}
            <motion.section
                className="projects-section"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <div className="projects-grid">
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            className="project-card"
                            variants={itemVariants}
                            whileHover={{ y: -10, scale: 1.02 }}
                            onClick={() => setSelectedProject(project)}
                        >
                            <div
                                className="project-gradient"
                                style={{ background: project.gradient }}
                            />
                            <div className="project-content glass">
                                <motion.div
                                    className="project-icon"
                                    whileHover={{ rotate: 360, scale: 1.2 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    {project.icon}
                                </motion.div>

                                <div className="project-header">
                                    <h3>{project.title}</h3>
                                    <span className="project-category">{project.category}</span>
                                </div>

                                <p className="project-description">{project.description}</p>

                                <div className="project-tags">
                                    {project.tags.map((tag, index) => (
                                        <motion.span
                                            key={index}
                                            className="tag"
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            {tag}
                                        </motion.span>
                                    ))}
                                </div>

                                <div className="project-stats">
                                    <div className="stat">
                                        <span className="stat-icon">👁️</span>
                                        <span>{project.stats.views}</span>
                                    </div>
                                    <div className="stat">
                                        <span className="stat-icon">⭐</span>
                                        <span>{project.stats.rating}</span>
                                    </div>
                                </div>

                                <motion.button
                                    className="project-btn"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onNavigate(project.link);
                                    }}
                                >
                                    Scopri di più →
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            className="modal-content glass"
                            initial={{ scale: 0.5, rotateX: 90 }}
                            animate={{ scale: 1, rotateX: 0 }}
                            exit={{ scale: 0.5, rotateX: -90 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div
                                className="modal-gradient"
                                style={{ background: selectedProject.gradient }}
                            />
                            <button
                                className="modal-close"
                                onClick={() => setSelectedProject(null)}
                            >
                                ✕
                            </button>
                            <div className="modal-body">
                                <div className="modal-icon">{selectedProject.icon}</div>
                                <h2>{selectedProject.title}</h2>
                                <p className="modal-category">{selectedProject.category}</p>
                                <p className="modal-description">{selectedProject.description}</p>
                                <div className="modal-tags">
                                    {selectedProject.tags.map((tag, index) => (
                                        <span key={index} className="tag">{tag}</span>
                                    ))}
                                </div>
                                <motion.button
                                    className="project-btn"
                                    style={{ marginTop: '2rem' }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => onNavigate(selectedProject.link)}
                                >
                                    Vai al Progetto →
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Back Button */}
            <motion.div
                className="back-button-container"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <motion.button
                    className="back-btn glass"
                    onClick={() => onNavigate('home')}
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                >
                    ← Torna alla Home
                </motion.button>
            </motion.div>
        </div>
    );
};

export default Portfolio;
