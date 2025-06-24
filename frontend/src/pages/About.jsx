import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

export default function About() {
  const { t } = useContext(LanguageContext);
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">About {t('appName')}</h2>
      <p>Travelia is a demo travel search application.</p>
    </div>
  );
}


