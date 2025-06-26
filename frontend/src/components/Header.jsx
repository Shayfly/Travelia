import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';
import useTranslation from '../hooks/useTranslation';
import TraveliaLogo from '../assets/Travelia_Logo.png';

export default function Header() {
  const { language, setLanguage } = useContext(LanguageContext);
  const t = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const pages = [
    { name: 'home', path: '/' },
    { name: 'flights', path: '/flights' },
    { name: 'hotels', path: '/hotels' },
    { name: 'deals', path: '/deals' },
    { name: 'blog', path: '/blog' },
    { name: 'contact', path: '/contact' },
  ];
  const isRTL = language === 'he';

  const toggleMenu = () => setMenuOpen((v) => !v);

  return (
    <header className="bg-blue-600 text-white shadow">
      <div
        className={`container mx-auto flex flex-wrap items-center justify-between p-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}
      >
        <div className="flex items-center gap-2">
          <img src={TraveliaLogo} alt="Travelia logo" className="h-8 w-8" />
          <h1 className="text-xl font-bold whitespace-nowrap">
            טראווליה — הדרך הקלה והחכמה לטיסות ולחופשות
          </h1>
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
            <Link
              key={p.path}
              to={p.path}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-1 hover:underline text-left md:text-center"
            >
              {t(p.name)}
            </Link>
          ))}
        </nav>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="text-black p-1 rounded mt-2 md:mt-0"
          aria-label={t('language')}
        >
          <option value="he">🇮🇱 עברית</option>
          <option value="en">🇬🇧 English</option>
        </select>
      </div>
    </header>
  );
}
