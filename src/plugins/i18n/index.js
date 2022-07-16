import { createI18n } from 'vue-i18n';

const messages = {
  en: {},
  ru: {},
};

const i18n = createI18n({
  locale: 'ru',
  fallbackLocale: 'en',
  messages,
});

export default i18n;
