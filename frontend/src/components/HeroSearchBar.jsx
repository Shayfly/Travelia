import { useState } from 'react';
import useTranslation from '../hooks/useTranslation';
import FlightIcon from './FlightIcon';
import CalendarIcon from './CalendarIcon';
import UserIcon from './UserIcon';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch({ type: 'flight', data: form });
  };

  return (
    <form onSubmit={submit} className="max-w-3xl mx-auto mt-4">
      <div className="flex flex-col md:flex-row gap-3 p-4 rounded-2xl bg-white shadow items-center rtl:md:flex-row-reverse">
        <div className="flex-1 flex items-center gap-2 rtl:flex-row-reverse">
          <FlightIcon className="w-5 h-5 text-blue-500" />
          <AirportAutocomplete
            name="from"
            value={form.from}
            onChange={handleChange}
            placeholder={`${t('from')} (TLV)`}
            className="flex-1 rounded-xl border px-3 py-2"
          />
        </div>
        <div className="flex-1 flex items-center gap-2 rtl:flex-row-reverse">
          <FlightIcon className="w-5 h-5 text-blue-500" />
          <AirportAutocomplete
            name="to"
            value={form.to}
            onChange={handleChange}
            placeholder={`${t('to')} (LHR)`}
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
            className="rounded-xl border px-3 py-2"
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
        <button className="bg-blue-600 text-white font-bold rounded-xl px-6 py-2 hover:bg-blue-700 transition w-full md:w-auto" type="submit">
          {t('search')}
        </button>
      </div>
    </form>
  );
}
