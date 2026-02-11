import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './VintagePortal.css';

const VintagePortal = ({ onNavigate }) => {
    const { t } = useLanguage();

    useEffect(() => {
        // Load asciinema script
        const script = document.createElement('script');
        script.src = 'https://asciinema.org/a/405507.js';
        script.id = 'asciicast-405507';
        script.async = true;
        script.setAttribute('data-autoplay', 'true');
        script.setAttribute('data-loop', 'true');

        const container = document.getElementById('asciinema-container');
        if (container) {
            container.appendChild(script);
        }

        return () => {
            if (container && container.contains(script)) {
                container.removeChild(script);
            }
        };
    }, []);

    return (
        <div className="vintage-body">
            <div className="vintage-container">
                <header className="vintage-header">
                    <h1 className="vintage-h1">{t('vintage', 'welcome')}</h1>
                    <p><em>{t('vintage', 'subtitle')}</em></p>
                    <hr className="vintage-hr" />
                </header>

                <main className="vintage-main">
                    <section className="vintage-section">
                        <h2 className="vintage-h2">What is Peace?</h2>
                        <p>
                            Peace is a state of mind where you are free from worry and anxiety. If you do nice things you get back a clean state of mind: ALWAYS.
                            <br />
                            It is a feeling of calmness, tranquility, and contentment. Peace comes from within and can be achieved through positive thinking, mindfulness, and self-reflection.
                        </p>
                    </section>

                    <section className="vintage-section">
                        <h2 className="vintage-h2">{t('vintage', 'terminal')}</h2>
                        <div id="asciinema-container" className="vintage-terminal-box"></div>
                    </section>

                    <section className="vintage-section">
                        <h2 className="vintage-h2">The Benefits of Peaceful Thinking</h2>
                        <ul>
                            <li>Reduces stress and anxiety</li>
                            <li>Improves mental clarity and focus</li>
                            <li>Increases creativity and productivity</li>
                            <li>Improves sleep and overall health</li>
                            <li>Enhances relationships and communication skills</li>
                        </ul>
                    </section>

                    <section className="vintage-section">
                        <h2 className="vintage-h2">Simple Ways to Find Peace</h2>
                        <ul>
                            <li>Practice mindfulness meditation</li>
                            <li>Spend time in nature</li>
                            <li>Listen to calming music</li>
                            <li>Practice deep breathing exercises</li>
                            <li>Take a break from social media and technology</li>
                        </ul>
                        <p>
                            Check out <a href="https://www.grivetto.eu/mail/adminpanel" className="vintage-a">mail</a> site or visit my <a href="https://grivetto.eu/wordpress" className="vintage-a">WordPress</a> blog, and this <a href="https://www.grivetto.eu/links.html" className="vintage-a">one</a>.
                        </p>
                        <p>
                            <a href="https://linkedin.com/in/sgrivett" className="vintage-a">Who am I?</a>
                        </p>
                    </section>

                    <div className="vintage-gifs">
                        <img src="/vipower.gif" alt="Vi power" className="vintage-gif" />
                        <br />
                        <img src="/dancing-penguin.gif" alt="Dancing Penguin" className="vintage-gif" />
                    </div>

                    <div className="vintage-nav">
                        <hr className="vintage-hr" />
                        <p>
                            <button onClick={() => onNavigate('home')} className="vintage-button">
                                [ {t('vintage', 'back')} ]
                            </button>
                        </p>
                    </div>
                </main>

                <footer className="vintage-footer">
                    <hr className="vintage-hr" />
                    <p>&copy; 2023-2026 Peaceful Thoughts. All rights reserved.</p>
                    <p><small>Optimized for Mosaic 1.0 and Netscape 0.96</small></p>
                </footer>
            </div>
        </div>
    );
};

export default VintagePortal;
