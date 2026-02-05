import React, { useState, useEffect } from 'react';
import './App.css';
import { LanguageProvider } from './contexts/LanguageContext';
import CustomApp from './CustomApp';
import ImageGrid from './ImageGrid';
import RubiksCube from './RubiksCube';
import NeonTicTacToe from './NeonTicTacToe';
import TetrisGame from './TetrisGame';

import Portfolio from './pages/Portfolio';
import Resume from './Resume';
import Home from './pages/Home';
import AsciinemaDemo from './AsciinemaDemo';
import QuizApp from './QuizApp';
import CuriositySpark from './components/CuriositySpark';
import WebTerminal from './components/WebTerminal';
import HeskWrapper from './components/HeskWrapper';
import TerminalDemo from './components/TerminalDemo';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [view, setView] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page');
    if (page === 'links') return 'links';
    if (page === 'app') return 'app';
    if (page === 'grid') return 'grid';
    if (page === 'resume') return 'resume';
    if (page === 'quiz') return 'quiz';
    if (page === 'portfolio') return 'portfolio';
    if (page === 'asciinema-demo') return 'asciinema-demo';
    if (page === 'curiosity') return 'curiosity';
    if (page === 'terminal') return 'terminal';
    return 'home';
  });



  const handleNavigate = (newView) => {
    setView(newView);
    const url = new URL(window.location);
    url.searchParams.set('page', newView);
    window.history.pushState({ page: newView }, '', url);
  };

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        setView(event.state.page);
      } else {
        // Fallback to URL param or 'home'
        const params = new URLSearchParams(window.location.search);
        const page = params.get('page') || 'home';
        setView(page);
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
      // Meta defaults
    } else if (view === 'links') {
      updateMeta(
        'Historical Links | Grivetto.eu',
        'Explore the history of the Italian Internet (1992+). CRS4, Video On Line, and other pioneers of the digital web in Italy.'
      );
    } else if (view === 'app') {
      updateMeta(
        'Custom Web App | Grivetto.eu',
        'Experience modern web engineering with this custom web application showcase. Interactive and dynamic web development examples.'
      );
    } else if (view === 'grid') {
      updateMeta(
        'Image Grid | Grivetto.eu',
        'A visual showcase featuring a responsive image grid layout. Part of the Sergio Grivetto portfolio.'
      );
    } else if (view === 'resume') {
      updateMeta(
        'Resume | Sergio Grivetto',
        'Professional resume of Sergio Grivetto. Web Engineering, Sviluppo Web, and Digital Innovation experience.'
      );
    } else if (view === 'quiz') {
      updateMeta(
        'Quiz App | Grivetto.eu',
        'Test your knowledge with this interactive Quiz App. A demonstration of React state management and user interaction.'
      );
    } else if (view === 'portfolio') {
      updateMeta(
        'Portfolio | Sergio Grivetto',
        'Showcase of web development projects, web engineering skills, and creative digital works by Sergio Grivetto.'
      );
    } else if (view === 'asciinema-demo') {
      updateMeta(
        'Asciinema Demo | Grivetto.eu',
        'Terminal session recording playback. View CLI tools and scripts in action.'
      );
    } else if (view === 'curiosity') {
      updateMeta(
        'Cosmic Curiosity | Grivetto.eu',
        'Ignite a spark of knowledge with the Cosmic Curiosity Button.'
      );
    } else if (view === 'terminal') {
      updateMeta(
        'System Admin | Grivetto.eu',
        'Authorized Personnel Only. Web Terminal Access.'
      );
    }
  }, [view]);

  // renderLinks helper moved inside to access isVisible and setView
  const renderLinks = () => (
    <>
      <header className={`hero ${isVisible ? 'fade-in' : ''}`}>
        <div className="hero-content">
          <h1>Historical Links</h1>
          <p className="subtitle">Gli albori di Internet in Italia (1992+)</p>
        </div>
      </header>

      <main>
        <section className="card glass">
          <h2>Pionieri del Web Italiano</h2>
          <div className="links-grid">
            <div className="link-item">
              <img src="/images/crs4_logo_1765228488116.png" alt="CRS4 Logo" className="link-icon" />
              <div>
                <a href="http://www.crs4.it" target="_blank" rel="noopener noreferrer"><strong>CRS4 (1993)</strong></a>
                <p>Il primo sito web ufficiale italiano, nato al Centro di Ricerca in Sardegna.</p>
              </div>
            </div>
            <div className="link-item">
              <img src="/images/unione_sarda_logo_1765228501109.png" alt="L'Unione Sarda Logo" className="link-icon" />
              <div>
                <a href="http://www.unionesarda.it" target="_blank" rel="noopener noreferrer"><strong>L'Unione Sarda (1994)</strong></a>
                <p>Il primo quotidiano europeo a sbarcare online.</p>
              </div>
            </div>
            <div className="link-item">
              <img src="/images/cnr_logo_1765228516061.png" alt="CNR Logo" className="link-icon" />
              <div>
                <a href="http://www.cnr.it" target="_blank" rel="noopener noreferrer"><strong>CNR Pisa</strong></a>
                <p>Dove tutto è iniziato: la prima connessione italiana a Internet (1986).</p>
              </div>
            </div>
            <div className="link-item">
              <img src="/images/cineca_logo_1765228529586.png" alt="Cineca Logo" className="link-icon" />
              <div>
                <a href="http://www.cineca.it" target="_blank" rel="noopener noreferrer"><strong>Cineca</strong></a>
                <p>Storico consorzio interuniversitario per il calcolo automatico.</p>
              </div>
            </div>
            <div className="link-item">
              <img src="/images/vol_logo_1765228474268.png" alt="VOL Logo" className="link-icon" />
              <div>
                <a href="https://web.archive.org/web/19961222164923/http://www.vol.it/" target="_blank" rel="noopener noreferrer"><strong>Video On Line (VOL) (1995)</strong></a>
                <p>Il provider che ha portato Internet nelle case degli italiani (Link Archive).</p>
              </div>
            </div>
            <div className="link-item">
              <img src="/images/iperbole_logo_1765228543453.png" alt="Iperbole Logo" className="link-icon" />
              <div>
                <a href="http://www.comune.bologna.it" target="_blank" rel="noopener noreferrer"><strong>Iperbole Bologna (1995)</strong></a>
                <p>La prima rete civica italiana gratuita per i cittadini.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="card glass">
          <h2>Icone Internazionali</h2>
          <div className="links-grid">
            <div className="link-item">
              <img src="/images/netscape_logo_1765228458989.png" alt="Netscape Logo" className="link-icon" />
              <div>
                <a href="https://web.archive.org/web/19961017235908/http://www2.netscape.com/" target="_blank" rel="noopener noreferrer"><strong>Netscape</strong></a>
                <p>Il browser che ha fatto la storia del web (Archivio 1996).</p>
              </div>
            </div>
            <div className="link-item">
              <img src="/images/sendmeadollar_logo_1765228559313.png" alt="SendMeADollar Logo" className="link-icon" />
              <div>
                <a href="http://www.sendmeadollar.com" target="_blank" rel="noopener noreferrer"><strong>SendMeADollar.com</strong></a>
                <p>Un classico esperimento sociale di Internet.</p>
              </div>
            </div>
          </div>
        </section>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button onClick={() => handleNavigate('home')} className="btn">Back to Home</button>
        </div>
      </main>
    </>
  );

  return (
    <LanguageProvider>
      <div className={`app-container fade-in ${isVisible ? 'visible' : ''}`}>
        {view === 'home' && <Home onNavigate={handleNavigate} />}
        {view === 'links' && renderLinks()}
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
      </div>
    </LanguageProvider>
  );
}

export default App;
