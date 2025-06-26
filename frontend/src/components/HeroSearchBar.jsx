import { useState } from 'react';
import useTranslation from '../hooks/useTranslation';
import FlightIcon from './FlightIcon';
import CalendarIcon from './CalendarIcon';
import UserIcon from './UserIcon';
import SwapIcon from './SwapIcon';
import SearchIcon from './SearchIcon';
import AirportAutocomplete from './AirportAutocomplete';

export default function HeroSearchBar({ onSearch }) {
  const t = useTranslation();
  const [form, setForm] = useState({
    from: '',
    to: '',
    depart: '',
    return: '',
    passengers: 1,
  });
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
    if (onSearch) onSearch({ type: 'flight', data: form });
  };

  return (
    <form onSubmit={submit} className="max-w-3xl mx-auto mt-4">
      <div className="flex flex-col md:flex-row gap-3 p-4 rounded-2xl bg-white shadow items-center rtl:md:flex-row-reverse">
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
        <div className="flex-1 flex items-center gap-2 rtl:flex-row-reverse">
          <FlightIcon className="w-5 h-5 text-blue-500" />
          <AirportAutocomplete
            name="from"
            value={form.from}
            onChange={handleChange}
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
            value={form.to}
            onChange={handleChange}
            placeholder={t('to_placeholder')}
            className="flex-1 rounded-xl border px-3 py-2"
          />
        </div>
        <div className="flex items-center gap-2 rtl:flex-row-reverse">
          <CalendarIcon className="w-5 h-5 text-blue-500" />
          <input
            type="date"
            name="depart"
            value={form.depart}
            onChange={handleChange}
            className="rounded-xl border px-3 py-2"
          />
        </div>
        <div className="flex items-center gap-2 rtl:flex-row-reverse">
          <CalendarIcon className="w-5 h-5 text-blue-500" />
          <input
            type="date"
            name="return"
            value={form.return}
            onChange={handleChange}
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
            value={form.passengers}
            onChange={handleChange}
            className="w-20 rounded-xl border px-3 py-2"
          />
        </div>
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
