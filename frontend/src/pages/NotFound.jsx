import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="p-4">
      <h2>{t('not_found')}</h2>
    </div>
  );
}
