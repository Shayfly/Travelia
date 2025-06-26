import { useState } from 'react';
import useTranslation from '../hooks/useTranslation';
import FlightIcon from './FlightIcon';
import CalendarIcon from './CalendarIcon';
import UserIcon from './UserIcon';
import SearchIcon from './SearchIcon';
import { airports } from '../utils/airports';

export default function HeroSearchBar({ onSearch }) {
  const t = useTranslation();
  const [form, setForm] = useState({
    from: '',
    to: '',
    depart: '',
    return: '',
    passengers: 1,
  });
  const [suggestions, setSuggestions] = useState({ from: [], to: [] });

  const updateAirport = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (value) {
      const q = value.toLowerCase();
      setSuggestions((prev) => ({
        ...prev,
        [field]: airports
          .filter(
            (a) =>
              a.city.toLowerCase().includes(q) ||
              a.code.toLowerCase().includes(q)
          )
          .slice(0, 5),
      }));
    } else {
      setSuggestions((prev) => ({ ...prev, [field]: [] }));
    }
  };

  const selectAirport = (field, airport) => {
    setForm((prev) => ({ ...prev, [field]: `${airport.city} (${airport.code})` }));
    setSuggestions((prev) => ({ ...prev, [field]: [] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'from' || name === 'to') {
      updateAirport(name, value);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch({ type: 'flight', data: form });
  };

  return (
    <form onSubmit={submit} className="max-w-4xl mx-auto mt-16 px-4">
      <div className="flex flex-col md:flex-row gap-4 p-4 rounded-2xl bg-white shadow-lg items-center rtl:md:flex-row-reverse">
        <div className="relative flex-1">
          <FlightIcon className="w-5 h-5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            name="from"
            value={form.from}
            onChange={handleChange}
            placeholder={`${t('from')} (TLV)`}
            className="w-full rounded-xl border px-3 py-3 pl-10"
          />
          {suggestions.from.length > 0 && (
            <ul className="absolute z-10 bg-white border shadow rounded-b-xl left-0 right-0 top-full">
              {suggestions.from.map((a) => (
                <li
                  key={a.code}
                  className="flex justify-between px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectAirport('from', a)}
                >
                  <span>
                    {a.flag} {a.city}
                  </span>
                  <span className="text-sm text-gray-500">{a.code}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="relative flex-1">
          <FlightIcon className="w-5 h-5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            name="to"
            value={form.to}
            onChange={handleChange}
            placeholder={`${t('to')} (LHR)`}
            className="w-full rounded-xl border px-3 py-3 pl-10"
          />
          {suggestions.to.length > 0 && (
            <ul className="absolute z-10 bg-white border shadow rounded-b-xl left-0 right-0 top-full">
              {suggestions.to.map((a) => (
                <li
                  key={a.code}
                  className="flex justify-between px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectAirport('to', a)}
                >
                  <span>
                    {a.flag} {a.city}
                  </span>
                  <span className="text-sm text-gray-500">{a.code}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="relative">
          <CalendarIcon className="w-5 h-5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="date"
            name="depart"
            value={form.depart}
            onChange={handleChange}
            className="rounded-xl border px-3 py-3 pl-10"
          />
        </div>
        <div className="relative">
          <CalendarIcon className="w-5 h-5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="date"
            name="return"
            value={form.return}
            onChange={handleChange}
            className="rounded-xl border px-3 py-3 pl-10"
          />
        </div>
        <div className="relative w-24">
          <UserIcon className="w-5 h-5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="number"
            name="passengers"
            min="1"
            value={form.passengers}
            onChange={handleChange}
            className="w-full rounded-xl border px-3 py-3 pl-10"
          />
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white font-bold rounded-xl px-6 py-3 hover:bg-blue-700 transition w-full md:w-auto" type="submit">
          <SearchIcon className="w-5 h-5" />
          {t('search')}
        </button>
      </div>
    </form>
  );
}
