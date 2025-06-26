import { Link } from 'react-router-dom';
import useTranslation from '../hooks/useTranslation';
import SEO from '../components/SEO';

export default function NotFound() {
  const t = useTranslation();
  return (
    <>
      <SEO title="404" description="Page not found" />
      <div className="text-center py-20">
        <h2 className="text-6xl font-bold mb-4">404</h2>
        <p className="mb-6 text-lg">{t('not_found')}</p>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {t('back_home')}
        </Link>
      </div>
    </>
  );
}
