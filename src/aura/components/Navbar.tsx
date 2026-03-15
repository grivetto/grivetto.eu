
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { BRAND_NAME } from '../constants';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick }) => {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageCycle = () => {
    const langs: ('en' | 'it' | 'es' | 'th')[] = ['en', 'it', 'es', 'th'];
    const currentIndex = langs.indexOf(language);
    const nextIndex = (currentIndex + 1) % langs.length;
    setLanguage(langs[nextIndex]);
  };

  const getLanguageDetails = () => {
    switch (language) {
      case 'it': return { code: 'IT', flag: 'https://flagcdn.com/w40/it.png', label: 'Cambia in Español' };
      case 'es': return { code: 'ES', flag: 'https://flagcdn.com/w40/es.png', label: 'Switch to Thai' };
      case 'th': return { code: 'TH', flag: 'https://flagcdn.com/w40/th.png', label: 'Switch to English' };
      default: return { code: 'EN', flag: 'https://flagcdn.com/w40/gb.png', label: 'Switch to Italiano' };
    }
  };

  const currentLang = getLanguageDetails();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#F5F2EB]/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'
      }`}>
      <div className="max-w-[1800px] mx-auto px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); onNavClick(e, ''); }}
            className={`text-3xl font-serif font-medium tracking-tight transition-colors ${scrolled ? 'text-[#2C2A26]' : 'text-white'}`}
          >
            {BRAND_NAME}
          </a>
          <button
            onClick={handleLanguageCycle}
            title={currentLang.label}
            className={`relative z-[100] flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold tracking-widest uppercase border transition-all ${scrolled ? 'bg-white/80 border-gray-200 text-[#2C2A26] shadow-sm' : 'bg-white/10 border-white/30 text-white hover:bg-white/20'}`}
          >
            <img src={currentLang.flag} alt={currentLang.code} className="w-4 h-3 object-cover rounded-sm grayscale-[0.2]" />
            <span>{currentLang.code}</span>
          </button>
        </div>

        <div className={`hidden md:flex items-center gap-12 text-sm font-medium tracking-widest uppercase transition-colors ${scrolled ? 'text-[#2C2A26]' : 'text-white'}`}>
          <a href="#experience" onClick={(e) => onNavClick(e, 'experience')} className="hover:opacity-60 transition-opacity">{t.nav.experience}</a>
          <a href="#expertise" onClick={(e) => onNavClick(e, 'expertise')} className="hover:opacity-60 transition-opacity">{t.nav.skills}</a>
          <a href="#contact" onClick={(e) => onNavClick(e, 'contact')} className="hover:opacity-60 transition-opacity">{t.nav.contact}</a>
        </div>

        <a
          href="https://grivetto.eu"
          className={`text-[10px] md:text-sm font-medium tracking-widest uppercase transition-all border px-3 py-1 md:px-4 md:py-2 rounded-full ${scrolled ? 'text-[#2C2A26] border-[#2C2A26]' : 'text-white border-white'
            } hover:opacity-60`}
        >
          {t.nav.backToHome}
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
