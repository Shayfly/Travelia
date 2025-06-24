import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import useTranslation from '../hooks/useTranslation';

export default function Header({ onNavigate }) {
  const { language, setLanguage } = useContext(LanguageContext);
  const t = useTranslation();
  const pages = ['home', 'flights', 'hotels', 'deals', 'blog', 'contact'];
  return (
    <header className="p-4 bg-blue-600 text-white flex flex-wrap justify-between items-center gap-4">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">Travelia</h1>
        <nav className="flex gap-2">
          {pages.map((p) => (
            <button key={p} onClick={() => onNavigate(p)} className="hover:underline">
              {t(p)}
            </button>
          ))}
        </nav>
      </div>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="text-black p-1 rounded"
      >
        <option value="he">HE</option>
        <option value="en">EN</option>
      </select>
    </header>
  );
}
