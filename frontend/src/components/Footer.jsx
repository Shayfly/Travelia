import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useContext(LanguageContext);
  return (
    <footer className="p-4 bg-gray-200 text-center text-sm">
      &copy; {new Date().getFullYear()} {t('appName')}
    </footer>
  );
}

