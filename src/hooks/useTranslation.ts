
import { useLanguage } from '@/i18n/LanguageContext';

export const useTranslation = () => {
  const { t, language, setLanguage, availableLanguages } = useLanguage();
  
  return {
    t,
    language,
    setLanguage,
    availableLanguages
  };
};
