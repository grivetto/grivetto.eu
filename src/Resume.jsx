import React from 'react';
import { useLanguage } from './contexts/LanguageContext';
import LanguageSelector from './components/LanguageSelector';
import './Resume.css';

const Resume = ({ onNavigate }) => {
    const { t } = useLanguage();

    const expNpo = t('resume', 'exp_npo');
    const expBreak = t('resume', 'exp_break');
    const expBanco = t('resume', 'exp_banco');
    const expEu = t('resume', 'exp_eu');
    const expIts = t('resume', 'exp_its');
    const expNovell = t('resume', 'exp_novell');

    return (
        <div className="resume-container glass">
            <header className="resume-header">
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 1000 }}>
                    <LanguageSelector />
                </div>
                <div className="header-content">
                    <h1>Sergio Grivetto</h1>
                    <p className="job-title">{t('resume', 'job_title')}</p>
                    <div className="contact-info">
                        <span>{t('resume', 'loc')}</span>
                        <span>•</span>
                        <a href="mailto:sergio@grivetto.it">sergio@grivetto.it</a>
                        <span>•</span>
                        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>grivetto.eu</a>
                        <span>•</span>
                        <a href="https://www.linkedin.com/in/sgrivett/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                </div>
            </header>

            <div className="resume-content">
                <section className="resume-section">
                    <h2>{t('resume', 'section_exp')}</h2>

                    <div className="experience-item">
                        <div className="job-meta">
                            <h3>{expNpo.title}</h3>
                            <span className="company">{expNpo.company}</span>
                            <span className="dates">Nov 2013 – Present</span>
                        </div>
                        <ul className="job-details">
                            <li><strong>Infrastructure Orchestration:</strong> {expNpo.desc_1}</li>
                            <li><strong>Systems Engineering:</strong> {expNpo.desc_2}</li>
                            <li><strong>Advanced System Tools:</strong> {expNpo.desc_3}</li>
                            <li><strong>Reliability Engineering:</strong> {expNpo.desc_4}</li>
                        </ul>
                    </div>

                    <div className="experience-item">
                        <div className="job-meta">
                            <h3>{expBreak.title}</h3>
                            <span className="dates">2007 – 2013</span>
                        </div>
                        <p style={{ opacity: 0.8, fontStyle: 'italic' }}>{expBreak.desc}</p>
                    </div>

                    <div className="experience-item">
                        <div className="job-meta">
                            <h3>{expBanco.title}</h3>
                            <span className="company">{expBanco.company}</span>
                            <span className="dates">2004 – 2007</span>
                        </div>
                        <ul className="job-details">
                            <li><strong>Security Auditing:</strong> {expBanco.desc_1}</li>
                            <li><strong>DMZ Migration:</strong> {expBanco.desc_2}</li>
                            <li><strong>Perimeter Security:</strong> {expBanco.desc_3}</li>
                            <li><strong>Unix Administration:</strong> {expBanco.desc_4}</li>
                            <li><strong>Architectural Design:</strong> {expBanco.desc_5}</li>
                        </ul>
                    </div>

                    <div className="experience-item">
                        <div className="job-meta">
                            <h3>{expEu.title}</h3>
                            <span className="company">{expEu.company}</span>
                            <span className="dates">2002 – 2004</span>
                        </div>
                        <ul className="job-details">
                            <li><strong>Migration Project:</strong> {expEu.desc_1}</li>
                            <li><strong>Network Administration:</strong> {expEu.desc_2}</li>
                            <li><strong>Monitoring & Performance:</strong> {expEu.desc_3}</li>
                            <li><strong>Security & Firewall:</strong> {expEu.desc_4}</li>
                            <li><strong>Technological Benchmarking:</strong> {expEu.desc_5}</li>
                        </ul>
                    </div>

                    <div className="experience-item">
                        <div className="job-meta">
                            <h3>{expIts.title}</h3>
                            <span className="company">{expIts.company}</span>
                            <span className="dates">1999 – 2001</span>
                        </div>
                        <ul className="job-details">
                            <li><strong>Weblinea.it Project:</strong> {expIts.desc_1}</li>
                            <li><strong>Server & Mail Configuration:</strong> {expIts.desc_2}</li>
                            <li><strong>Tuning & Optimization:</strong> {expIts.desc_3}</li>
                        </ul>
                    </div>

                    <div className="experience-item">
                        <div className="job-meta">
                            <h3>{expNovell.title}</h3>
                            <span className="company">{expNovell.company}</span>
                            <span className="dates">1996 – 1998</span>
                        </div>
                        <ul className="job-details">
                            <li><strong>Certification:</strong> {expNovell.desc_1}</li>
                            <li><strong>Infrastructure:</strong> {expNovell.desc_2}</li>
                            <li><strong>Development:</strong> {expNovell.desc_3}</li>
                        </ul>
                    </div>
                </section>

                <section className="resume-section">
                    <h2>{t('resume', 'section_skills')}</h2>
                    <div className="skills-grid">
                        <div className="skill-category">
                            <h3>Systems & OS</h3>
                            <p>Linux (RedHat, SuSE, CentOS, Ubuntu), Windows Server, BSD (OpenBSD, FreeBSD), Solaris, AIX, HP-UX</p>
                        </div>
                        <div className="skill-category">
                            <h3>Monitoring & DevOps</h3>
                            <p>Advanced Infrastructure Monitoring, Nagios, Cacti, Shell Scripting (Bash, KSH, Perl), Python, Docker</p>
                        </div>
                        <div className="skill-category">
                            <h3>Networking & Security</h3>
                            <p>TCP/IP, Firewalls (Check Point, Iptables), VPN, IDS/IPS, Squid Proxy, Sendmail, Postfix, Samba, Apache</p>
                        </div>
                    </div>
                </section>

                <section className="resume-section">
                    <h2>{t('resume', 'section_edu')}</h2>
                    <div className="education-item">
                        <h3>{t('resume', 'edu_diploma')}</h3>
                        <span className="company">ITIS A. Avogadro – Turin</span>
                    </div>
                </section>

                <section className="resume-section">
                    <h2>{t('resume', 'section_lang')}</h2>
                    <ul className="languages-list">
                        <li>{t('resume', 'lang_it')}</li>
                        <li>{t('resume', 'lang_en')}</li>
                        <li>{t('resume', 'lang_es')}</li>
                    </ul>
                </section>

                <footer className="resume-footer">
                    <p>{t('resume', 'footer_auth')}</p>
                    <button onClick={() => onNavigate('home')} className="btn-back">{t('resume', 'btn_back')}</button>
                    <a href="/CV_Sergio_Finale_ENG.pdf" download className="btn-download">{t('resume', 'btn_download')}</a>
                </footer>
            </div>
        </div>
    );
};

export default Resume;
