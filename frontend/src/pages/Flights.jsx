import { useState } from 'react';
import useTranslation from '../hooks/useTranslation';
import { fetchFlights } from '../api/flights';
import SEO from '../components/SEO';
import { mapToIata } from '../utils/iataMap';
import { formatPrice } from '../utils/formatPrice';
import HeroSearchBar from '../components/HeroSearchBar';

export default function Flights() {
  const t = useTranslation();
  const [results, setResults] = useState([]);
  const [passengers, setPassengers] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchFlights = async ({ data }) => {
    const originCode = mapToIata(data.from) || data.from;
    const destinationCode = mapToIata(data.to) || data.to;

    setPassengers(Number(data.passengers) || 1);

    if (!originCode || !destinationCode) {
      setError(t('invalid_airports') || 'יש להזין מוצא ויעד תקינים');
      return;
    }

    setLoading(true);
    setError('');
    setResults([]);

    try {
      const params = {
        origin: originCode,
        destination: destinationCode,
        depart_date: data.depart,
        return_date: data.return,
        currency: 'ILS',
      };

      console.log('📦 API Params:', params);

      const response = await fetchFlights(params);
      const flights = Array.isArray(response.data) ? response.data : [];

      if (!flights.length) {
        setError(t('flight_results') + ': 0');
      } else {
        setResults(flights);
      }
    } catch (err) {
      console.error(err);
      setError(t('failed_to_fetch_flights') || 'Failed to fetch flights.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : '');
  const getPrice = (f) => (f.price || f.value || 0) * passengers;
  const MARKER = '640704';
  const getLink = (f) => {
    const base = f.link || f.deep_link;
    if (!base) return '';
    return `${base}${base.includes('?') ? '&' : '?'}marker=${MARKER}`;
  };

  return (
    <>
      <SEO title={t('flights')} description="Search flights" />
      <div className="space-y-6 overflow-hidden max-w-screen md:max-w-7xl mx-auto">
        <h2 className="text-xl font-bold">{t('flights')}</h2>

        <HeroSearchBar type="flight" showTripType={true} onSearch={searchFlights} />

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
