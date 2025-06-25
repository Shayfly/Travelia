import { useState, useContext } from 'react';
import useTranslation from '../hooks/useTranslation';
import { fetchHotels } from '../api/hotels';
import { DealsContext } from '../contexts/DealsContext';

export default function Hotels() {
  const t = useTranslation();
  const { addDeal } = useContext(DealsContext);
  const [form, setForm] = useState({
    city: '',
    check_in: '',
    check_out: '',
    guests: 1,
    rooms: 1,
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const search = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      setResults([]);
      const data = await fetchHotels(form);
      if (!data?.data?.length) setError(t('hotel_results') + ': 0');
      else setResults(data.data);
    } catch {
      setError('Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{t('hotels')}</h2>
      <form onSubmit={search} className="grid grid-cols-2 md:grid-cols-5 gap-2">
        <input
          className="border p-2"
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder={t('hotel_city')}
          required
        />
        <input
          className="border p-2"
          type="date"
          name="check_in"
          value={form.check_in}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2"
          type="date"
          name="check_out"
          value={form.check_out}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2"
          type="number"
          name="guests"
          min="1"
          value={form.guests}
          onChange={handleChange}
          placeholder={t('guests')}
          required
        />
        <input
          className="border p-2"
          type="number"
          name="rooms"
          min="1"
          value={form.rooms}
          onChange={handleChange}
          placeholder={t('rooms')}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 col-span-2 md:col-span-5"
          disabled={loading}
        >
          {t('search')}
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && !loading && <p className="text-red-600">{error}</p>}
      <ul className="space-y-2">
        {results.map((h, i) => (
          <li
            key={i}
            className="border p-4 flex flex-col md:flex-row md:items-center justify-between gap-2"
          >
            <div>
              <p className="font-semibold">{h.name}</p>
              {h.rating && <p className="text-sm">Rating: {h.rating}</p>}
              {h.address && <p className="text-sm">{h.address}</p>}
              {h.price && <p className="text-sm">{h.price}</p>}
            </div>
            <div className="flex gap-2 items-center">
              {h.link && (
                <a
                  href={h.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Book
                </a>
              )}
              <button
                type="button"
                className="bg-green-600 text-white px-2"
                onClick={() => addDeal(null, h)}
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
