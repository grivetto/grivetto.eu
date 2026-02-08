import React, { createContext, useState, useContext } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en'); // Default to English

    const toggleLanguage = () => {
        setLanguage((prev) => {
            if (prev === 'en') return 'it';
            if (prev === 'it') return 'es';
            return 'en';
        });
    };

    const t = (section, key) => {
        if (!translations[language][section]) {
            console.warn(`Translation section '${section}' not found`);
            return key;
        }
        const translatedText = translations[language][section][key];
        if (!translatedText) {
            // Fallback to English if translation is missing
            if (language !== 'en' && translations['en'][section] && translations['en'][section][key]) {
                return translations['en'][section][key];
            }
            console.warn(`Translation key '${key}' not found in section '${section}'`);
            return key;
        }
        return translatedText;
    };

    const getFacts = () => {
        return translations[language].curiosity.facts;
    }

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t, getFacts }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
