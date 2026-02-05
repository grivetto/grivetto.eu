
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Expertise: React.FC = () => {
  const { skills, t } = useLanguage();

  return (
    <section id="expertise" className="bg-[#2C2A26] text-[#F5F2EB] py-32 px-6">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#A8A29E] mb-6 block">{t.expertise.arsenal}</span>
            <h2 className="text-5xl md:text-7xl font-serif mb-12" dangerouslySetInnerHTML={{ __html: t.expertise.title.replace('&', '& <br/>') }}></h2>
            <p className="text-xl text-[#A8A29E] font-light leading-relaxed max-w-md">
              {t.expertise.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {skills.map(cat => (
              <div key={cat.id} className="border-t border-white/10 pt-8">
                <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-white">{cat.title}</h3>
                <ul className="space-y-3">
                  {cat.skills.map((skill, i) => (
                    <li key={i} className="text-[#A8A29E] font-light">{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
