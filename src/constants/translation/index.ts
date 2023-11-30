import { I18n } from 'i18n-js';

import id from './locales/translation.json';

const i18n = new I18n({ ...id });

i18n.defaultLocale = 'id';
i18n.locale = 'id';

export default (name: string, params = {}) => {
  return i18n.t(name, params);
};
