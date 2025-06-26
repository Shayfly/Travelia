import { useState } from 'react';
import AirportAutocomplete from './AirportAutocomplete';
import CityAutocomplete from './CityAutocomplete';
import FlightIcon from './FlightIcon';
import HotelIcon from './HotelIcon';
import CalendarIcon from './CalendarIcon';
import SwapIcon from './SwapIcon';
import UserIcon from './UserIcon';
import SearchIcon from './SearchIcon';
import useTranslation from '../hooks/useTranslation';

export default function MainSearchBar({ onSearch }) {
  const t = useTranslation();
  const [activeTab, setActiveTab] = useState('flights');
  const [tripType, setTripType] = useState('round');
  const [flightForm, setFlightForm] = useState({
    from: '',
    to: '',
    depart: '',
    return: '',
    passengers: 1,
    cabin: 'economy',
  });
  const [hotelForm, setHotelForm] = useState({
    city: '',
    check_in: '',
    check_out: '',
    guests: 1,
    rooms: 1,
  });

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

  const submit = (e) => {
    e.preventDefault();
    if (activeTab === 'flights') {
      if (onSearch) onSearch({ type: 'flight', data: flightForm });
    } else {
      if (onSearch) onSearch({ type: 'hotel', data: hotelForm });
    }
  };

  return (
    <form onSubmit={submit} className="max-w-5xl mx-auto mt-4" dir="auto">
      <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 ease-in-out">
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={() => setActiveTab('flights')}
            className={`px-4 py-1 rounded-full font-medium transition-all duration-300 ease-in-out ${
              activeTab === 'flights' ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }`}
          >
            {t('flights')}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('hotels')}
            className={`px-4 py-1 rounded-full font-medium transition-all duration-300 ease-in-out ${
              activeTab === 'hotels' ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }`}
          >
            {t('hotels')}
          </button>
        </div>
        {activeTab === 'flights' && (
          <div className="flex flex-col md:flex-row flex-wrap gap-3 items-center rtl:md:flex-row-reverse">
            <div className="flex items-center relative flex-1">
              <FlightIcon className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <AirportAutocomplete
                name="from"
                value={flightForm.from}
                onChange={handleFlightChange}
                placeholder={t('from_placeholder')}
                className="w-full rounded-xl border px-3 py-2 pl-9 rtl:pl-3 rtl:pr-9"
              />
            </div>
            <button
              type="button"
              onClick={swapLocations}
              className="p-2 rounded-full border hover:bg-gray-100 transition-all duration-300 ease-in-out"
              aria-label={t('swap')}
            >
              <SwapIcon className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center relative flex-1">
              <FlightIcon className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <AirportAutocomplete
                name="to"
                value={flightForm.to}
                onChange={handleFlightChange}
                placeholder={t('to_placeholder')}
                className="w-full rounded-xl border px-3 py-2 pl-9 rtl:pl-3 rtl:pr-9"
              />
            </div>
            <div className="flex items-center relative">
              <CalendarIcon className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="date"
                name="depart"
                value={flightForm.depart}
                onChange={handleFlightChange}
                className="rounded-xl border px-3 py-2 pl-9 rtl:pl-3 rtl:pr-9"
              />
            </div>
            {tripType === 'round' && (
              <div className="flex items-center relative">
                <CalendarIcon className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="date"
                  name="return"
                  value={flightForm.return}
                  onChange={handleFlightChange}
                  placeholder={t('return_placeholder')}
                  className="rounded-xl border px-3 py-2 pl-9 rtl:pl-3 rtl:pr-9"
                />
              </div>
            )}
            <div className="flex items-center relative">
              <UserIcon className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="number"
                name="passengers"
                min="1"
                value={flightForm.passengers}
                onChange={handleFlightChange}
                className="w-20 rounded-xl border px-3 py-2 pl-9 rtl:pl-3 rtl:pr-9"
              />
            </div>
            <button
              className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-xl hover:from-blue-600 text-white font-bold rounded-xl px-6 py-2 flex items-center gap-2 transition-all duration-300 ease-in-out w-full md:w-auto"
              type="submit"
            >
              <SearchIcon className="w-5 h-5" />
              {t('search')}
            </button>
          </div>
        )}
        {activeTab === 'hotels' && (
          <div className="flex flex-col md:flex-row flex-wrap gap-3 items-center rtl:md:flex-row-reverse">
            <div className="flex items-center relative flex-1">
              <HotelIcon className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <CityAutocomplete
                name="city"
                value={hotelForm.city}
                onChange={handleHotelChange}
                placeholder={`${t('hotel_city')} (Paris)`}
                className="w-full rounded-xl border px-3 py-2 pl-9 rtl:pl-3 rtl:pr-9"
              />
            </div>
            <div className="flex items-center relative">
              <CalendarIcon className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="date"
                name="check_in"
                value={hotelForm.check_in}
                onChange={handleHotelChange}
                className="rounded-xl border px-3 py-2 pl-9 rtl:pl-3 rtl:pr-9"
              />
            </div>
            <div className="flex items-center relative">
              <CalendarIcon className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="date"
                name="check_out"
                value={hotelForm.check_out}
                onChange={handleHotelChange}
                className="rounded-xl border px-3 py-2 pl-9 rtl:pl-3 rtl:pr-9"
              />
            </div>
            <div className="flex items-center relative">
              <UserIcon className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="number"
                name="guests"
                min="1"
                value={hotelForm.guests}
                onChange={handleHotelChange}
                className="w-20 rounded-xl border px-3 py-2 pl-9 rtl:pl-3 rtl:pr-9"
              />
            </div>
            <div className="flex items-center relative">
              <HotelIcon className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="number"
                name="rooms"
                min="1"
                value={hotelForm.rooms}
                onChange={handleHotelChange}
                className="w-20 rounded-xl border px-3 py-2 pl-9 rtl:pl-3 rtl:pr-9"
              />
            </div>
            <button
              className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-xl hover:from-blue-600 text-white font-bold rounded-xl px-6 py-2 flex items-center gap-2 transition-all duration-300 ease-in-out w-full md:w-auto"
              type="submit"
            >
              <SearchIcon className="w-5 h-5" />
              {t('search')}
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
