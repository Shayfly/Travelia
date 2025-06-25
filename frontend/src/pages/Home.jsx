import useTranslation from '../hooks/useTranslation';

export default function Home() {
  const t = useTranslation();
  return (
    <div className="p-4 text-center space-y-8">
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">Travelia</h2>
        <p className="text-lg">{t('hot_deals')}</p>
        <a
          href="#search"
          className="bg-blue-600 text-white px-6 py-3 rounded inline-block"
        >
          {t('search')}
        </a>
      </section>
    </div>
  );
}
