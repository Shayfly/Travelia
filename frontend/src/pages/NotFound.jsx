import useTranslation from '../hooks/useTranslation';
import { useEffect } from 'react';

export default function NotFound() {
  const t = useTranslation();
  useEffect(() => {
    document.title = 'Travelia - 404';
  }, []);
  return (
    <div className="p-4">
      <h2>404 - {t('not_found')}</h2>
    </div>
  );
}
