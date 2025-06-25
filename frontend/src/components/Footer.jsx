import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

export default function Footer() {
  const { language } = useContext(LanguageContext);
  return (
    <footer className="bg-gray-200 text-sm">
      <div
        className="container mx-auto p-4 text-center"
        dir={language === 'he' ? 'rtl' : 'ltr'}
      >
        &copy; {new Date().getFullYear()} Travelia
      </div>
    </footer>
  );
}
