import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from '@assets/locales/en.json';
import translationZh from '@assets/locales/zh.json';

const resources = {
  en: {
    translation: translationEN
  },
  zh: {
    translation: translationZh
  }
};

i18n.use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'cookie', 'htmlTag', 'path'],
      caches: ['localStorage', 'cookie'],
    }
  });

export default i18n;
