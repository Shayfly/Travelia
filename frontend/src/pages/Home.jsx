import { useState } from 'react';
import useTranslation from '../hooks/useTranslation';
import HeroSearchBar from '../components/HeroSearchBar';
// Logo image lives under /assets when provided
const logo = '/assets/Travelia_Logo.png';
const homeBg = '/assets/images/home-bg.jpg';
import HotelIcon from '../components/HotelIcon';
import { fetchFlights } from '../api/flights';
import { fetchHotels } from '../api/hotels';
import SEO from '../components/SEO';
import { mapToIata } from '../utils/iataMap';
import LoadingSpinner from '../components/LoadingSpinner';

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
  const MARKER = '640704';
  const getFlightPrice = (f) => (f.price || f.value || 0);
  const getFlightLink = (f) => {
    const base = f.link || f.deep_link;
    if (!base) return '';
    return `${base}${base.includes('?') ? '&' : '?'}marker=${MARKER}`;
  };
  const getHotelLink = (h) => {
    if (!h.link) return '';
    const base = h.link;
    return `${base}${base.includes('?') ? '&' : '?'}marker=${MARKER}`;
  };

  return (
    <>
      <SEO title="Travelia" description="Search flights and hotels" />
      <div className="space-y-6 max-w-screen-xl mx-auto px-4">
        <div className="relative mt-8 h-48 sm:h-72 w-full rounded-lg overflow-hidden">
          <img
            src={homeBg}
            alt="בריכה ודקלים"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={logo}
              alt="Travelia Logo"
              className="h-24 md:h-32 w-auto drop-shadow-lg"
            />
          </div>
        </div>

        <HeroSearchBar onSearch={handleSearch} />
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
                <span className="font-bold text-primary">${getFlightPrice(flight)}</span>
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
                <span className="font-bold text-primary">${hotel.price || hotel.price_from}</span>
                {getHotelLink(hotel) && (
                  <a
                    href={getHotelLink(hotel)}
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
