
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, SupportedLanguage, TranslationKeys } from './translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationKeys;
  availableLanguages: { code: SupportedLanguage; name: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Detect browser language
const detectBrowserLanguage = (): SupportedLanguage => {
  const browserLang = navigator.language.split('-')[0] as SupportedLanguage;
  
  // Check if the detected language is supported
  if (Object.keys(translations).includes(browserLang)) {
    return browserLang;
  }
  
  // Default to English if browser language is not supported
  return 'en';
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<SupportedLanguage>(() => {
    // Check localStorage first, then browser language, then default to English
    const savedLanguage = localStorage.getItem('preferred-language') as SupportedLanguage;
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      return savedLanguage;
    }
    return detectBrowserLanguage();
  });

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('preferred-language', language);
  }, [language]);

  const availableLanguages = [
    { code: 'en' as SupportedLanguage, name: 'English' },
    { code: 'es' as SupportedLanguage, name: 'Español' }
  ];

  const value = {
    language,
    setLanguage,
    t: translations[language],
    availableLanguages
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
