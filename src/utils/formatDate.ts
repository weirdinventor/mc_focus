import i18n from 'i18next';
import { format as formatFunc, parseISO } from 'date-fns';
import type { FormatOptions } from 'date-fns';
import * as dateFnsLocales from 'date-fns/locale'; // Importez toutes les locales de date-fns

type Options = Parameters<typeof formatFunc>[2];

// Mapping des locales i18next vers date-fns
const localeMap: { [key: string]: dateFnsLocales.Locale } = {
  en: dateFnsLocales.enUS,
  fr: dateFnsLocales.fr,
  es: dateFnsLocales.es,
  de: dateFnsLocales.de,
  // Ajoutez d'autres locales selon vos besoins
};

export const formatDate = (
  date: string,
  dateFormat?: string,
  options?: Options,
) => {
  // Obtenez la locale courante depuis i18next
  const localeKey = i18n.language || 'en'; // Fallback à 'en' si aucune locale n'est définie
  const locale = localeMap[localeKey] || dateFnsLocales.enUS; // Fallback à enUS

  const dateOptions: FormatOptions = {
    ...options,
    locale,
  };

  return formatFunc(parseISO(date), dateFormat ?? 'MMM dd, yyyy', dateOptions);
};