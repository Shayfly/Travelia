import { useState } from 'react';
import useTranslation from '../hooks/useTranslation';

export default function SearchBar({ onSearch }) {
  const t = useTranslation();
  const [tab, setTab] = useState('flights');
  const [flight, setFlight] = useState({
    from: '',
    to: '',
    depart: '',
    return: '',
    passengers: 1,
  });
  const [hotel, setHotel] = useState({
    city: '',
    check_in: '',
    check_out: '',
    guests: 1,
    rooms: 1,
  });
  const [error, setError] = useState('');

  const handleFlight = (e) => setFlight({ ...flight, [e.target.name]: e.target.value });
  const handleHotel = (e) => setHotel({ ...hotel, [e.target.name]: e.target.value });

  const validateFlight = () => {
    const { from, to, depart, return: ret, passengers } = flight;
    if (!from || !to || !depart || !ret || !passengers) return t('missing_fields');
    if (new Date(ret) < new Date(depart)) return t('invalid_dates');
    if (Number(passengers) <= 0) return t('invalid_numbers');
    return '';
  };

  const validateHotel = () => {
    const { city, check_in, check_out, guests, rooms } = hotel;
    if (!city || !check_in || !check_out || !guests || !rooms) return t('missing_fields');
    if (new Date(check_out) <= new Date(check_in)) return t('invalid_dates');
    if (Number(guests) <= 0 || Number(rooms) <= 0) return t('invalid_numbers');
    return '';
  };

  const submit = (e) => {
    e.preventDefault();
    let err = '';
    if (tab === 'flights') {
      err = validateFlight();
      if (!err && onSearch) onSearch({ type: 'flight', data: flight });
    } else {
      err = validateHotel();
      if (!err && onSearch) onSearch({ type: 'hotel', data: hotel });
    }
    setError(err);
  };

  return (
    <div className="space-y-4">
      <div className="flex">
        <button
          type="button"
          className={`flex-1 p-2 ${tab === 'flights' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setTab('flights')}
        >
          {t('flights')}
        </button>
        <button
          type="button"
          className={`flex-1 p-2 ${tab === 'hotels' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setTab('hotels')}
        >
          {t('hotels')}
        </button>
      </div>
      <form onSubmit={submit} className="space-y-2">
        {tab === 'flights' ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <input className="border p-2" name="from" value={flight.from} onChange={handleFlight} placeholder={t('from')} />
            <input className="border p-2" name="to" value={flight.to} onChange={handleFlight} placeholder={t('to')} />
            <input className="border p-2" type="date" name="depart" value={flight.depart} onChange={handleFlight} />
            <input className="border p-2" type="date" name="return" value={flight.return} onChange={handleFlight} />
            <input
              className="border p-2"
              type="number"
              name="passengers"
              min="1"
              value={flight.passengers}
              onChange={handleFlight}
              placeholder={t('passengers')}
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <input className="border p-2" name="city" value={hotel.city} onChange={handleHotel} placeholder={t('hotel_city')} />
            <input className="border p-2" type="date" name="check_in" value={hotel.check_in} onChange={handleHotel} />
            <input className="border p-2" type="date" name="check_out" value={hotel.check_out} onChange={handleHotel} />
            <input
              className="border p-2"
              type="number"
              name="guests"
              min="1"
              value={hotel.guests}
              onChange={handleHotel}
              placeholder={t('guests')}
            />
            <input
              className="border p-2"
              type="number"
              name="rooms"
              min="1"
              value={hotel.rooms}
              onChange={handleHotel}
              placeholder={t('rooms')}
            />
          </div>
        )}
        {error && <p className="text-red-600">{error}</p>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          {tab === 'flights' ? t('search_flights') : t('search_hotels')}
        </button>
      </form>
    </div>
  );
}
