import React, { useState, useEffect } from 'react';
import './App.css';
import CustomApp from './CustomApp';
import ImageGrid from './ImageGrid';
import RubiksCube from './RubiksCube';
import NeonTicTacToe from './NeonTicTacToe';
import TetrisGame from './TetrisGame';
import ModernShowcase from './pages/ModernShowcase';
import Portfolio from './pages/Portfolio';
import Resume from './Resume';
import Home from './pages/Home';

import QuizApp from './QuizApp';

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
    return 'home';
  });

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);

    if (view === 'home') {
      const script = document.createElement('script');
      script.src = "https://asciinema.org/a/405507.js";
      script.id = "asciicast-405507";
      script.async = true;
      script.dataset.autoplay = "true";
      script.dataset.cols = "180";
      script.dataset.rows = "15";
      script.dataset.loop = "true";

      const container = document.getElementById('asciinema-container');
      if (container) {
        container.appendChild(script);
      }

      return () => {
        if (container && container.contains(script)) {
          container.removeChild(script);
        }
      };
    }
  }, [view]);

  useEffect(() => {
    if (view === 'home') {
      document.title = 'Sergio Grivetto | Peaceful Thoughts & Digital Innovation';
    } else if (view === 'links') {
      document.title = 'Historical Links | Grivetto.eu';
    } else if (view === 'app') {
      document.title = 'Custom Web App | Grivetto.eu';
    } else if (view === 'grid') {
      document.title = 'Image Grid | Grivetto.eu';
    } else if (view === 'resume') {
      document.title = 'Resume | Sergio Grivetto';
    } else if (view === 'quiz') {
      document.title = 'Quiz App | Grivetto.eu';
    } else if (view === 'portfolio') {
      document.title = 'Portfolio | Sergio Grivetto';
    }
  }, [view]);

  const renderHome = () => (
    <>
      <header className={`hero ${isVisible ? 'fade-in' : ''}`}>
        <div className="hero-content">
          <h1>Peaceful Thoughts</h1>
          <p className="subtitle">Find inner peace and calmness through positive thinking and mindfulness.</p>


        </div>
      </header>

      <main>
        <section className="card glass">
          <h2>What is Peace?</h2>
          <p>
            Peace is a state of mind where you are free from worry and anxiety.
            If you do nice things you get back a clean state of mind: <strong>ALWAYS</strong>.
            It is a feeling of calmness, tranquility, and contentment.
            Peace comes from within and can be achieved through positive thinking, mindfulness, and self-reflection.
          </p>
        </section>

        <div className="grid-container">
          <section className="card glass">
            <h2>The Benefits of Peaceful Thinking</h2>
            <ul className="list-check">
              <li>Reduces stress and anxiety</li>
              <li>Improves mental clarity and focus</li>
              <li>Increases creativity and productivity</li>
              <li>Improves sleep and overall health</li>
              <li>Enhances relationships and communication skills</li>
            </ul>
          </section>

          <section className="card glass">
            <h2>Simple Ways to Find Peace</h2>
            <ul className="list-dot">
              <li>Practice mindfulness meditation</li>
              <li>Spend time in nature</li>
              <li>Listen to calming music</li>
              <li>Practice deep breathing exercises</li>
              <li>Take a break from social media and technology</li>
              <li>Fai al prossimo quello che vorresti fare a te stesso</li>
            </ul>
          </section>
        </div>

        <section className="card glass" style={{ marginTop: '2rem', overflow: 'hidden' }}>
          <h2>Terminal Session</h2>
          <div id="asciinema-container"></div>
        </section>

        <section className="card glass shining-text-container">
          <h2 className="shining-text"><span className="peace-red">Peace</span> is the only way to live</h2>
        </section>
      </main>
    </>
  );

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
          <button onClick={() => setView('home')} className="btn">Back to Home</button>
        </div>
      </main>
    </>
  );

  return (
    <div className={`app-container zoom-impact ${isVisible ? 'animate-in' : ''}`}>
      {view === 'home' && <Home onNavigate={setView} />}
      {view === 'links' && renderLinks()}
      {view === 'app' && <CustomApp onNavigate={setView} />}
      {view === 'grid' && <ImageGrid onNavigate={setView} />}
      {view === 'resume' && <Resume onNavigate={setView} />}
      {view === 'quiz' && <QuizApp onNavigate={setView} />}
      {view === 'portfolio' && <Portfolio onNavigate={setView} />}
      {view === 'rubiks' && <RubiksCube onBack={() => setView('app')} onNavigate={setView} />}
      {view === 'tictactoe' && <NeonTicTacToe onBack={() => setView('app')} onNavigate={setView} />}
      {view === 'tetris' && <TetrisGame onBack={() => setView('app')} onNavigate={setView} />}

      <footer className="footer glass">
        <div className="links">
          <button onClick={() => setView('resume')} className="btn">Resume</button>
          <a href="/aura-quiet-living/index.html" target="_blank" className="btn">Aura Quiet Living</a>
          <a href="https://www.grivetto.eu/hesk/" className="btn">Help Desk</a>
          <button onClick={() => setView('links')} className="btn">Links</button>
          <button onClick={() => setView('app')} className="btn">Web App</button>
          <button onClick={() => setView('grid')} className="btn">Image Grid</button>
          <button onClick={() => setView('quiz')} className="btn">Quiz App</button>
          <button onClick={() => setView('portfolio')} className="btn">Portfolio</button>
          <a href="https://linkedin.com/in/sgrivett" className="btn">Who am I</a>
        </div>
        <p className="copyright">© {new Date().getFullYear()} Sergio Grivetto</p>
      </footer>
    </div>
  );
}

export default App;
