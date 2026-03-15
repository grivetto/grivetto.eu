
import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
    TRANSLATIONS,
    EXPERIENCES_IT, EXPERIENCES_EN, EXPERIENCES_ES, EXPERIENCES_TH,
    SKILL_CATEGORIES_IT, SKILL_CATEGORIES_EN, SKILL_CATEGORIES_ES, SKILL_CATEGORIES_TH
} from '../translations';
import { Experience, SkillCategory } from '../types';

type Language = 'en' | 'it' | 'es' | 'th';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: typeof TRANSLATIONS.en;
    experiences: Experience[];
    skills: SkillCategory[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('en');

    const value = {
        language,
        setLanguage,
        t: TRANSLATIONS[language] || TRANSLATIONS.en,
        experiences: language === 'it' ? EXPERIENCES_IT : language === 'es' ? EXPERIENCES_ES : language === 'th' ? EXPERIENCES_TH : EXPERIENCES_EN,
        skills: language === 'it' ? SKILL_CATEGORIES_IT : language === 'es' ? SKILL_CATEGORIES_ES : language === 'th' ? SKILL_CATEGORIES_TH : SKILL_CATEGORIES_EN,
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
