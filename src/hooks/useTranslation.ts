
import { useLanguage } from '@/i18n/LanguageContext';

export const useTranslation = () => {
  console.log('useTranslation: === HOOK INICIADO ===');
  
  try {
    const { t, language, setLanguage, availableLanguages } = useLanguage();
    
    console.log('useTranslation: Hook ejecutado exitosamente', {
      language,
      hasTranslations: !!t,
      availableLanguagesCount: availableLanguages.length
    });
    
    return {
      t,
      language,
      setLanguage,
      availableLanguages
    };
  } catch (error) {
    console.error('useTranslation: Error al llamar useLanguage:', error);
    throw error;
  }
};
