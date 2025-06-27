import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

const flags = {
  he: '/assets/icons/il.svg',
  en: '/assets/icons/us.svg',
};

export default function LanguageSelector({ className = '' }) {
  const { language, setLanguage } = useContext(LanguageContext);
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Object.entries(flags).map(([lang, icon]) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          aria-label={lang}
          className={`p-1 rounded hover:bg-gray-200 transition ${language === lang ? 'ring-2 ring-primary' : ''}`}
        >
          <img src={icon} alt={`${lang} flag`} className="w-5 h-5" />
        </button>
      ))}
    </div>
  );
}
