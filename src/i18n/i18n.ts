import i18next, { TOptions } from 'i18next'; // <-- Import TOptions here
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import type { Locale } from 'date-fns';
import { enUS as enDates, fr as frDates } from 'date-fns/locale';

import en from './en.json';
import fr from './fr.json';
import { I18nKeyPath, Languages } from './types';
import { KEYS } from './../storage/Keys';

const USE_SINGLE_LOCALE = true;

const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
};

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: USE_SINGLE_LOCALE ? Languages.FR : undefined,
    fallbackLng: Languages.FR,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: KEYS.LOCALE,
      caches: ['localStorage'],
    },
  });

export const getLocale = (): Locale => {
  const locale = i18next.language.split('-')[0];
  switch (locale) {
    case 'fr':
      return frDates;
    case 'en':
    default:
      return enDates;
  }
};

// --- THIS IS THE CORRECTED HELPER FUNCTION ---
/**
 * A standalone translation function.
 * Uses the correct TOptions type to ensure type safety.
 */
export const t = (
  keypath: I18nKeyPath | string, // Allow both I18nKeyPath and string for flexibility
  options?: TOptions, // Use the specific TOptions type instead of a generic 'object'
): string => {
  return i18next.t(keypath, options);
};

export default i18next;