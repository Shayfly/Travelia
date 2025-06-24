import { useState, useContext } from 'react';
import useTranslation from '../hooks/useTranslation';
import { fetchFlights } from '../api/flights';
import { DealsContext } from '../contexts/DealsContext';
import { formatDate } from '../utils/formatDate';

export default function Flights() {
  const t = useTranslation();
  const { addDeal } = useContext(DealsContext);
  const [form, setForm] = useState({
    from: '',
    to: '',
    depart: '',
    return: '',
    passengers: 1,
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const search = async () => {
    setLoading(true);
    setError('');
    setResults([]);
    try {
      const data = await fetchFlights(form);
      if (data?.data?.length) {
        setResults(data.data);
      } else {
        setError(t('flight_results') + ': 0');
      }
    } catch (err) {
      setError(err.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{t('flights')}</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        <input className="border p-2" name="from" onChange={handleChange} placeholder={t('from')} />
        <input className="border p-2" name="to" onChange={handleChange} placeholder={t('to')} />
        <input className="border p-2" type="date" name="depart" onChange={handleChange} />
        <input className="border p-2" type="date" name="return" onChange={handleChange} />
        <input className="border p-2" type="number" name="passengers" min="1" onChange={handleChange} placeholder={t('passengers')} />
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2"
        onClick={search}
        disabled={loading}
      >
        {loading ? '...' : t('search')}
      </button>
      {error && <p className="text-red-600">{error}</p>}
      <ul className="space-y-2">
        {results.map((f, i) => (
          <li
            key={i}
            className="border p-2 flex flex-col md:flex-row md:justify-between md:items-center gap-2"
          >
            <div>
              <div className="font-semibold">
                {f.airline} - {f.price}
              </div>
              <div className="text-sm">
                {formatDate(f.departure_at || f.depart_date)}
                {f.return_at || f.return_date ? (
                  <>
                    {' '}\u2192 {formatDate(f.return_at || f.return_date)}
                  </>
                ) : null}
              </div>
            </div>
            <div className="flex gap-2">
              {f.link && (
                <a
                  href={f.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-2"
                >
                  {t('book')}
                </a>
              )}
              <button
                className="bg-green-600 text-white px-2"
                onClick={() => addDeal(f, null)}
              >
                {t('add_deal')}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
