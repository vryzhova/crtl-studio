import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

if (!i18n.isInitialized) {
  i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
      fallbackLng: 'ru',
      supportedLngs: ['en', 'ru'],
      debug: process.env.NODE_ENV === 'development',
      interpolation: {
        escapeValue: false,
      },
      backend: {
        loadPath: '/locales/{{lng}}/translation.json',
      },
      detection: {
        order: ['navigator'],
        // caches: ['localStorage'],
      },
    });
}

export default i18n;
