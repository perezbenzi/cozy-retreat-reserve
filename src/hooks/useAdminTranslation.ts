
import { useAdminStore } from '@/stores/adminStore';
import { adminTranslations } from '@/i18n/adminTranslations';

export const useAdminTranslation = () => {
  const { adminLanguage, setAdminLanguage } = useAdminStore();
  
  const t = adminTranslations[adminLanguage];
  
  return {
    t,
    adminLanguage,
    setAdminLanguage,
    availableLanguages: [
      { code: 'es' as const, name: 'Español' },
      { code: 'en' as const, name: 'English' }
    ]
  };
};
