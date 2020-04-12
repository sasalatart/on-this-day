import models from './models';
import i18n from './i18n';

export type Context = {
  models: typeof models;
  t: typeof i18n.t;
};
