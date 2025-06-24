import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

export default function Header() {
  const { language, setLanguage, t } = useContext(LanguageContext);
  return (
    <header className="p-4 bg-blue-600 text-white flex justify-between">
      <h1 className="text-xl">{t('appName')}</h1>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="text-black"
      >
        <option value="en">EN</option>
        <option value="he">HE</option>
      </select>
    </header>
  );
}

