import { createContext, useState } from 'react';

export const LanguageContext = createContext({
  language: 'he',
  setLanguage: () => {},
});

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('he');
  const value = { language, setLanguage };
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
