import { createContext, useState } from 'react';
import en from '../i18n/en.json';
import he from '../i18n/he.json';

const dictionaries = { en, he };

export const LanguageContext = createContext({
  language: 'he',
  setLanguage: () => {},
  t: () => '',
});

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('he');

  const t = (key) => {
    const dict = dictionaries[language] || {};
    return dict[key] || key;
  };

  const value = { language, setLanguage, t };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

