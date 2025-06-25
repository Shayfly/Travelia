import { useState, useContext } from 'react';
import useTranslation from '../hooks/useTranslation';
import { fetchHotels } from '../api/hotels';
import { DealsContext } from '../contexts/DealsContext';
import SEO from '../components/SEO';
import HotelIcon from '../components/HotelIcon';

export default function Hotels() {
  const t = useTranslation();
  const { addDeal } = useContext(DealsContext);
  const [form, setForm] = useState({ city: '', check_in: '', check_out: '', guests: 1, rooms: 1 });
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const search = async () => {
    try {
      setError('');
      setResults([]);
      const data = await fetchHotels(form);
      if (!data?.data?.length) setError(t('hotel_results') + ': 0');
      else setResults(data.data);
    } catch {
      setError('Error');
    }
  };

  return (
    <>
      <SEO title={t('hotels')} description="Search hotels" />
      <div className="space-y-4">
        <h2 className="text-xl font-bold">{t('hotels')}</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        <input className="border p-2" name="city" onChange={handleChange} placeholder={t('hotel_city')} />
        <input className="border p-2" type="date" name="check_in" onChange={handleChange} />
        <input className="border p-2" type="date" name="check_out" onChange={handleChange} />
        <input className="border p-2" type="number" name="guests" min="1" onChange={handleChange} placeholder={t('guests')} />
        <input className="border p-2" type="number" name="rooms" min="1" onChange={handleChange} placeholder={t('rooms')} />
      </div>
      <button className="bg-blue-600 text-white px-4 py-2" onClick={search}>{t('search')}</button>
      <a
        href="https://www.trip.com/?Allianceid=6645150&SID=227505580&trip_sub1=&trip_sub3=D4181669"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 justify-center my-4"
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
      {error && <p className="text-red-600">{error}</p>}
      <ul className="space-y-2">
        {results.map((h, i) => (
          <li key={i} className="border p-2 flex justify-between items-center">
            <span>{h.name} - {h.price}</span>
            <button className="bg-green-600 text-white px-2" onClick={() => addDeal(null, h)}>{t('add_deal')}</button>
          </li>
        ))}
      </ul>
      </div>
    </>
  );
}
