import { useState } from 'react';
import useTranslation from '../hooks/useTranslation';
import SearchBar from '../components/SearchBar';
import { fetchFlights } from '../api/flights';
import { fetchHotels } from '../api/hotels';
import SEO from '../components/SEO';
import { mapToIata } from '../utils/iataMap';

export default function Home() {
  const t = useTranslation();
  const [results, setResults] = useState([]);
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async ({ type: searchType, data }) => {
    setType(searchType);
    setLoading(true);
    setError('');
    setResults([]);
    try {
      if (searchType === 'flight') {
        const params = {
          origin: mapToIata(data.from),
          destination: mapToIata(data.to),
          departure_at: data.depart,
          return_at: data.return,
          one_way: data.return ? 'false' : 'true',
          direct: 'false',
          sorting: 'price',
          limit: '30',
        };
        const res = await fetchFlights(params);
        const flights = Array.isArray(res.data) ? res.data : [];
        if (!flights.length) setError(t('flight_results') + ': 0');
        setResults(flights);
      } else {
        const res = await fetchHotels(data);
        const hotels = Array.isArray(res.data) ? res.data : [];
        hotels.sort((a, b) => (a.price || a.price_from || 0) - (b.price || b.price_from || 0));
        if (!hotels.length) setError(t('hotel_results') + ': 0');
        setResults(hotels);
      }
    } catch (e) {
      setError('Failed to fetch results');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : '');
  const getFlightPrice = (f) => (f.price || f.value || 0);
  const getFlightLink = (f) => f.link || f.deep_link;

  return (
    <>
      <SEO title="Travelia" description="Search flights and hotels" />
      <div className="p-4 space-y-6">
        <h2 className="text-2xl font-bold text-center">Travelia</h2>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>{t('searching') || 'Searching...'}</p>}
      {error && <p className="text-red-600">{error}</p>}
      {type === 'flight' && results.length > 0 && (
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
                  {flight.return_at || flight.return_date ? ' - ' + formatDate(flight.return_at || flight.return_date) : ''}
                </p>
                <p className="text-sm">
                  {flight.number_of_changes === 0 ? 'Direct' : `${flight.number_of_changes} stops`}
                </p>
              </div>
              <div className="flex items-center mt-2 sm:mt-0 gap-4">
                <span className="font-bold text-blue-600">${getFlightPrice(flight)}</span>
                {getFlightLink(flight) && (
                  <a
                    href={getFlightLink(flight)}
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
      {type === 'hotel' && results.length > 0 && (
        <ul className="space-y-4">
          {results.map((hotel, i) => (
            <li
              key={i}
              className="border p-4 rounded flex flex-col sm:flex-row sm:justify-between sm:items-center"
            >
              <div className="flex items-center gap-4">
                {hotel.photo && (
                  <img src={hotel.photo} alt={hotel.name} className="w-24 h-16 object-cover rounded" />
                )}
                <div>
                  <p className="font-semibold">{hotel.name}</p>
                  {hotel.rating && <p className="text-sm text-gray-600">Rating: {hotel.rating}</p>}
                </div>
              </div>
              <div className="flex items-center mt-2 sm:mt-0 gap-4">
                <span className="font-bold text-blue-600">${hotel.price || hotel.price_from}</span>
                {hotel.link && (
                  <a
                    href={hotel.link}
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
