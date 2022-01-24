import i18n from 'i18next';
import translation from './translation.json';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: localStorage.language === 'ro' ? 'ro' : 'en',
  interpolation: {
    escapeValue: false,
  },
  resources: translation,
  react: {
    bindI18n: 'loaded languageChanged',
    bindI18nStore: 'added',
    useSuspense: true,
  },
});

export default i18n;