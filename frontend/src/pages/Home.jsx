import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

export default function Home() {
  const { t } = useContext(LanguageContext);
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{t('welcome')}</h2>
    </div>
  );
}


