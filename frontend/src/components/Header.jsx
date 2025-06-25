import { useContext, useState } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import useTranslation from '../hooks/useTranslation';

export default function Header({ onNavigate }) {
  const { language, setLanguage } = useContext(LanguageContext);
  const t = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const pages = ['home', 'flights', 'hotels', 'deals', 'blog', 'contact'];
  const isRTL = language === 'he';

  const toggleMenu = () => setMenuOpen((v) => !v);
  const navigate = (p) => {
    onNavigate(p);
    setMenuOpen(false);
  };

  return (
    <header className="bg-blue-600 text-white shadow">
      <div
        className={`container mx-auto flex flex-wrap items-center justify-between p-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}
      >
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">Travelia</h1>
          <button
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <nav
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } w-full flex-col gap-2 mt-2 md:mt-0 md:flex md:w-auto ${isRTL ? 'md:flex-row-reverse' : 'md:flex-row'} md:items-center`}
        >
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => navigate(p)}
              className="px-3 py-1 hover:underline text-left md:text-center"
            >
              {t(p)}
            </button>
          ))}
        </nav>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="text-black p-1 rounded mt-2 md:mt-0"
          aria-label={t('language')}
        >
          <option value="en">EN</option>
          <option value="he">HE</option>
        </select>
      </div>
    </header>
  );
}
