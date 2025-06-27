import { useState, useContext } from 'react';
import useTranslation from '../hooks/useTranslation';
import { fetchHotels } from '../api/hotels';
import { DealsContext } from '../contexts/DealsContext';
import { LanguageContext } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import HeroSearchBar from '../components/HeroSearchBar';
import HotelIcon from '../components/HotelIcon';
import { formatPrice } from '../utils/formatPrice';
import LoadingSpinner from '../components/LoadingSpinner';
import { mapToCity } from '../utils/cityMap';

const hotelBg = '/assets/images/hotel.jpg';

export default function Hotels() {
  const t = useTranslation();
  const { addDeal } = useContext(DealsContext);
  const { language } = useContext(LanguageContext);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const search = async ({ data }) => {
    try {
      setLoading(true);
      setError('');
      setResults([]);

      const params = {
        ...data,
        city: mapToCity(data.city),
        currency: language === 'he' ? 'ILS' : 'USD',
        locale: language,
      };

      const response = await fetchHotels(params);
      console.log('🏨 Hotel API response:', response);

      if (response?.error) {
        setError(response.error);
      } else if (Array.isArray(response?.data) && response.data.length) {
        setResults(response.data);
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
      <div className="space-y-4 overflow-hidden max-w-screen-xl mx-auto px-4">
        <div className="mt-4 relative h-48 sm:h-72 w-full rounded-lg overflow-hidden">
          <img
            src={hotelBg}
            alt="מלון ובריכה"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <h2 className="text-xl font-bold">{t('hotels')}</h2>

        <HeroSearchBar type="hotel" showTripType={false} onSearch={search} />

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
          {results.map((hotel, i) => (
            <li key={i} className="border p-2 flex justify-between items-center gap-4 rounded">
              {hotel.photo && (
                <img
                  src={hotel.photo}
                  alt={hotel.name}
                  className="w-24 h-16 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <p className="font-semibold">{hotel.name}</p>
                {hotel.address && (
                  <p className="text-sm text-gray-600">{hotel.address}</p>
                )}
                <p>
                  {formatPrice(
                    hotel.price || hotel.price_from || hotel.min_price,
                    language === 'he' ? 'ILS' : 'USD'
                  )}
                </p>
              </div>
              {hotel.link && (
                <a
                  href={`${hotel.link}${hotel.link.includes('?') ? '&' : '?'}marker=640704`}
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
