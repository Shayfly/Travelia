import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { DealsContext } from '../contexts/DealsContext';

export default function Deals() {
  const { deals } = useContext(DealsContext);
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{t('deals_list')}</h2>
      <ul className="space-y-2">
        {deals.map((d, i) => (
          <li key={i} className="border p-2">
            {d.flight && (
              <div>{t('flights')}: {d.flight.airline} - {d.flight.price}</div>
            )}
            {d.hotel && (
              <div>{t('hotels')}: {d.hotel.name} - {d.hotel.price}</div>
            )}
          </li>
        ))}
        {!deals.length && <li>{t('hot_deals')}</li>}
      </ul>
    </div>
  );
}
