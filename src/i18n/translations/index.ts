
import { en } from './en';
import { es } from './es';

export const translations = {
  en,
  es
};

export type SupportedLanguage = keyof typeof translations;
export type TranslationKeys = typeof en;
