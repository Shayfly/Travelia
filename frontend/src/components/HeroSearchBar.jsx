import { useState } from 'react';
import useTranslation from '../hooks/useTranslation';
import FlightIcon from './FlightIcon';
import CalendarIcon from './CalendarIcon';
import UserIcon from './UserIcon';
import SwapIcon from './SwapIcon';
import SearchIcon from './SearchIcon';
import AirportAutocomplete from './AirportAutocomplete';
import CityAutocomplete from './CityAutocomplete';

export default function HeroSearchBar({ onSearch, type = 'flight', showTripType = true }) {
  const t = useTranslation();
  const [form, setForm] = useState(
    type === 'hotel'
      ? { city: '', check_in: '', check_out: '', guests: 1, rooms: 1 }
      : { from: '', to: '', depart: '', return: '', passengers: 1 }
  );
  const [tripType, setTripType] = useState('round');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const swapLocations = () => {
    setForm((prev) => ({ ...prev, from: prev.to, to: prev.from }));
  };

  const selectTripType = (type) => {
    setTripType(type);
    if (type === 'oneWay') {
      setForm((prev) => ({ ...prev, return: '' }));
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const payload = { ...form };
    if (type === 'flight' && tripType === 'oneWay') {
      payload.return = '';
    }
    if (onSearch) onSearch({ type, data: payload });
  };

  return (
    <form onSubmit={submit} className="max-w-screen md:max-w-7xl mx-auto mt-4 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3 p-4 rounded-2xl bg-white shadow items-end">
        {type === 'flight' && showTripType && (
          <div className="flex gap-2 items-center col-span-full rtl:flex-row-reverse">
            <span className="font-semibold whitespace-nowrap">{t('trip_type')}</span>
            <button
              type="button"
              onClick={() => selectTripType('round')}
              className={`px-3 py-1 rounded-xl border ${tripType === 'round' ? 'bg-blue-600 text-white' : ''}`}
            >
              {t('round_trip')}
            </button>
            <button
              type="button"
              onClick={() => selectTripType('oneWay')}
              className={`px-3 py-1 rounded-xl border ${tripType === 'oneWay' ? 'bg-blue-600 text-white' : ''}`}
            >
              {t('one_way')}
            </button>
          </div>
        )}

        {type === 'flight' ? (
          <>
            <div className="flex items-center relative">
              <FlightIcon className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <AirportAutocomplete
                name="from"
                value={form.from}
                onChange={handleChange}
                placeholder={t('from_placeholder')}
                className="w-full rounded-xl border px-3 py-2 pl-9 rtl:pl-3 rtl:pr-9"
              />
            </div>
            <button
              type="button"
              onClick={swapLocations}
              className="p-2 rounded-full border hover:bg-gray-100 transition-all"
              aria-label={t('swap')}
            >
              <SwapIcon className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center relative">
              <FlightIcon className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <AirportAutocomplete
                name="to"
                value={form.to}
                onChange={handleChange}
                placeholder={t('to_placeholder')}
                className="w-full rounded-xl border px-3 py-2 pl-9 rtl:pl-3 rtl:pr-9"
              />
            </div>
            <div className="flex items-center relative">
              <CalendarIcon className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="date"
                name="depart"
                min={new Date().toISOString().split('T')[0]}
                value={form.depart}
                onChange={handleChange}
                className="w-full rounded-xl border px-3 py-2 pl-9 rtl:pl-3 rtl:pr-9"
              />
            </div>
            <div className="flex items-center relative">
              <CalendarIcon className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="date"
                name="return"
                min={form.depart || new Date().toISOString().split('T')[0]}
                value={form.return}
                onChange={handleChange}
                disabled={tripType === 'oneWay'}
                className="w-full rounded-xl border px-3 py-2 pl-9 rtl:pl-3 rtl:pr-9 disabled:bg-gray-100"
              />
            </div>
            <div className="flex items-center relative">
              <UserIcon className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="number"
                name="passengers"
                min="1"
                value={form.passengers}
                onChange={handleChange}
                className="w-full md:w-20 rounded-xl border px-3 py-2 pl-9 rtl:pl-3 rtl:pr-9"
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center relative">
              <FlightIcon className="hidden" />
              <CityAutocomplete
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder={`${t('hotel_city')} (Paris)`}
                className="w-full rounded-xl border px-3 py-2"
              />
            </div>
            <div className="flex items-center relative">
              <CalendarIcon className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="date"
                name="check_in"
                min={new Date().toISOString().split('T')[0]}
                value={form.check_in}
                onChange={handleChange}
                className="w-full rounded-xl border px-3 py-2 pl-9 rtl:pl-3 rtl:pr-9"
              />
            </div>
            <div className="flex items-center relative">
              <CalendarIcon className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="date"
                name="check_out"
                min={form.check_in || new Date().toISOString().split('T')[0]}
                value={form.check_out}
                onChange={handleChange}
                className="w-full rounded-xl border px-3 py-2 pl-9 rtl:pl-3 rtl:pr-9"
              />
            </div>
            <div className="flex items-center relative">
              <UserIcon className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="number"
                name="guests"
                min="1"
                value={form.guests}
                onChange={handleChange}
                className="w-full md:w-20 rounded-xl border px-3 py-2 pl-9 rtl:pl-3 rtl:pr-9"
              />
            </div>
            <div className="flex items-center relative">
              <UserIcon className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="number"
                name="rooms"
                min="1"
                value={form.rooms}
                onChange={handleChange}
                className="w-full md:w-20 rounded-xl border px-3 py-2 pl-9 rtl:pl-3 rtl:pr-9"
              />
            </div>
          </>
        )}

        <button
          className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-xl hover:from-blue-600 text-white font-bold rounded-xl px-6 py-2 flex items-center gap-2 transition-all duration-300 ease-in-out w-full md:w-auto"
          type="submit"
        >
          <SearchIcon className="w-5 h-5" />
          {t('search')}
        </button>
      </div>
    </form>
  );
}
