import { useState } from 'react';
import useTranslation from '../hooks/useTranslation';

/**
 * Reusable search bar for flights and hotels.
 *
 * @param {Object} props
 * @param {('flights'|'hotels')} [props.type='flights'] - preset field group
 * @param {Array} [props.fields] - custom field configuration
 * @param {Function} props.onSearch - callback invoked with form values
 * @param {string} [props.className] - additional wrapper classes
 */
export default function SearchBar({ type = 'flights', fields, onSearch, className = '' }) {
  const t = useTranslation();

  const defaultFields = {
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

  const fieldsToUse = fields?.length ? fields : defaultFields[type] || [];

  const [form, setForm] = useState(() => {
    const init = {};
    fieldsToUse.forEach((f) => {
      init[f.name] = f.defaultValue || (f.type === 'number' ? 1 : '');
    });
    return init;
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    fieldsToUse.forEach((f) => {
      const val = form[f.name];
      if (f.required && !val) newErrors[f.name] = `${f.label} required`;
      if (f.type === 'number' && val && Number(val) < (f.min || 0)) {
        newErrors[f.name] = `${f.label} ≥ ${f.min || 0}`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSearch = () => {
    if (validate() && onSearch) onSearch(form);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {fieldsToUse.map((f) => (
          <div key={f.name} className="flex flex-col">
            <input
              type={f.type}
              name={f.name}
              min={f.min}
              value={form[f.name]}
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
      <button className="bg-blue-600 text-white px-4 py-2" onClick={handleSearch}>
        {t('search')}
      </button>
    </div>
  );
}
