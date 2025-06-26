import { useState } from 'react';
import useTranslation from '../hooks/useTranslation';
import { fetchFlights } from '../api/flights';
import SEO from '../components/SEO';
import { mapToIata } from '../utils/iataMap';
import { formatPrice } from '../utils/formatPrice';
import FlightIcon from '../components/FlightIcon';
import CalendarIcon from '../components/CalendarIcon';
import UserIcon from '../components/UserIcon';
import AirportAutocomplete from '../components/AirportAutocomplete';

export default function Flights() {
  const t = useTranslation();
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

  const searchFlights = async (e) => {
    e.preventDefault && e.preventDefault();

    const originCode = mapToIata(form.from) || form.from;
    const destinationCode = mapToIata(form.to) || form.to;

    if (!originCode || !destinationCode) {
      setError('יש להזין יעד ומוצא תקינים');
      return;
    }

    setLoading(true);
    setError('');
    setResults([]);

    try {
      const params = {
        origin: originCode,
        destination: destinationCode,
        depart_date: form.depart,
        return_date: form.return,
        currency: 'ILS',
      };

      console.log('📦 API Params:', params);

      const data = await fetchFlights(params);
      const flights = Array.isArray(data.data) ? data.data : [];

      if (!flights.length) {
        setError(t('flight_results') + ': 0');
      } else {
        setResults(flights);
      }
    } catch (err) {
      setError(t('failed_to_fetch_flights') || 'Failed to fetch flights.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : '');
  const getPrice = (f) => (f.price || f.value || 0) * form.passengers;
  const MARKER = '640704';
  const getLink = (f) => {
    const base = f.link || f.deep_link;
    if (!base) return '';
    return `${base}${base.includes('?') ? '&' : '?'}marker=${MARKER}`;
  };

  return (
    <>
      <SEO title={t('flights')} description="Search flights" />
      <div className="space-y-6 overflow-x-hidden">
        <h2 className="text-xl font-bold">{t('flights')}</h2>
        <form onSubmit={searchFlights}>
          <div className="flex flex-col md:flex-row flex-wrap gap-3 p-4 bg-white shadow rounded-2xl items-center max-w-full md:max-w-3xl mx-auto">
            <div className="relative flex-1 w-full">
              <FlightIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <AirportAutocomplete
                className="w-full rounded-xl border px-3 py-2 pl-9"
                name="from"
                value={form.from}
                onChange={handleChange}
                placeholder={`${t('from')} (TLV)`}
              />
            </div>
            <div className="relative flex-1 w-full">
              <FlightIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <AirportAutocomplete
                className="w-full rounded-xl border px-3 py-2 pl-9"
                name="to"
                value={form.to}
                onChange={handleChange}
                placeholder={`${t('to')} (LHR)`}
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                {t('depart')}
              </label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  className="w-full rounded-xl border px-3 py-2 pl-9"
                  type="date"
                  name="depart"
                  min={new Date().toISOString().split('T')[0]}
                  value={form.depart}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                {t('return')}
              </label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  className="w-full rounded-xl border px-3 py-2 pl-9"
                  type="date"
                  name="return"
                  min={form.depart}
                  value={form.return}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="relative w-full md:w-24">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                className="w-full rounded-xl border px-3 py-2 pl-9"
                type="number"
                name="passengers"
                min="1"
                value={form.passengers}
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

        {error && <p className="text-red-600">{error}</p>}
        {(!loading && !error && results.length === 0) && (
          <p>{t('flight_results')}: 0</p>
        )}
        {results.length > 0 && (
          <ul className="space-y-4">
            {results.map((flight, i) => (
              <li
                key={i}
                className="border p-4 rounded flex flex-col sm:flex-row sm:justify-between sm:items-center"
              >
                <div className="flex-1">
                  <p className="font-semibold">{flight.airline}</p>
                  <p className="text-sm text-gray-600">
                    {formatDate(flight.departure_at || flight.depart_date)}
                    {flight.return_at || flight.return_date
                      ? ' - ' + formatDate(flight.return_at || flight.return_date)
                      : ''}
                  </p>
                </div>
                <div className="flex items-center mt-2 sm:mt-0 gap-4">
                  <span className="font-bold text-primary">
                    {formatPrice(getPrice(flight))}
                  </span>
                  {getLink(flight) && (
                    <a
                      href={getLink(flight)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      {t('book') || 'Book'}
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
