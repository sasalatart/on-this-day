import mapValues from 'lodash/mapValues';
import en from './en';

export const locales = mapValues({ en }, (value) => ({
  translation: value,
}));
