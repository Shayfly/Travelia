import { useContext, useState } from 'react';
import useTranslation from '../hooks/useTranslation';
import { DealsContext } from '../contexts/DealsContext';

export default function Deals() {
  const { deals } = useContext(DealsContext);
  const t = useTranslation();
  const [maxPrice, setMaxPrice] = useState('');
  const filtered = deals.filter((d) => {
    const price = (d.flight?.price || 0) + (d.hotel?.price || 0);
    return !maxPrice || price <= Number(maxPrice);
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{t('deals_list')}</h2>
      <div className="flex items-center gap-2">
        <label>
          {t('max_price') || 'Max Price'}:
          <input
            type="number"
            className="border p-1 ml-2"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </label>
      </div>
      <ul className="space-y-2">
        {filtered.map((d, i) => (
          <li key={i} className="border p-2">
            {d.flight && (
              <div>{t('flights')}: {d.flight.airline} - {d.flight.price}</div>
            )}
            {d.hotel && (
              <div>{t('hotels')}: {d.hotel.name} - {d.hotel.price}</div>
            )}
          </li>
        ))}
        {!filtered.length && <li>{t('hot_deals')}</li>}
      </ul>
    </div>
  );
}
