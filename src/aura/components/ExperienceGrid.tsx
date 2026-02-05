
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Experience } from '../types';

interface ExperienceGridProps {
  onExperienceClick: (exp: Experience) => void;
}

const ExperienceGrid: React.FC<ExperienceGridProps> = ({ onExperienceClick }) => {
  const { experiences, t } = useLanguage();

  return (
    <section id="experience" className="py-32 px-6 md:px-12 bg-[#F5F2EB]">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col items-center text-center mb-24 space-y-8">
          <h2 className="text-4xl md:text-6xl font-serif text-[#2C2A26]">{t.experience.title}</h2>
          <div className="h-px bg-[#D6D1C7] w-24"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {experiences.map(exp => (
            <div
              key={exp.id}
              className="group cursor-pointer"
              onClick={() => onExperienceClick(exp)}
            >
              <div className="relative aspect-[16/9] overflow-hidden mb-8 bg-[#EBE7DE]">
                <img
                  src={exp.imageUrl}
                  alt={exp.company}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#A8A29E] mb-2 block">{exp.period}</span>
                  <h3 className="text-3xl font-serif text-[#2C2A26] mb-2">{exp.company}</h3>
                  <p className="text-[#5D5A53] font-light italic">{exp.role}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceGrid;
