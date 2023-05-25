import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ro from './locales/ro.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ro: { translation: ro },
  },
  fallbackLng: 'en',
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <I18nextProvider i18n={i18n}>
      <App />
  </I18nextProvider>
);

export default i18n