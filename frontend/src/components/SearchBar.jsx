import { useState } from 'react';
import useTranslation from '../hooks/useTranslation';

export default function SearchBar({ onSearch, className = '' }) {
  const t = useTranslation();

  // מבנה שדות גמיש לכל טאב
  const fieldsConfig = {
    flights: [
      { name: 'from', type: 'text', label: t('from'), required: true },
      { name: 'to', type: 'text', label: t('to'), required: true },
      { name: 'depart', type: 'date', label: t('depart'), required: true },
      { name: 'return', type: 'date', label: t('return') },
      { name: 'passengers', type: 'number', label: t('passengers'), min: 1, required: true },
    ],
    hotels: [
      { name: 'city', type: 'text', label: t('hotel_city'), required: true },
      { name: 'check_in', type: 'date', label: t('check_in'), required: true },
      { name: 'check_out', type: 'date', label: t('check_out'), required: true },
      { name: 'guests', type: 'number', label: t('guests'), min: 1, required: true },
      { name: 'rooms', type: 'number', label: t('rooms'), min: 1, required: true },
    ],
  };

  const [tab, setTab] = useState('flights');
  const [form, setForm] = useState({
    flights: Object.fromEntries(fieldsConfig.flights.map(f => [f.name, f.type === 'number' ? 1 : ''])),
    hotels: Object.fromEntries(fieldsConfig.hotels.map(f => [f.name, f.type === 'number' ? 1 : ''])),
  });
  const [errors, setErrors] = useState({});

  const fields = fieldsConfig[tab];

  // שינוי שדה
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        [name]: type === 'number' ? Number(value) : value,
      }
    }));
  };

  // ולידציה דינמית
  const validate = () => {
    const curr = form[tab];
    const currFields = fields;
    const newErrors = {};
    currFields.forEach(f => {
      const val = curr[f.name];
      if (f.required && (!val || (f.type === 'text' && val.trim() === ''))) newErrors[f.name] = t('missing_fields');
      if (f.type === 'number' && val && Number(val) < (f.min || 0)) newErrors[f.name] = t('invalid_numbers');
    });
    // בדיקות ייחודיות לסוג
    if (tab === 'flights' && curr.return && curr.depart && new Date(curr.return) < new Date(curr.depart))
      newErrors['return'] = t('invalid_dates');
    if (tab === 'hotels' && curr.check_out && curr.check_in && new Date(curr.check_out) <= new Date(curr.check_in))
      newErrors['check_out'] = t('invalid_dates');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // חיפוש
  const handleSearch = (e) => {
    e.preventDefault();
    if (validate()) {
      onSearch?.({ type: tab, data: form[tab] });
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* טאבים */}
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
      {/* טופס דינמי */}
      <form onSubmit={handleSearch} className="space-y-2">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {fields.map(f => (
            <div key={f.name} className="flex flex-col">
              <input
                type={f.type}
                name={f.name}
                min={f.min}
                value={form[tab][f.name]}
                onChange={handleChange}
                placeholder={f.label}
                className="border p-2 w-full"
              />
              {errors[f.name] && (
                <span className="text-red-600 text-sm">{errors[f.name]}</span>
              )}
            </div>
          ))}
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          {tab === 'flights' ? t('search_flights') : t('search_hotels')}
        </button>
      </form>
    </div>
  );
}
