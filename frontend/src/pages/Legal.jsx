import useTranslation from '../hooks/useTranslation';

export default function Legal() {
  const t = useTranslation();
  return (
    <div className="space-y-4 max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold">{t('legal') || 'Legal & Privacy'}</h2>
      <p>This demo site is for educational purposes only. No real bookings are made.</p>
    </div>
  );
}
