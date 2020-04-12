import mapValues from 'lodash/mapValues';
import en from './en';

export default mapValues({ en }, (value) => ({
  translation: value,
}));
