import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header({ onNavigate }) {
  const { t } = useTranslation();
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
      <LanguageSwitcher />
    </header>
  );
}
