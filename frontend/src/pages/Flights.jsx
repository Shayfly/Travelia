import { useState, useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { fetchFlights } from '../api/flights';

export default function Flights() {
  const { t } = useContext(LanguageContext);
  const [params, setParams] = useState({
    origin: '',
    destination: '',
    depart_date: '',
    return_date: '',
    passengers: 1,
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams((p) => ({ ...p, [name]: value }));
  };

  const handleSearch = async () => {
    setLoading(true);
    const data = await fetchFlights(params);
    setResults(data);
    setLoading(false);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">{t('flights')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
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
          type="date"
          name="depart_date"
          value={params.depart_date}
          onChange={handleChange}
        />
        <input
          className="border p-2"
          type="date"
          name="return_date"
          value={params.return_date}
          onChange={handleChange}
        />
        <input
          className="border p-2"
          type="number"
          name="passengers"
          value={params.passengers}
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
                {item.origin} - {item.destination} : {item.price} {results.currency}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


