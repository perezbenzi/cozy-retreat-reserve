
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
  
  console.log('LanguageContext: Idioma completo del navegador:', navigator.language);
  console.log('LanguageContext: Idioma extraído (primeros 2 caracteres):', browserLang);
  console.log('LanguageContext: Idiomas soportados:', Object.keys(translations));
  
  // Check if the detected language is supported
  if (Object.keys(translations).includes(browserLang)) {
    console.log('LanguageContext: Idioma detectado es soportado:', browserLang);
    return browserLang;
  }
  
  // Default to English if browser language is not supported
  console.log('LanguageContext: Idioma detectado NO es soportado, usando inglés por defecto');
  return 'en';
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  console.log('LanguageProvider: === INICIANDO PROVEEDOR ===');
  
  const [language, setLanguage] = useState<SupportedLanguage>(() => {
    // Check localStorage first, then browser language, then default to English
    const savedLanguage = localStorage.getItem('preferred-language') as SupportedLanguage;
    console.log('LanguageProvider: Idioma guardado en localStorage:', savedLanguage);
    
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      console.log('LanguageProvider: Usando idioma guardado:', savedLanguage);
      return savedLanguage;
    }
    
    const detectedLanguage = detectBrowserLanguage();
    console.log('LanguageProvider: Idioma final seleccionado:', detectedLanguage);
    return detectedLanguage;
  });

  // Save language preference to localStorage
  useEffect(() => {
    console.log('LanguageProvider: Guardando idioma en localStorage:', language);
    localStorage.setItem('preferred-language', language);
  }, [language]);

  const availableLanguages = [
    { code: 'en' as SupportedLanguage, name: 'English' },
    { code: 'es' as SupportedLanguage, name: 'Español' }
  ];

  console.log('LanguageProvider: Idioma activo en el contexto:', language);
  console.log('LanguageProvider: Traducciones cargadas para el idioma:', Object.keys(translations[language]));

  const value = {
    language,
    setLanguage,
    t: translations[language],
    availableLanguages
  };

  console.log('LanguageProvider: Valor del contexto creado:', {
    language: value.language,
    hasTranslations: !!value.t,
    availableLanguagesCount: value.availableLanguages.length
  });

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  console.log('useLanguage: === HOOK LLAMADO ===');
  const context = useContext(LanguageContext);
  console.log('useLanguage: Contexto obtenido:', context ? 'EXISTE' : 'UNDEFINED');
  
  if (context === undefined) {
    console.error('useLanguage: ERROR - Context is undefined!');
    console.error('useLanguage: LanguageContext:', LanguageContext);
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  console.log('useLanguage: Devolviendo contexto válido');
  return context;
};
