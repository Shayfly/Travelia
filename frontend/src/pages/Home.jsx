import { useState } from 'react';
import useTranslation from '../hooks/useTranslation';
import SearchBar from '../components/SearchBar';
import { fetchFlights } from '../api/flights';
import { fetchHotels } from '../api/hotels';

export default function Home() {
  const t = useTranslation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async ({ type, data }) => {
    setLoading(true);
    setResults([]);
    try {
      const res =
        type === 'flight' ? await fetchFlights(data) : await fetchHotels(data);
      setResults(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Travelia</h2>
        <p>{t('hot_deals')}</p>
      </div>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>...</p>}
      <ul className="space-y-2">
        {results.map((r, i) => (
          <li key={i} className="border p-2">
            {r.name || r.airline} - {r.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
