import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    // Default to english, or check localStorage if you want persistence
    const [language, setLanguage] = useState('en');

    const toggleLanguage = () => {
        setLanguage((prevLang) => (prevLang === 'en' ? 'ar' : 'en'));
    };

    // Update the document direction (LTR vs RTL) automatically
    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }, [language]);

    // Helper function to get nested translation value (e.g., t('navbar.home'))
    const t = (key) => {
        const keys = key.split('.');
        let value = translations[language];
        for (let k of keys) {
            value = value?.[k];
        }
        return value || key; // Fallback to key if not found
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
