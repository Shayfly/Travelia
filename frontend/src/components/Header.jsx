import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';
import useTranslation from '../hooks/useTranslation';

// ודא שקובץ Travelia_Logo.png קיים בתיקייה public/assets
const TraveliaLogo = '/assets/Travelia_Logo.png';

export default function Header() {
  const { language, setLanguage } = useContext(LanguageContext);
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
        className={`container mx-auto flex flex-wrap items-center justify-between p-4 ${
          isRTL ? 'md:flex-row-reverse' : ''
        }`}
      >
        {/* לוגו וסלוגן */}
        <div className="flex items-center gap-3">
          <img src={TraveliaLogo} alt="Travelia logo" className="h-10 w-10" />
          <h1 className="text-sm md:text-base font-bold whitespace-nowrap">
            {slogans[language]}
          </h1>
        </div>

        {/* תפריט נייד */}
        <button
          className="md:hidden ml-auto text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* ניווט */}
        <nav
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } w-full flex-col gap-2 mt-3 md:mt-0 md:flex md:w-auto ${
            isRTL ? 'md:flex-row-reverse' : 'md:flex-row'
          } md:items-center`}
        >
          {pages.map((p) => (
            <Link
              key={p.path}
              to={p.path}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-1 hover:u
