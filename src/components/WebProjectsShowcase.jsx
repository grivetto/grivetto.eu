import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import './WebProjectsShowcase.css';

const PROJECTS_DATA = [
    // --- AI & Cloud Run ---
    {
        id: 'drpaws',
        title: 'Dr. Paws',
        icon: '🐾',
        category: 'ai',
        badge: 'Cloud Run',
        badgeType: 'cloud',
        url: 'https://gestione-clinica-veterinaria-prenotazioni-244018943158.europe-west1.run.app/',
        featured: true,
        desc: {
            it: 'Gestionale clinica veterinaria & prenotazioni',
            en: 'Veterinary clinic booking & management app',
            es: 'Gestión clínica veterinaria y citas',
            th: 'ระบบจัดการและจองคิวคลินิกสัตว์แพทย์'
        }
    },
    {
        id: 'dedonato',
        title: 'Bike 2026',
        icon: '🚲',
        category: 'business',
        badge: 'Next.js / Cloud',
        badgeType: 'cloud',
        url: 'https://dedonato-cicli-1001602950918.europe-west1.run.app/',
        featured: true,
        desc: {
            it: 'Showroom digitale e catalogo bici da corsa 2026',
            en: 'Digital showroom & 2026 race bike catalog',
            es: 'Showroom digital y catálogo ciclista 2026',
            th: 'โชว์รูมจักรยานดิจิทัลและแคตตาล็อกปี 2026'
        }
    },
    {
        id: 'ristoai',
        title: 'RistoAI',
        icon: '👨‍🍳',
        category: 'ai',
        badge: 'AI Suite',
        badgeType: 'ai',
        url: 'https://stalwart-gecko-91ab91.netlify.app/',
        featured: true,
        desc: {
            it: 'Assistente AI per ordini e ristorazione smart',
            en: 'AI assistant for smart restaurant workflows',
            es: 'Asistente de IA para hostelería inteligente',
            th: 'ระบบปัญญาประดิษฐ์สำหรับร้านอาหารอัจฉริยะ'
        }
    },
    {
        id: 'meccanico_ai',
        title: 'Meccanico AI',
        icon: '🤖',
        category: 'ai',
        badge: 'AI Studio',
        badgeType: 'ai',
        url: 'https://meccanico.ai.studio/',
        featured: true,
        desc: {
            it: 'Diagnostica predittiva e assistenza officina',
            en: 'Predictive diagnostic assistant for auto repair',
            es: 'Diagnóstico predictivo para talleres mecánicos',
            th: 'ระบบวินิจฉัยและช่วยเหลืองานซ่อมยานยนต์'
        }
    },
    {
        id: 'webagency_ai',
        title: 'WebAgency AI',
        icon: '🌐',
        category: 'ai',
        badge: 'AI Studio',
        badgeType: 'ai',
        url: 'https://webagency.ai.studio/',
        featured: true,
        desc: {
            it: 'Studio agenzia web con agenti generativi',
            en: 'Generative web agency workflow studio',
            es: 'Estudio de agencia web con agentes generativos',
            th: 'สตูดิโอเอเจนซีเว็บพร้อมผู้ช่วยปัญญาประดิษฐ์'
        }
    },
    {
        id: 'veterinario_ai',
        title: 'Veterinario AI',
        icon: '🐶',
        category: 'ai',
        badge: 'AI Studio',
        badgeType: 'ai',
        url: 'https://veterinario.ai.studio/',
        featured: false,
        desc: {
            it: 'Portale di triage e consulto veterinario AI',
            en: 'AI pet triage and consultation portal',
            es: 'Portal de triaje veterinario asistido por IA',
            th: 'พอร์ทัลตรวจสุขภาพและคำแนะนำสัตว์เลี้ยง'
        }
    },
    {
        id: 'soms',
        title: 'SOMS 1888',
        icon: '🏛️',
        category: 'business',
        badge: 'Archivio',
        badgeType: 'heritage',
        url: 'https://grivetto.github.io/soms/',
        featured: true,
        desc: {
            it: 'Archivio storico Società Operaia di Mutuo Soccorso',
            en: 'Historical archive & society portal',
            es: 'Archivo histórico y portal asociativo',
            th: 'หอจดหมายเหตุประวัติศาสตร์และสมาคม'
        }
    },
    {
        id: 'ballerina',
        title: 'Ballerina',
        icon: '🩰',
        category: 'showcase',
        badge: 'Creative',
        badgeType: 'showcase',
        url: 'https://grivetto.github.io/ballerina/',
        featured: true,
        desc: {
            it: 'Portfolio dinamico danza classica e performativa',
            en: 'Performing arts & classical dance portfolio',
            es: 'Portfolio de danza clásica y artes escénicas',
            th: 'พอร์ตโฟลิโอศิลปะการแสดงและการเต้นบัลเลต์'
        }
    },
    {
        id: 'estetica',
        title: 'Estetica & Beauty',
        icon: '💅',
        category: 'business',
        badge: 'Landing',
        badgeType: 'app',
        url: 'https://grivetto.github.io/estetista/',
        featured: false,
        desc: {
            it: 'Sito vetrina centro benessere e trattamenti estetici',
            en: 'Beauty clinic & wellness center showcase',
            es: 'Portal para centro estético y tratamientos',
            th: 'เว็บไซต์คลินิกเสริมความงามและสุขภาพ'
        }
    },
    {
        id: 'ristorante',
        title: 'Ristorante Gourmet',
        icon: '🍽️',
        category: 'business',
        badge: 'Food',
        badgeType: 'app',
        url: 'https://grivetto.github.io/ristorante/',
        featured: false,
        desc: {
            it: 'Esperienza culinaria, menù digitale e prenotazioni',
            en: 'Culinary experience, digital menu & bookings',
            es: 'Menú digital y experiencia gastronómica',
            th: 'ประสบการณ์อาหาร เมนูดิจิทัล และการจอง'
        }
    },
    {
        id: 'thay',
        title: 'Thay Street Food',
        icon: '🍜',
        category: 'showcase',
        badge: 'Food',
        badgeType: 'showcase',
        url: 'https://grivetto.github.io/thay/',
        featured: false,
        desc: {
            it: 'Portale street food autentico thailandese',
            en: 'Authentic Thai street food web showcase',
            es: 'Showcase de comida callejera tailandesa',
            th: 'เว็บไซต์อาหารริมทางไทยแท้'
        }
    },
    {
        id: 'canarie',
        title: 'Canarie AI',
        icon: '🌴',
        category: 'ai',
        badge: 'AI Studio',
        badgeType: 'ai',
        url: 'https://canarie.ai.studio/',
        featured: false,
        desc: {
            it: 'Guida intelligente e itinerari per le Isole Canarie',
            en: 'AI smart guide & itineraries for Canary Islands',
            es: 'Guía de viaje inteligente a las Islas Canarias',
            th: 'คู่มือท่องเที่ยวหมู่เกาะคานารีด้วยปัญญาประดิษฐ์'
        }
    },
    {
        id: 'viaggi',
        title: 'Viaggi AI Studio',
        icon: '✈️',
        category: 'ai',
        badge: 'AI Studio',
        badgeType: 'ai',
        url: 'https://viaggi.ai.studio/',
        featured: false,
        desc: {
            it: 'Piattaforma di pianificazione itinerari di viaggio',
            en: 'Intelligent vacation & route planner',
            es: 'Planificador inteligente de vacaciones y rutas',
            th: 'ผู้วางแผนเส้นทางและทริปการเดินทางอัจฉริยะ'
        }
    },
    {
        id: 'illumina',
        title: 'Illumina AI',
        icon: '💡',
        category: 'ai',
        badge: 'AI Studio',
        badgeType: 'ai',
        url: 'https://illumina.ai.studio/',
        featured: false,
        desc: {
            it: 'Lighting design e simulazioni illuminotecniche',
            en: 'Architectural lighting design & simulations',
            es: 'Diseño arquitectónico e iluminación asistida',
            th: 'การออกแบบแสงสว่างและสถาปัตยกรรม'
        }
    },
    {
        id: 'vimade',
        title: 'Omni Landing (VI Made)',
        icon: '😊',
        category: 'ai',
        badge: 'Cloud Run',
        badgeType: 'cloud',
        url: 'https://omni-landing-244018943158.europe-west1.run.app',
        featured: false,
        desc: {
            it: 'Landing page omnicanale su Google Cloud Run',
            en: 'Omnichannel landing page on Google Cloud Run',
            es: 'Landing page omnicanal en Google Cloud Run',
            th: 'หน้าแลนดิ้งเพจบน Google Cloud Run'
        }
    },
    {
        id: 'autoscuola_gh',
        title: 'Autoscuola Classic',
        icon: '🚘',
        category: 'business',
        badge: 'Portal',
        badgeType: 'app',
        url: 'https://grivetto.github.io/autoscuola/',
        featured: false,
        desc: {
            it: 'Portale didattico e quiz per patenti',
            en: 'Driving license quizzes & educational portal',
            es: 'Portal de autoescuela y preparación teórica',
            th: 'พอร์ทัลข้อสอบและบทเรียนใบขับขี่'
        }
    },
    {
        id: 'caf',
        title: 'CAF & Fiscale',
        icon: '🏢',
        category: 'business',
        badge: 'Services',
        badgeType: 'app',
        url: 'https://grivetto.github.io/caf/',
        featured: false,
        desc: {
            it: 'Assistenza fiscale, dichiarazioni e pratiche CAF',
            en: 'Tax advisory, fiscal services and filing support',
            es: 'Servicios de asesoría fiscal y declaraciones',
            th: 'บริการที่ปรึกษาภาษีและงานเอกสาร'
        }
    },
    {
        id: 'nena',
        title: 'Nena Portfolio',
        icon: '✨',
        category: 'showcase',
        badge: 'Showcase',
        badgeType: 'showcase',
        url: 'https://grivetto.github.io/nena/',
        featured: false,
        desc: {
            it: 'Spazio creativo ed esperienza visiva personalizzata',
            en: 'Creative visual space & tailored branding',
            es: 'Espacio creativo y marca visual personalizada',
            th: 'พื้นที่สร้างสรรค์และแบรนด์เฉพาะตัว'
        }
    },
    {
        id: 'michi',
        title: 'Michi Space',
        icon: '👤',
        category: 'showcase',
        badge: 'Showcase',
        badgeType: 'showcase',
        url: 'https://grivetto.github.io/michi/',
        featured: false,
        desc: {
            it: 'Showcase personale e galleria interattiva',
            en: 'Personal showcase & interactive gallery',
            es: 'Showcase personal y galería interactiva',
            th: 'แกลเลอรีส่วนตัวและการนำเสนอผลงาน'
        }
    },
    {
        id: 'guida',
        title: 'Guida Territoriale',
        icon: '📍',
        category: 'showcase',
        badge: 'Local',
        badgeType: 'showcase',
        url: 'https://grivetto.github.io/guida/',
        featured: false,
        desc: {
            it: 'Mappa e guida interattiva per punti di interesse locali',
            en: 'Interactive map & local points of interest guide',
            es: 'Guía y mapa interactivo de lugares locales',
            th: 'แผนที่และคู่มือท่องเที่ยวชุมชนท้องถิ่น'
        }
    }
];

const CATEGORIES = [
    {
        id: 'all',
        label: {
            it: 'Tutti',
            en: 'All',
            es: 'Todos',
            th: 'ทั้งหมด'
        },
        icon: '🌟'
    },
    {
        id: 'ai',
        label: {
            it: 'AI & Cloud',
            en: 'AI & Cloud',
            es: 'IA y Nube',
            th: 'AI และคลาวด์'
        },
        icon: '⚡'
    },
    {
        id: 'business',
        label: {
            it: 'Business & Servizi',
            en: 'Business & Services',
            es: 'Negocios y Servicios',
            th: 'ธุรกิจและบริการ'
        },
        icon: '💼'
    },
    {
        id: 'showcase',
        label: {
            it: 'Showcase & Web',
            en: 'Showcases',
            es: 'Portfolios',
            th: 'ผลงานและพอร์ต'
        },
        icon: '🎨'
    }
];

export default function WebProjectsShowcase() {
    const { language } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isExpanded, setIsExpanded] = useState(false);

    const lang = useMemo(() => {
        if (['it', 'en', 'es', 'th'].includes(language)) return language;
        return 'en';
    }, [language]);

    // Filter projects
    const filteredProjects = useMemo(() => {
        if (selectedCategory === 'all') {
            return isExpanded 
                ? PROJECTS_DATA 
                : PROJECTS_DATA.slice(0, 8); // Top 8 featured by default
        }
        return PROJECTS_DATA.filter(p => p.category === selectedCategory);
    }, [selectedCategory, isExpanded]);

    // Counts per category
    const counts = useMemo(() => {
        return {
            all: PROJECTS_DATA.length,
            ai: PROJECTS_DATA.filter(p => p.category === 'ai').length,
            business: PROJECTS_DATA.filter(p => p.category === 'business').length,
            showcase: PROJECTS_DATA.filter(p => p.category === 'showcase').length
        };
    }, []);

    const toggleText = isExpanded
        ? (lang === 'it' ? 'Mostra Meno ▲' : lang === 'es' ? 'Mostrar Menos ▲' : lang === 'th' ? 'ย่อลง ▲' : 'Show Less ▲')
        : (lang === 'it' 
            ? `Mostra Tutti i ${PROJECTS_DATA.length} Progetti ▼` 
            : lang === 'es' 
                ? `Ver los ${PROJECTS_DATA.length} Proyectos ▼` 
                : lang === 'th' 
                    ? `ดูทั้ง ${PROJECTS_DATA.length} โครงการ ▼` 
                    : `Show All ${PROJECTS_DATA.length} Projects ▼`);

    return (
        <div className="web-projects-showcase" style={{ position: 'relative', zIndex: 10 }}>
            {/* Filter Category Chips */}
            <div className="wps-filter-tabs">
                {CATEGORIES.map(cat => {
                    const active = selectedCategory === cat.id;
                    const count = counts[cat.id];
                    return (
                        <button
                            key={cat.id}
                            type="button"
                            className={`wps-tab-btn ${active ? 'active' : ''}`}
                            onClick={() => {
                                setSelectedCategory(cat.id);
                                if (cat.id !== 'all') {
                                    setIsExpanded(true);
                                }
                            }}
                        >
                            <span className="wps-tab-icon">{cat.icon}</span>
                            <span className="wps-tab-label">{cat.label[lang] || cat.label.en}</span>
                            <span className="wps-tab-count">{count}</span>
                        </button>
                    );
                })}
            </div>

            {/* Projects Grid */}
            <motion.div 
                layout
                className="wps-grid"
            >
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((proj) => {
                        const description = proj.desc[lang] || proj.desc.en;
                        return (
                            <motion.a
                                key={proj.id}
                                layout
                                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.25, ease: 'easeOut' }}
                                href={proj.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="wps-card"
                            >
                                <div className="wps-card-header">
                                    <div className="wps-icon-wrapper">
                                        <span className="wps-icon">{proj.icon}</span>
                                    </div>
                                    <span className={`wps-badge wps-badge-${proj.badgeType}`}>
                                        {proj.badgeType === 'cloud' && <span className="wps-badge-pulse" />}
                                        {proj.badge}
                                    </span>
                                </div>

                                <div className="wps-card-body">
                                    <h4 className="wps-card-title">
                                        {proj.title}
                                        <span className="wps-card-arrow">↗</span>
                                    </h4>
                                    <p className="wps-card-desc">{description}</p>
                                </div>
                            </motion.a>
                        );
                    })}
                </AnimatePresence>
            </motion.div>

            {/* Expand / Collapse button (only on 'all' tab) */}
            {selectedCategory === 'all' && (
                <div className="wps-expand-wrapper">
                    <button
                        type="button"
                        className="wps-expand-btn"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <span>{toggleText}</span>
                    </button>
                </div>
            )}
        </div>
    );
}
