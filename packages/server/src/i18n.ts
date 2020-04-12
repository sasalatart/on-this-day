import i18n from 'i18next';
import { locales } from '@on-this-day/shared';

i18n.init({
  lng: 'en',
  resources: locales,
});

export default i18n;
