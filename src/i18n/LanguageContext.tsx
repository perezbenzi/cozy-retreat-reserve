
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
  
  console.log('Idioma completo del navegador:', navigator.language);
  console.log('Idioma extraído (primeros 2 caracteres):', browserLang);
  console.log('Idiomas soportados:', Object.keys(translations));
  
  // Check if the detected language is supported
  if (Object.keys(translations).includes(browserLang)) {
    console.log('Idioma detectado es soportado:', browserLang);
    return browserLang;
  }
  
  // Default to English if browser language is not supported
  console.log('Idioma detectado NO es soportado, usando inglés por defecto');
  return 'en';
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<SupportedLanguage>(() => {
    // Check localStorage first, then browser language, then default to English
    const savedLanguage = localStorage.getItem('preferred-language') as SupportedLanguage;
    console.log('Idioma guardado en localStorage:', savedLanguage);
    
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      console.log('Usando idioma guardado:', savedLanguage);
      return savedLanguage;
    }
    
    const detectedLanguage = detectBrowserLanguage();
    console.log('Idioma final seleccionado:', detectedLanguage);
    return detectedLanguage;
  });

  // Save language preference to localStorage
  useEffect(() => {
    console.log('Guardando idioma en localStorage:', language);
    localStorage.setItem('preferred-language', language);
  }, [language]);

  const availableLanguages = [
    { code: 'en' as SupportedLanguage, name: 'English' },
    { code: 'es' as SupportedLanguage, name: 'Español' }
  ];

  console.log('Idioma activo en el contexto:', language);
  console.log('Traducciones cargadas para el idioma:', Object.keys(translations[language]));

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
