
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-[#D6D1C7]">
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000"
          alt="Infrastructure background"
          className="w-full h-full object-cover grayscale brightness-[0.4]"
        />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center items-start md:items-center md:text-center px-6">
        <div className="animate-fade-in-up w-full md:w-auto">
          <span className="block text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-white/90 mb-6 backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full mx-0 md:mx-auto w-fit">
            {t.hero.badge}
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-normal text-white tracking-tight mb-8">
            Sergio <span className="italic text-[#D6D1C7]">Grivetto</span>
          </h1>
          <p className="max-w-2xl mx-0 md:mx-auto text-lg md:text-xl text-white/80 font-light leading-relaxed mb-12">
            {t.hero.subtitle} <br />
            {t.hero.subtitle2}
          </p>

          <div className="flex gap-4 justify-center">
            <a
              href="#experience"
              className="px-10 py-4 bg-[#F5F2EB] text-[#2C2A26] rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-white transition-all shadow-lg inline-block"
            >
              {t.hero.cta}
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
