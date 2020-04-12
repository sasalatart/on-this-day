import i18n from 'i18next';
import LngDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { locales } from '@on-this-day/shared';

i18n
  .use(LngDetector)
  .use(initReactI18next)
  .init({
    resources: locales,
    interpolation: { escapeValue: false },
  });

export default i18n;
