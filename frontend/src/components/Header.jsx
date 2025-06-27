import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';
import useTranslation from '../hooks/useTranslation';
import LanguageSelector from './LanguageSelector';

const TraveliaLogo = '/assets/Travelia_Logo.png';

export default function Header() {
  const { language } = useContext(LanguageContext);
  const t = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isRTL = language === 'he';

  const pages = [
    { name: 'home', path: '/' },
    { name: 'flights', path: '/flights' },
    { name: 'hotels', path: '/hotels' },
    { name: 'deals', path: '/deals' },
    { name: 'blog', path: '/blog' },
    { name: 'contact', path: '/contact' },
  ];

  const slogans = {
    he: 'טראווליה — הדרך הקלה והחכמה לטיסות ולחופשות',
    en: 'Travelia — Your smart and easy flight & travel companion',
  };

  return (
    <header className="bg-primary text-white shadow">
      <div
        className={`max-w-screen-xl mx-auto px-4 flex flex-wrap items-center justify-between p-4 ${
          isRTL ? 'md:flex-row-reverse' : ''
        }`}
      >
        {/* Logo and slogan */}
        <div className="flex items-center gap-3">
          <img src={TraveliaLogo} alt="Travelia logo" className="h-10 w-10" />
          <p className="text-sm md:text-base font-bold whitespace-nowrap">
            {slogans[language]}
          </p>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden ml-auto text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Navigation */}
        <nav
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } w-full flex-col gap-2 mt-3 md:mt-0 md:flex md:w-auto ${
            isRTL ? 'md:flex-row-reverse' : 'md:flex-row'
          } md:items-center`}
        >
          {pages.map((p) => (
            <NavLink
              key={p.path}
              to={p.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-3 py-1 hover:underline ${isActive ? 'font-semibold' : ''}`
              }
            >
              {t(p.name)}
            </NavLink>
          ))}
          <LanguageSelector className="ml-2" />
        </nav>
      </div>
    </header>
  );
}
