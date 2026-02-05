
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExperienceGrid from './components/ExperienceGrid';
import Expertise from './components/Expertise';
import Assistant from './components/Assistant';
import Footer from './components/Footer';
import ExperienceDetail from './components/ExperienceDetail';
import { ViewState, Experience } from './types';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  console.log("Aura v2.0 - Bilingual Loaded 🇮🇹🇬🇧");
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#F5F2EB] font-sans text-[#2C2A26] selection:bg-[#D6D1C7] selection:text-[#2C2A26]">
        <AppContent />
      </div>
    </LanguageProvider>
  );
}

function AppContent() {
  const [view, setView] = useState<ViewState>({ type: 'home' });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (view.type !== 'home') {
      setView({ type: 'home' });
      setTimeout(() => scrollToSection(targetId), 0);
    } else {
      scrollToSection(targetId);
    }
  };

  const scrollToSection = (targetId: string) => {
    if (!targetId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar onNavClick={handleNavClick} />

      <main>
        {view.type === 'home' && (
          <>
            <Hero />
            <ExperienceGrid onExperienceClick={(exp) => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setView({ type: 'experience', experience: exp });
            }} />
            <Expertise />
          </>
        )}

        {view.type === 'experience' && (
          <ExperienceDetail
            experience={view.experience}
            onBack={() => {
              setView({ type: 'home' });
              setTimeout(() => scrollToSection('experience'), 50);
            }}
          />
        )}
      </main>

      <Footer onLinkClick={handleNavClick} />
      <Assistant />
    </>
  );
}

export default App;
