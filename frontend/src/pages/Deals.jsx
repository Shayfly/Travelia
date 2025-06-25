import { useState } from 'react';
import useTranslation from '../hooks/useTranslation';
import { fetchDeals } from '../api/deals';

export default function Deals() {
  const t = useTranslation();
  const [form, setForm] = useState({
    from: '',
    to: '',
    depart: '',
    return: '',
    passengers: 1,
    city: '',
    check_in: '',
    check_out: '',
    guests: 1,
    rooms: 1,
  });
  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [deals, setDeals] = useState([]);
  const [inquiryIndex, setInquiryIndex] = useState(null);
  const [inquiry, setInquiry] = useState({ name: '', email: '', preferences: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const search = async () => {
    try {
      setError('');
      setFlights([]);
      setHotels([]);
      const data = await fetchDeals(form);
      if (data?.flights?.data) setFlights(data.flights.data);
      if (data?.hotels?.data) setHotels(data.hotels.data);
      if (!data?.flights?.data?.length && !data?.hotels?.data?.length) {
        setError(t('hot_deals'));
      }
    } catch {
      setError('Error');
    }
  };

  const addDeal = () => {
    if (selectedFlight && selectedHotel) {
      setDeals([...deals, { flight: selectedFlight, hotel: selectedHotel }]);
      setSelectedFlight(null);
      setSelectedHotel(null);
    }
  };

  const handleInquiryChange = (e) =>
    setInquiry({ ...inquiry, [e.target.name]: e.target.value });

  const submitInquiry = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">{t('deals')}</h2>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{t('search')}</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <input className="border p-2" name="from" placeholder={t('from')} onChange={handleChange} />
          <input className="border p-2" name="to" placeholder={t('to')} onChange={handleChange} />
          <input className="border p-2" type="date" name="depart" onChange={handleChange} />
          <input className="border p-2" type="date" name="return" onChange={handleChange} />
          <input className="border p-2" type="number" min="1" name="passengers" placeholder={t('passengers')} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <input className="border p-2" name="city" placeholder={t('hotel_city')} onChange={handleChange} />
          <input className="border p-2" type="date" name="check_in" onChange={handleChange} />
          <input className="border p-2" type="date" name="check_out" onChange={handleChange} />
          <input className="border p-2" type="number" min="1" name="guests" placeholder={t('guests')} onChange={handleChange} />
          <input className="border p-2" type="number" min="1" name="rooms" placeholder={t('rooms')} onChange={handleChange} />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2" onClick={search}>{t('search')}</button>
        {error && <p className="text-red-600">{error}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">{t('flights')}</h3>
          <ul className="space-y-2">
            {flights.map((f, i) => (
              <li key={i} className="border p-2 flex justify-between items-center">
                <span>{f.airline} - {f.price}</span>
                <button
                  className={`px-2 py-1 ${selectedFlight === f ? 'bg-green-600' : 'bg-blue-600'} text-white`}
                  onClick={() => setSelectedFlight(f)}
                >
                  {selectedFlight === f ? t('selected') : t('select')}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">{t('hotels')}</h3>
          <ul className="space-y-2">
            {hotels.map((h, i) => (
              <li key={i} className="border p-2 flex justify-between items-center">
                <span>{h.name} - {h.price}</span>
                <button
                  className={`px-2 py-1 ${selectedHotel === h ? 'bg-green-600' : 'bg-blue-600'} text-white`}
                  onClick={() => setSelectedHotel(h)}
                >
                  {selectedHotel === h ? t('selected') : t('select')}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        className="bg-green-700 text-white px-4 py-2 disabled:opacity-50"
        onClick={addDeal}
        disabled={!selectedFlight || !selectedHotel}
      >
        {t('add_deal')}
      </button>

      <h3 className="text-xl font-bold">{t('deals_list')}</h3>
      <ul className="space-y-4">
        {deals.map((d, i) => (
          <li key={i} className="border p-4 space-y-2">
            <div>{t('flights')}: {d.flight.airline} - {d.flight.price}</div>
            <div>{t('hotels')}: {d.hotel.name} - {d.hotel.price}</div>
            {inquiryIndex === i ? (
              sent ? (
                <p className="text-green-600">{t('inquiry_sent')}</p>
              ) : (
                <form className="space-y-2" onSubmit={submitInquiry}>
                  <input className="border p-2 w-full" name="name" onChange={handleInquiryChange} placeholder={t('name')} required />
                  <input className="border p-2 w-full" type="email" name="email" onChange={handleInquiryChange} placeholder={t('email')} required />
                  <textarea className="border p-2 w-full" name="preferences" onChange={handleInquiryChange} placeholder={t('preferences')} />
                  <button className="bg-blue-600 text-white px-4 py-2" type="submit">{t('send')}</button>
                </form>
              )
            ) : (
              <button
                className="bg-blue-600 text-white px-2 py-1"
                onClick={() => { setInquiryIndex(i); setSent(false); setInquiry({ name: '', email: '', preferences: '' }); }}
              >
                {t('inquire')}
              </button>
            )}
          </li>
        ))}
        {!deals.length && <li>{t('hot_deals')}</li>}
      </ul>
    </div>
  );
}
