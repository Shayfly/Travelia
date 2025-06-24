import { useState, useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { fetchHotels } from '../api/hotels';

export default function Hotels() {
  const { t } = useContext(LanguageContext);
  const [params, setParams] = useState({
    city: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams((p) => ({ ...p, [name]: value }));
  };

  const handleSearch = async () => {
    setLoading(true);
    const data = await fetchHotels(params);
    setResults(data);
    setLoading(false);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">{t('hotels')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <input
          className="border p-2"
          name="city"
          value={params.city}
          onChange={handleChange}
          placeholder="London"
        />
        <input
          className="border p-2"
          type="date"
          name="checkIn"
          value={params.checkIn}
          onChange={handleChange}
        />
        <input
          className="border p-2"
          type="date"
          name="checkOut"
          value={params.checkOut}
          onChange={handleChange}
        />
        <input
          className="border p-2"
          type="number"
          name="guests"
          value={params.guests}
          min="1"
          onChange={handleChange}
        />
      </div>
      <button className="bg-blue-600 text-white px-4 py-2" onClick={handleSearch}>
        {t('search')}
      </button>
      {loading && <p>{t('loading')}</p>}
      {results && results.data && results.data.length === 0 && <p>{t('noResults')}</p>}
      {results && results.data && results.data.length > 0 && (
        <ul className="space-y-2">
          {results.data.map((item, idx) => (
            <li key={idx} className="border p-2">
              <div>
                {item.name} - {item.price}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


