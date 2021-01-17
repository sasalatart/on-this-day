import i18n from './i18n';
import models from './models';

export type Context = {
  models: typeof models;
  t: typeof i18n.t;
};
