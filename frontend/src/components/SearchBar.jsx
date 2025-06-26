import { useState } from 'react';
import useTranslation from '../hooks/useTranslation';
import SearchIcon from './SearchIcon';

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
    <div className="space-y-4 bg-white shadow-lg rounded-2xl p-4">
      <div className="flex">
        <button
          type="button"
          className={`flex-1 p-2 transition-all duration-300 ease-in-out ${tab === 'flights' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setTab('flights')}
        >
          {t('flights')}
        </button>
        <button
          type="button"
          className={`flex-1 p-2 transition-all duration-300 ease-in-out ${tab === 'hotels' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setTab('hotels')}
        >
          {t('hotels')}
        </button>
      </div>
      <form onSubmit={submit} className="space-y-2">
        {tab === 'flights' ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <input className="border p-2 transition-all duration-300 ease-in-out" name="from" value={flight.from} onChange={handleFlight} placeholder={t('from_placeholder')} />
            <input className="border p-2 transition-all duration-300 ease-in-out" name="to" value={flight.to} onChange={handleFlight} placeholder={t('to_placeholder')} />
            <input className="border p-2 transition-all duration-300 ease-in-out" type="date" name="depart" value={flight.depart} onChange={handleFlight} />
            <input className="border p-2 transition-all duration-300 ease-in-out" type="date" name="return" value={flight.return} onChange={handleFlight} placeholder={t('return_placeholder')} />
            <input
              className="border p-2 transition-all duration-300 ease-in-out"
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
            <input className="border p-2 transition-all duration-300 ease-in-out" name="city" value={hotel.city} onChange={handleHotel} placeholder={t('hotel_city')} />
            <input className="border p-2 transition-all duration-300 ease-in-out" type="date" name="check_in" value={hotel.check_in} onChange={handleHotel} />
            <input className="border p-2 transition-all duration-300 ease-in-out" type="date" name="check_out" value={hotel.check_out} onChange={handleHotel} />
            <input
              className="border p-2 transition-all duration-300 ease-in-out"
              type="number"
              name="guests"
              min="1"
              value={hotel.guests}
              onChange={handleHotel}
              placeholder={t('guests')}
            />
            <input
              className="border p-2 transition-all duration-300 ease-in-out"
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
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-xl hover:from-blue-600 text-white font-bold rounded-xl px-6 py-2 flex items-center gap-2 transition-all duration-300 ease-in-out"
        >
          <SearchIcon className="w-5 h-5" />
          {tab === 'flights' ? t('search_flights') : t('search_hotels')}
        </button>
      </form>
    </div>
  );
}
