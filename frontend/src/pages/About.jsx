import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
  return (
    <div className="p-4">
      <h2>{t('about_title')}</h2>
    </div>
  );
}
