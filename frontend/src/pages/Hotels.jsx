import { useState, useContext } from 'react';
import useTranslation from '../hooks/useTranslation';
import { fetchHotels } from '../api/hotels';
import { DealsContext } from '../contexts/DealsContext';
import { LanguageContext } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import HotelIcon from '../components/HotelIcon';
import CalendarIcon from '../components/CalendarIcon';
import UserIcon from '../components/UserIcon';
import CityAutocomplete from '../components/CityAutocomplete';
import { formatPrice } from '../utils/formatPrice';
import LoadingSpinner from '../components/LoadingSpinner';
import { mapToCity } from '../utils/cityMap';

export default function Hotels() {
  const t = useTranslation();
  const { addDeal } = useContext(DealsContext);
  const { language } = useContext(LanguageContext);
  const [form, setForm] = useState({ city: '', check_in: '', check_out: '', guests: 1, rooms: 1 });
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const search = async () => {
    try {
      setLoading(true);
      setError('');
      setResults([]);
      const params = {
        ...form,
        city: mapToCity(form.city),
        currency: language === 'he' ? 'ILS' : 'USD',
        locale: language,
      };
      const data = await fetchHotels(params);
      console.log('Hotel API response:', data);
      if (data && data.error) {
        setError(data.error);
      } else if (Array.isArray(data?.data) && data.data.length) {
        setResults(data.data);
      } else {
        setError(t('no_results') || 'No hotels found');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title={t('hotels')} description="Search hotels" />
      <div className="space-y-4 overflow-x-hidden">
        <h2 className="text-xl font-bold">{t('hotels')}</h2>
      <form onSubmit={(e) => { e.preventDefault(); search(); }}>
        <div className="flex flex-col md:flex-row flex-wrap gap-3 p-4 bg-white shadow rounded-2xl items-center max-w-full md:max-w-3xl mx-auto">
          <div className="relative flex-1 w-full">
            <HotelIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <CityAutocomplete
              className="w-full rounded-xl border px-3 py-2 pl-9"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder={`${t('hotel_city')} (Paris)`}
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              {t('check_in')}
            </label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                className="w-full rounded-xl border px-3 py-2 pl-9"
                type="date"
                name="check_in"
                min={new Date().toISOString().split('T')[0]}
                value={form.check_in}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              {t('check_out')}
            </label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                className="w-full rounded-xl border px-3 py-2 pl-9"
                type="date"
                name="check_out"
                min={form.check_in}
                value={form.check_out}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="relative w-full md:w-24">
            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              className="w-full rounded-xl border px-3 py-2 pl-9"
              type="number"
              name="guests"
              min="1"
              value={form.guests}
              onChange={handleChange}
            />
          </div>
          <div className="relative w-full md:w-24">
            <HotelIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              className="w-full rounded-xl border px-3 py-2 pl-9"
              type="number"
              name="rooms"
              min="1"
              value={form.rooms}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white font-bold rounded-xl px-6 py-2 hover:bg-primary-dark transition w-full md:w-auto"
            disabled={loading}
          >
            {loading ? t('searching') || 'Searching...' : t('search')}
          </button>
        </div>
      </form>
      <a
        href="https://www.trip.com/?Allianceid=6645150&SID=227505580&trip_sub1=&trip_sub3=D4181669"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2 justify-center my-4"
      >
        <HotelIcon className="w-5 h-5" />
        {t('find_hotels_trip')}
      </a>
      <iframe
        src="https://www.trip.com/partners/ad/SB4181690?Allianceid=6645150&SID=227505580&trip_sub1="
        style={{ width: '300px', height: '250px', border: 'none' }}
        frameBorder="0"
        scrolling="no"
        id="SB4181690"
        title="Trip.com Ad"
        className="mx-auto my-4"
      ></iframe>
      {loading && (
        <div className="flex justify-center my-4">
          <LoadingSpinner />
        </div>
      )}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && results.length === 0 && (
        <p>{t('no_results') || 'No hotels found'}</p>
      )}
      <ul className="space-y-2">
        {results.map((h, i) => (
          <li key={i} className="border p-2 flex justify-between items-center gap-4">
            {h.photo && (
              <img src={h.photo} alt={h.name} className="w-24 h-16 object-cover rounded" />
            )}
            <div className="flex-1">
              <p className="font-semibold">{h.name}</p>
              {h.address && <p className="text-sm text-gray-600">{h.address}</p>}
              <p>{formatPrice(h.price || h.price_from || h.min_price, language === 'he' ? 'ILS' : 'USD')}</p>
            </div>
            {h.link && (
              <a
                href={`${h.link}${h.link.includes('?') ? '&' : '?'}marker=640704`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                {t('book') || 'Book'}
              </a>
            )}
          </li>
        ))}
      </ul>
      </div>
    </>
  );
}
