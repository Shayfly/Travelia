import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  return (
    <div className="p-4 text-center space-y-4">
      <h2 className="text-2xl font-bold">Travelia</h2>
      <p>{t('hot_deals')}</p>
    </div>
  );
}
