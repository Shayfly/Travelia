import { createContext, useState, useEffect } from 'react';
import i18n from '../i18n';

export const LanguageContext = createContext({
  language: 'he',
  setLanguage: () => {},
});

export function LanguageProvider({ children }) {
  const [language, setLang] = useState(i18n.language || 'he');

  const setLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLang(lng);
  };

  useEffect(() => {
    document.documentElement.dir = i18n.dir();
  }, [language]);

  const value = { language, setLanguage };
  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}
