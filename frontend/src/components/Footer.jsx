import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { NavLink } from 'react-router-dom';
import useTranslation from '../hooks/useTranslation';

export default function Footer() {
  const { language } = useContext(LanguageContext);
  const t = useTranslation();
  const pages = [
    { name: 'home', path: '/' },
    { name: 'flights', path: '/flights' },
    { name: 'hotels', path: '/hotels' },
    { name: 'deals', path: '/deals' },
    { name: 'contact', path: '/contact' },
  ];

  return (
    <footer className="bg-gray-200 text-sm mt-auto">
      <div
        className="max-w-screen-xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-2"
        dir={language === 'he' ? 'rtl' : 'ltr'}
      >
        <span>&copy; {new Date().getFullYear()} Travelia</span>
        <nav className="flex gap-3 flex-wrap">
          {pages.map((p) => (
            <NavLink key={p.path} to={p.path} className="hover:underline">
              {t(p.name)}
            </NavLink>
          ))}
        </nav>
      </div>
    </footer>
  );
}
