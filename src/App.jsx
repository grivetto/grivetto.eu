import React, { useState, useEffect, Suspense, lazy } from 'react';
import './App.css';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import LanguageSelector from './components/LanguageSelector';
import Home from './pages/Home'; // Keep Home static for instant first paint

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

    if (view === 'home') {
      updateMeta(
        'Sergio Grivetto | Senior IT Specialist',
        'Senior IT Specialist & Full-Stack Architect. Shaping the IT landscape since 1993. Expert in Linux/Unix and digital resilience.'
      );
    } else if (view === 'links') {
      updateMeta(
        'Historical Links | Grivetto.eu',
        'Explore the history of the Italian Internet (1992+). CRS4, Video On Line, and other digital pioneers.'
      );
    } else if (view === 'app') {
      updateMeta(
        'Custom Web App | Grivetto.eu',
        'Interactive showcase of modern web engineering and custom application development examples.'
      );
    } else if (view === 'grid') {
      updateMeta(
        'Image Grid | Grivetto.eu',
        'Responsive image grid showcase from the portfolio of Sergio Grivetto, IT System Administrator.'
      );
    } else if (view === 'resume') {
      updateMeta(
        'Resume | Sergio Grivetto',
        'Professional CV of Sergio Grivetto. Senior IT Specialist, Linux Expert, and IT Professional since 1993.'
      );
    } else if (view === 'quiz') {
      updateMeta(
        'Quiz App | Grivetto.eu',
        'Test your IT knowledge with this interactive Quiz. A demonstration of React state management.'
      );
    } else if (view === 'portfolio') {
      updateMeta(
        'Portfolio | Sergio Grivetto',
        'Showcase of web development projects and system administration expertise by Sergio Grivetto.'
      );
    } else if (view === 'asciinema-demo') {
      updateMeta(
        'Asciinema Demo | Grivetto.eu',
        'Terminal session playback showcasing Linux CLI tools and system administration scripts.'
      );
    } else if (view === 'curiosity') {
      updateMeta(
        'Cosmic Curiosity | Grivetto.eu',
        'Interactive spark of knowledge featuring IT history and fun tech facts.'
      );
    } else if (view === 'terminal') {
      updateMeta(
        'IT Specialist | Grivetto.eu',
        'Advanced system administration and infrastructure orchestration since 1993.'
      );
    } else if (view === 'vintage') {
      updateMeta(
        'Vintage Portal (1993) | Grivetto.eu',
        'Journey back to the dawn of the public World Wide Web with this authentic 1993-styled page.'
      );
    } else if (view === 'not-found') {
      updateMeta(
        '404 Page Not Found | Grivetto.eu',
        'The requested page was not found on Grivetto.eu. Discover IT excellence and systems expertise dating back to 1993.'
      );
    }
    
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
