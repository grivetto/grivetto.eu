import React, { useState, useEffect, Suspense, lazy } from 'react';
import './App.css';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import LanguageSelector from './components/LanguageSelector';
import Home from './pages/Home'; // Keep Home static for instant first paint
import { translations } from './translations';

const CustomApp = lazy(() => import('./CustomApp'));
const ImageGrid = lazy(() => import('./ImageGrid'));
const RubiksCube = lazy(() => import('./RubiksCube'));
const NeonTicTacToe = lazy(() => import('./NeonTicTacToe'));
const TetrisGame = lazy(() => import('./TetrisGame'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Resume = lazy(() => import('./Resume'));
const AsciinemaDemo = lazy(() => import('./AsciinemaDemo'));
const QuizApp = lazy(() => import('./QuizApp'));
const CuriositySpark = lazy(() => import('./components/CuriositySpark'));
const WebTerminal = lazy(() => import('./components/WebTerminal'));
const HeskWrapper = lazy(() => import('./components/HeskWrapper'));
const TerminalDemo = lazy(() => import('./components/TerminalDemo'));
const VintagePortal = lazy(() => import('./pages/VintagePortal'));
const NotFound = lazy(() => import('./pages/NotFound'));

const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
    flexDirection: 'column',
    gap: '1.5rem',
    color: '#00f2ff'
  }}>
    <div className="loading-spinner" />
    <span style={{
      fontFamily: 'monospace',
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      fontSize: '0.9rem',
      textShadow: '0 0 8px rgba(0, 242, 255, 0.5)'
    }}>Loading Module...</span>
  </div>
);

const LinksView = ({ isVisible, handleNavigate }) => {
  const { t } = useLanguage();
  return (
    <>
      <header className={`hero ${isVisible ? 'fade-in' : ''}`}>
        <div style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 1000 }}>
          <LanguageSelector />
        </div>
        <div className="hero-content">
          <h1>{t('page_links', 'title')}</h1>
          <p className="subtitle">{t('page_links', 'subtitle')}</p>
        </div>
      </header>

      <main>
        <section className="card glass">
          <h2>{t('page_links', 'pioneers')}</h2>
          <div className="links-grid">
            <div className="link-item">
              <img src="/images/crs4_logo_1765228488116.png" alt="CRS4 Logo" className="link-icon" />
              <div>
                <a href="http://www.crs4.it" target="_blank" rel="noopener noreferrer"><strong>{t('page_links', 'links').crs4.title}</strong></a>
                <p>{t('page_links', 'links').crs4.desc}</p>
              </div>
            </div>
            <div className="link-item">
              <img src="/images/unione_sarda_logo_1765228501109.png" alt="L'Unione Sarda Logo" className="link-icon" />
              <div>
                <a href="http://www.unionesarda.it" target="_blank" rel="noopener noreferrer"><strong>{t('page_links', 'links').unione.title}</strong></a>
                <p>{t('page_links', 'links').unione.desc}</p>
              </div>
            </div>
            <div className="link-item">
              <img src="/images/cnr_logo_1765228516061.png" alt="CNR Logo" className="link-icon" />
              <div>
                <a href="http://www.cnr.it" target="_blank" rel="noopener noreferrer"><strong>{t('page_links', 'links').cnr.title}</strong></a>
                <p>{t('page_links', 'links').cnr.desc}</p>
              </div>
            </div>
            <div className="link-item">
              <img src="/images/cineca_logo_1765228529586.png" alt="Cineca Logo" className="link-icon" />
              <div>
                <a href="http://www.cineca.it" target="_blank" rel="noopener noreferrer"><strong>{t('page_links', 'links').cineca.title}</strong></a>
                <p>{t('page_links', 'links').cineca.desc}</p>
              </div>
            </div>
            <div className="link-item">
              <img src="/images/vol_logo_1765228474268.png" alt="VOL Logo" className="link-icon" />
              <div>
                <a href="https://web.archive.org/web/19961222164923/http://www.vol.it/" target="_blank" rel="noopener noreferrer"><strong>{t('page_links', 'links').vol.title}</strong></a>
                <p>{t('page_links', 'links').vol.desc}</p>
              </div>
            </div>
            <div className="link-item">
              <img src="/images/iperbole_logo_1765228543789.png" alt="Iperbole Logo" className="link-icon" />
              <div>
                <a href="https://web.archive.org/web/19961222164923/http://www.iperbole.bologna.it/" target="_blank" rel="noopener noreferrer"><strong>{t('page_links', 'links').iperbole.title}</strong></a>
                <p>{t('page_links', 'links').iperbole.desc}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="card glass">
          <h2>{t('page_links', 'icons')}</h2>
          <div className="links-grid">
            <div className="link-item">
              <img src="/images/netscape_logo_1765228557991.png" alt="Netscape Logo" className="link-icon" />
              <div>
                <a href="https://web.archive.org/web/19961222164923/http://home.netscape.com/" target="_blank" rel="noopener noreferrer"><strong>{t('page_links', 'links').netscape.title}</strong></a>
                <p>{t('page_links', 'links').netscape.desc}</p>
              </div>
            </div>
            <div className="link-item">
              <img src="/images/dollar_logo_1765228574341.png" alt="Dollar Logo" className="link-icon" />
              <div>
                <a href="https://web.archive.org/web/20000302091102/http://www.sendmeadollar.com/" target="_blank" rel="noopener noreferrer"><strong>{t('page_links', 'links').dollar.title}</strong></a>
                <p>{t('page_links', 'links').dollar.desc}</p>
              </div>
            </div>
          </div>
        </section>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button onClick={() => handleNavigate('home')} className="btn">{t('page_links', 'back')}</button>
        </div>
      </main>
    </>
  );
};

const SUPPORTED_LANGS = ['en', 'it', 'es', 'th'];
const VALID_PAGES = ['home', 'links', 'app', 'grid', 'resume', 'quiz', 'portfolio', 'asciinema-demo', 'curiosity', 'terminal', 'vintage', 'hesk', 'rubiks', 'tictactoe', 'tetris', 'terminal-demo'];

function parseUrl() {
  const path = window.location.pathname;
  const parts = path.split('/').filter(Boolean);
  
  let lang = 'en';
  let page = 'home';
  
  // Backwards compatibility with ?page=
  const searchParams = new URLSearchParams(window.location.search);
  const searchPage = searchParams.get('page');
  
  if (parts.length > 0) {
    if (SUPPORTED_LANGS.includes(parts[0])) {
      lang = parts[0];
      if (parts.length > 1) {
        page = parts[1];
      }
    } else {
      page = parts[0];
    }
  } else if (searchPage) {
    page = searchPage;
  }
  
  if (page !== 'home' && !VALID_PAGES.includes(page)) {
    page = 'not-found';
  }
  
  return { lang, page };
}

function buildUrl(lang, page) {
  const langPart = lang === 'en' ? '' : `/${lang}`;
  const pagePart = page === 'home' ? '' : `/${page}`;
  return `${langPart}${pagePart}` || '/';
}

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [routeState, setRouteState] = useState(() => parseUrl());
  
  const view = routeState.page;
  const lang = routeState.lang;

  const handleNavigate = (newView) => {
    setRouteState(prev => {
      const newState = { ...prev, page: newView };
      const url = buildUrl(newState.lang, newState.page);
      window.history.pushState(newState, '', url);
      return newState;
    });
  };

  const handleLanguageChange = (newLang) => {
    setRouteState(prev => {
      const newState = { ...prev, lang: newLang };
      const url = buildUrl(newState.lang, newState.page);
      window.history.pushState(newState, '', url);
      return newState;
    });
  };

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page && event.state.lang) {
        setRouteState({ page: event.state.page, lang: event.state.lang });
      } else {
        setRouteState(parseUrl());
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  useEffect(() => {
    const updateMeta = (title, desc) => {
      document.title = title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', desc);
      }
    };

    // Localized title & description lookup
    const pageMeta = translations[lang]?.meta?.[view] || translations['en']?.meta?.[view];
    if (pageMeta) {
      updateMeta(pageMeta.title, pageMeta.desc);
    } else {
      updateMeta('Sergio Grivetto | Senior IT Specialist', 'Senior IT Specialist & Full-Stack Architect.');
    }

    // Dynamic JSON-LD injection
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Sergio Grivetto",
      "url": "https://www.grivetto.eu/",
      "email": ["sergio@grivetto.eu", "sergio@grivetto.it"],
      "jobTitle": lang === 'it' 
        ? ["Senior IT Specialist", "Full-Stack Architect", "Consulente IT", "Esperto Linux/Unix", "Ingegnere delle Infrastrutture"]
        : lang === 'es'
        ? ["Especialista Senior en TI", "Arquitecto Full-Stack", "Consultor de TI", "Experto en Linux/Unix", "Ingeniero de Infraestructuras"]
        : lang === 'th'
        ? ["ผู้เชี่ยวชาญด้านไอทีอาวุโส", "สถาปนิก Full-Stack", "ที่ปรึกษาด้านไอที", "ผู้เชี่ยวชาญ Linux/Unix", "วิศวกรโครงสร้างพื้นฐาน"]
        : ["Senior IT Specialist", "Full-Stack Architect", "IT Consultant", "Linux/Unix Expert", "Infrastructure Engineer"],
      "description": lang === 'it'
        ? "Senior IT Specialist con profonda esperienza nel settore IT dal 1993. Specializzato in ambienti Linux/Unix, gestione adattiva delle infrastrutture e architetture full-stack."
        : lang === 'es'
        ? "Especialista Senior en TI con amplia experiencia en el sector desde 1993. Especializado en entornos Linux/Unix, gestión adaptativa de infraestructuras y arquitecturas full-stack."
        : lang === 'th'
        ? "ผู้เชี่ยวชาญด้านไอทีอาวุโสที่มีประสบการณ์อย่างลึกซึ้งในระบบไอทีมาตั้งแต่ปี 1993 เชี่ยวชาญด้านระบบสภาพแวดล้อม Linux/Unix การจัดการโครงสร้างพื้นฐานแบบปรับเปลี่ยนได้ และสถาปัตยกรรม full-stack"
        : "Senior IT Specialist with a deep-rooted expertise in IT since 1993. Specializing in Linux/Unix environments, adaptive infrastructure, and full-stack architectures.",
      "knowsAbout": [
        "Linux System Administration",
        "Unix Server Management", 
        "Systems Architecture",
        "Infrastructure Automation",
        "Digital Resilience",
        "Full-Stack Web Development",
        "Network Security",
        "System Integration",
        "IT Consulting",
        "Legacy system modernization"
      ],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "certification",
          "name": "Certified Novell Engineer (CNE)"
        }
      ],
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Amedeo Avogadro Institute",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Turin",
          "addressCountry": "IT"
        }
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Turin",
        "addressRegion": "Piedmont",
        "addressCountry": "IT"
      },
      "sameAs": [
        "https://www.linkedin.com/in/sgrivett/",
        "https://www.facebook.com/sgrivetto/",
        "https://www.instagram.com/webagency2000/",
        "https://www.grivetto.it"
      ],
      "workLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Turin",
          "addressRegion": "Piedmont",
          "addressCountry": "IT"
        }
      }
    };

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Grivetto ~ Digital Resilience & Advanced IT Architecture",
      "description": lang === 'it'
        ? "Servizi informatici e consulenza avanzata specializzati in ambienti Linux/Unix, infrastrutture adattive e architetture web moderne dal 1993."
        : lang === 'es'
        ? "Servicios de informática y consultoría avanzada especializados en entornos Linux/Unix, infraestructuras adaptativas y arquitecturas web modernas desde 1993."
        : lang === 'th'
        ? "บริการระบบไอทีและคำปรึกษาขั้นสูงที่เชี่ยวชาญในระบบ Linux/Unix การจัดการโครงสร้างพื้นฐานแบบปรับแต่งได้ และสถาปัตยกรรมเว็บสมัยใหม่มาตั้งแต่ปี 1993"
        : "Advanced IT systems and consulting services specializing in Linux/Unix environments, adaptive infrastructure management, and modern digital architectures since 1993.",
      "provider": {
        "@type": "Person",
        "name": "Sergio Grivetto",
        "jobTitle": lang === 'it' ? "Senior IT Specialist" : lang === 'es' ? "Especialista Senior en TI" : lang === 'th' ? "ผู้เชี่ยวชาญด้านไอทีอาวุโส" : "Senior IT Specialist"
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Turin",
          "containedIn": {
            "@type": "AdministrativeArea",
            "name": "Piedmont"
          }
        },
        {
          "@type": "Country",
          "name": "Italy"
        },
        "Remote Services Worldwide"
      ],
      "serviceType": lang === 'it' 
        ? [
            "Amministrazione di sistema Linux",
            "Gestione server Unix",
            "Orchestrazione avanzata dell'infrastruttura",
            "Ingegneria Web Full-Stack",
            "Consulenza sulla resilienza digitale",
            "Modernizzazione di sistemi legacy",
            "Strategia e innovazione IT",
            "Ottimizzazione dei server"
          ]
        : lang === 'es'
        ? [
            "Administración de sistemas Linux",
            "Gestión de servidores Unix",
            "Orquestación avanzada de infraestructura",
            "Ingeniería Web Full-Stack",
            "Consultoría de resiliencia digital",
            "Modernización de sistemas heredados",
            "Estrategia e innovación de TI",
            "Optimización de servidores"
          ]
        : lang === 'th'
        ? [
            "การดูแลระบบ Linux",
            "การจัดการเซิร์ฟเวอร์ Unix",
            "การประสานงานโครงสร้างพื้นฐานขั้นสูง",
            "วิศวกรรมเว็บแบบ Full-Stack",
            "คำปรึกษาความยืดหยุ่นทางดิจิทัล",
            "การปรับปรุงระบบเก่าให้ทันสมัย",
            "กลยุทธ์และนวัตกรรมไอที",
            "การเพิ่มประสิทธิภาพเซิร์ฟเวอร์"
          ]
        : [
            "Linux System Administration",
            "Unix Server Management",
            "Advanced Infrastructure Orchestration",
            "Full-Stack Web Engineering",
            "Digital Resilience Consulting",
            "Legacy Systems Modernization",
            "IT Strategy & Innovation",
            "Server Optimization"
          ],
      "priceRange": "Contact for quote",
      "url": "https://www.grivetto.eu/",
      "email": "sergio@grivetto.eu",
      "image": "https://www.grivetto.eu/images/og-image.jpg",
      "telephone": "+39 371 1741209",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Turin",
        "addressLocality": "Turin",
        "postalCode": "10145",
        "addressRegion": "Piedmont",
        "addressCountry": "IT"
      }
    };


    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": lang === 'it' 
        ? "Sergio Grivetto ~ Specialista IT Senior"
        : lang === 'es'
        ? "Sergio Grivetto ~ Especialista Senior en TI"
        : lang === 'th'
        ? "Sergio Grivetto ~ ผู้เชี่ยวชาญด้านไอทีอาวุโส"
        : "Sergio Grivetto ~ Senior IT Specialist",
      "alternateName": "Grivetto.eu",
      "url": "https://www.grivetto.eu/",
      "description": lang === 'it'
        ? "Portfolio professionale e competenze IT di Sergio Grivetto, specialista IT senior che modella il mondo digitale dal 1993."
        : lang === 'es'
        ? "Portafolio profesional y experiencia en TI de Sergio Grivetto, Especialista Senior en TI que da forma al mundo digital desde 1993."
        : lang === 'th'
        ? "พอร์ตโฟลิโอระดับมืออาชีพและความเชี่ยวชาญด้านไอทีของ Sergio Grivetto ผู้เชี่ยวชาญด้านไอทีอาวุโสผู้สร้างสรรค์โลกดิจิทัลมาตั้งแต่ปี 1993"
        : "Professional portfolio and IT expertise of Sergio Grivetto, Senior IT Specialist shaping the digital world since 1993.",
      "inLanguage": ["en", "it", "es", "th"],
      "datePublished": "2026-03-16",
      "dateModified": "2026-06-13",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.grivetto.eu/?s={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };

    const injectJsonLd = (id, schemaObj) => {
      let scriptEl = document.getElementById(id);
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = id;
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(schemaObj);
    };

    injectJsonLd('jsonld-person', personSchema);
    injectJsonLd('jsonld-service', serviceSchema);
    injectJsonLd('jsonld-website', websiteSchema);
    const existingFaq = document.getElementById('jsonld-faq');
    if (existingFaq) existingFaq.remove();

    // Manage SEO canonical and hreflang tags
    document.querySelectorAll('link[rel="canonical"]').forEach(el => el.remove());
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
    
    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = `https://www.grivetto.eu${buildUrl(lang, view)}`;
    document.head.appendChild(canonicalLink);
    
    SUPPORTED_LANGS.forEach(l => {
        const altLink = document.createElement('link');
        altLink.rel = 'alternate';
        altLink.hreflang = l;
        altLink.href = `https://www.grivetto.eu${buildUrl(l, view)}`;
        document.head.appendChild(altLink);
    });
    
    const defaultLink = document.createElement('link');
    defaultLink.rel = 'alternate';
    defaultLink.hreflang = 'x-default';
    defaultLink.href = `https://www.grivetto.eu${buildUrl('en', view)}`;
    document.head.appendChild(defaultLink);

  }, [view, lang]);

  const isFullWidth = ['home', 'portfolio', 'grid', 'vintage', 'terminal'].includes(view);

  return (
    <LanguageProvider initialLanguage={lang} onLanguageChange={handleLanguageChange}>
      <div className={`${isFullWidth ? 'fluid-container' : 'app-container'} fade-in ${isVisible ? 'visible' : ''}`}>
        <Suspense fallback={<LoadingFallback />}>
          {view === 'home' && <Home onNavigate={handleNavigate} />}
          {view === 'links' && <LinksView isVisible={isVisible} handleNavigate={handleNavigate} />}
          {view === 'app' && <CustomApp onNavigate={handleNavigate} />}
          {view === 'grid' && <ImageGrid onNavigate={handleNavigate} />}
          {view === 'rubiks' && <RubiksCube onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />}
          {view === 'tictactoe' && <NeonTicTacToe onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />}
          {view === 'tetris' && <TetrisGame onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />}
          {view === 'portfolio' && <Portfolio onNavigate={handleNavigate} />}
          {view === 'resume' && <Resume onNavigate={handleNavigate} />}
          {view === 'asciinema-demo' && <AsciinemaDemo onNavigate={handleNavigate} />}
          {view === 'quiz' && <QuizApp onNavigate={handleNavigate} />}
          {view === 'curiosity' && <CuriositySpark onNavigate={handleNavigate} />}
          {view === 'terminal' && <WebTerminal onNavigate={handleNavigate} />}
          {view === 'hesk' && <HeskWrapper onNavigate={handleNavigate} />}
          {view === 'terminal-demo' && <TerminalDemo onNavigate={handleNavigate} />}
          {view === 'vintage' && <VintagePortal onNavigate={handleNavigate} />}
          {view === 'not-found' && <NotFound onNavigate={handleNavigate} />}
        </Suspense>
      </div>
    </LanguageProvider>
  );
}

export default App;
