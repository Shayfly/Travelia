import { useState, useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { fetchDeals } from '../api/deals';
import { combineDeals } from '../utils/combineDeals';

export default function Deals() {
  const { t } = useContext(LanguageContext);
  const [params, setParams] = useState({ origin: '', destination: '', city: '' });
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams((p) => ({ ...p, [name]: value }));
  };

  const handleSearch = async () => {
    setLoading(true);
    const data = await fetchDeals(params);
    const list = combineDeals(data.flights.data || [], data.hotels.data || []);
    setDeals(list);
    setLoading(false);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">{t('deals')}</h2>
      <div className="flex flex-col md:flex-row gap-2">
        <input
          className="border p-2"
          name="origin"
          value={params.origin}
          onChange={handleChange}
          placeholder="TLV"
        />
        <input
          className="border p-2"
          name="destination"
          value={params.destination}
          onChange={handleChange}
          placeholder="JFK"
        />
        <input
          className="border p-2"
          name="city"
          value={params.city}
          onChange={handleChange}
          placeholder="New York"
        />
      </div>
      <button className="bg-blue-600 text-white px-4 py-2" onClick={handleSearch}>
        {t('search')}
      </button>
      {loading && <p>{t('loading')}</p>}
      {deals.length === 0 && !loading && <p>{t('noResults')}</p>}
      {deals.length > 0 && (
        <ul className="space-y-2">
          {deals.map((d, idx) => (
            <li key={idx} className="border p-2">
              <div>
                {d.origin}-{d.destination} {d.price} / {d.hotel?.name}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


