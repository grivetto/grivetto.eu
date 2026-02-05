
import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
    TRANSLATIONS,
    EXPERIENCES_IT, EXPERIENCES_EN,
    SKILL_CATEGORIES_IT, SKILL_CATEGORIES_EN
} from '../translations';
import { Experience, SkillCategory } from '../types';

type Language = 'en' | 'it';

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
        t: TRANSLATIONS[language],
        experiences: language === 'it' ? EXPERIENCES_IT : EXPERIENCES_EN,
        skills: language === 'it' ? SKILL_CATEGORIES_IT : SKILL_CATEGORIES_EN,
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
