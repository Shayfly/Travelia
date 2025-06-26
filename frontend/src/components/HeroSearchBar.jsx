import { useState } from 'react';
import useTranslation from '../hooks/useTranslation';
import FlightIcon from './FlightIcon';
import HotelIcon from './HotelIcon';
import CalendarIcon from './CalendarIcon';
import UserIcon from './UserIcon';
import SwapIcon from './SwapIcon';
import SearchIcon from './SearchIcon';
import AirportAutocomplete from './AirportAutocomplete';
import CityAutocomplete from './CityAutocomplete';

export default function HeroSearchBar({ onSearch, type = 'flight', showTripType = true }) {
  const t = useTranslation();
  const [flightForm, setFlightForm] = useState({
    from: '',
    to: '',
    depart: '',
    return: '',
    passengers: 1,
  });
  const [hotelForm, setHotelForm] = useState({
    city: '',
    check_in: '',
    check_out: '',
    guests: 1,
    rooms: 1,
  });
  const [tripType, setTripType] = useState('round');

  const handleFlightChange = (e) => {
    const { name, value } = e.target;
    setFlightForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleHotelChange = (e) => {
    const { name, value } = e.target;
    setHotelForm((prev) => ({ ...prev, [name]: value }));
  };

  const swapLocations = () => {
    setFlightForm((prev) => ({ ...prev, from: prev.to, to: prev.from }));
  };

  const selectTripType = (type) => {
    setTripType(type);
    if (type === 'oneWay') {
      setFlightForm((prev) => ({ ...prev, return: '' }));
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (onSearch)
      onSearch({
        type,
        data: type === 'flight' ? flightForm : hotelForm,
      });
  };

  return (
    <form onSubmit={submit} className="max-w-3xl mx-auto mt-4">
      <div className="flex flex-col md:flex-row gap-3 p-4 rounded-2xl bg-white shadow items-center rtl:md:flex-row-reverse">
        {type === 'flight' && showTripType && (
          <div className="flex gap-2 rtl:flex-row-reverse items-center">
            <span className="font-semibold whitespace-nowrap">{t('trip_type')}</span>
            <button
              type="button"
              onClick={() => selectTripType('round')}
              className={`px-3 py-1 rounded-xl border ${tripType === 'round' ? 'bg-primary text-white' : ''}`}
            >
              {t('round_trip')}
            </button>
            <button
              type="button"
              onClick={() => selectTripType('oneWay')}
              className={`px-3 py-1 rounded-xl border ${tripType === 'oneWay' ? 'bg-primary text-white' : ''}`}
            >
              {t('one_way')}
            </button>
          </div>
        )}

        {type === 'flight' ? (
          <>
            <div className="flex-1 flex items-center gap-2 rtl:flex-row-reverse">
              <FlightIcon className="w-5 h-5 text-blue-500" />
              <AirportAutocomplete
                name="from"
                value={flightForm.from}
                onChange={handleFlightChange}
                placeholder={t('from_placeholder')}
                className="flex-1 rounded-xl border px-3 py-2"
              />
            </div>
            <button
              type="button"
              onClick={swapLocations}
              className="p-2 rounded-full border hover:bg-gray-100"
              aria-label={t('swap')}
            >
              <SwapIcon className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex-1 flex items-center gap-2 rtl:flex-row-reverse">
              <FlightIcon className="w-5 h-5 text-blue-500" />
              <AirportAutocomplete
                name="to"
                value={flightForm.to}
                onChange={handleFlightChange}
                placeholder={t('to_placeholder')}
                className="flex-1 rounded-xl border px-3 py-2"
              />
            </div>
            <div className="flex items-center gap-2 rtl:flex-row-reverse">
              <CalendarIcon className="w-5 h-5 text-blue-500" />
              <input
                type="date"
                name="depart"
                value={flightForm.depart}
                onChange={handleFlightChange}
                className="rounded-xl border px-3 py-2"
              />
            </div>
            <div className="flex items-center gap-2 rtl:flex-row-reverse">
              <CalendarIcon className="w-5 h-5 text-blue-500" />
              <input
                type="date"
                name="return"
                value={flightForm.return}
                onChange={handleFlightChange}
                disabled={tripType === 'oneWay'}
                className="rounded-xl border px-3 py-2 disabled:bg-gray-100"
              />
            </div>
            <div className="flex items-center gap-2 rtl:flex-row-reverse">
              <UserIcon className="w-5 h-5 text-blue-500" />
              <input
                type="number"
                name="passengers"
                min="1"
                value={flightForm.passengers}
                onChange={handleFlightChange}
                className="w-20 rounded-xl border px-3 py-2"
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex-1 flex items-center gap-2 rtl:flex-row-reverse">
              <HotelIcon className="w-5 h-5 text-blue-500" />
              <CityAutocomplete
                name="city"
                value={hotelForm.city}
                onChange={handleHotelChange}
                placeholder={t('hotel_city')}
                className="flex-1 rounded-xl border px-3 py-2"
              />
            </div>
            <div className="flex items-center gap-2 rtl:flex-row-reverse">
              <CalendarIcon className="w-5 h-5 text-blue-500" />
              <input
                type="date"
                name="check_in"
                value={hotelForm.check_in}
                onChange={handleHotelChange}
                className="rounded-xl border px-3 py-2"
              />
            </div>
            <div className="flex items-center gap-2 rtl:flex-row-reverse">
              <CalendarIcon className="w-5 h-5 text-blue-500" />
              <input
                type="date"
                name="check_out"
                value={hotelForm.check_out}
                onChange={handleHotelChange}
                className="rounded-xl border px-3 py-2"
              />
            </div>
            <div className="flex items-center gap-2 rtl:flex-row-reverse">
              <UserIcon className="w-5 h-5 text-blue-500" />
              <input
                type="number"
                name="guests"
                min="1"
                value={hotelForm.guests}
                onChange={handleHotelChange}
                className="w-20 rounded-xl border px-3 py-2"
              />
            </div>
            <div className="flex items-center gap-2 rtl:flex-row-reverse">
              <HotelIcon className="w-5 h-5 text-blue-500" />
              <input
                type="number"
                name="rooms"
                min="1"
                value={hotelForm.rooms}
                onChange={handleHotelChange}
                className="w-20 rounded-xl border px-3 py-2"
              />
            </div>
          </>
        )}

        <button
          className="bg-gradient-to-r from-primary-light to-primary-dark shadow-xl hover:from-primary text-white font-bold rounded-xl px-6 py-2 flex items-center gap-2 transition-all duration-300 ease-in-out w-full md:w-auto"
          type="submit"
        >
          <SearchIcon className="w-5 h-5" />
          {t('search')}
        </button>
      </div>
    </form>
  );
}
