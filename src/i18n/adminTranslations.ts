
export const adminTranslations = {
  es: {
    settings: 'Configuración',
    systemSettings: 'Configuración del Sistema',
    generalSettings: 'Configuración general del panel de administración',
    developmentSection: 'Esta sección está en desarrollo y pronto tendrá más funcionalidades.',
    languageSettings: 'Configuración de Idioma',
    adminLanguage: 'Idioma del Panel de Administración',
    adminLanguageDescription: 'Selecciona el idioma en el que deseas ver la interfaz de administración',
    selectLanguage: 'Seleccionar idioma',
    english: 'Inglés',
    spanish: 'Español',
    languageUpdated: 'Idioma actualizado correctamente',
    dashboard: 'Panel de Control',
    bookings: 'Reservas',
    users: 'Usuarios',
    logout: 'Cerrar sesión',
    adminPanel: 'Panel de Administración',
    management: 'Gestión',
    version: 'Panel de Administración v1.0'
  },
  en: {
    settings: 'Settings',
    systemSettings: 'System Settings',
    generalSettings: 'General administration panel settings',
    developmentSection: 'This section is under development and will have more features soon.',
    languageSettings: 'Language Settings',
    adminLanguage: 'Administration Panel Language',
    adminLanguageDescription: 'Select the language you want to see the administration interface in',
    selectLanguage: 'Select language',
    english: 'English',
    spanish: 'Spanish',
    languageUpdated: 'Language updated successfully',
    dashboard: 'Dashboard',
    bookings: 'Bookings',
    users: 'Users',
    logout: 'Logout',
    adminPanel: 'Admin Panel',
    management: 'Management',
    version: 'Admin Panel v1.0'
  }
};

export type AdminLanguage = keyof typeof adminTranslations;
