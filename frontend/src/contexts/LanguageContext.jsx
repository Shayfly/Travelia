import { createContext, useState } from "react";

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLang] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return localStorage.getItem('lang') || params.get('lang') || 'he';
  });

  const setLanguage = (lang) => {
    localStorage.setItem('lang', lang);
    setLang(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
