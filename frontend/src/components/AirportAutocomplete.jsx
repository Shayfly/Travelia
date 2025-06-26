import { useState, useEffect, useRef } from 'react';
import airports from '../assets/airports.json';
import useTranslation from '../hooks/useTranslation';

export default function AirportAutocomplete({ name, value, onChange, placeholder, className = 'w-full rounded-xl border px-3 py-2 pl-9' }) {
  const t = useTranslation();
  const [query, setQuery] = useState(value || '');
  const [results, setResults] = useState([]);
  const [active, setActive] = useState(-1);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setQuery(value || '');
  }, [value]);

  useEffect(() => {
    if (query && query.length >= 2) {
      const lower = query.toLowerCase();
      const filtered = airports.filter(a =>
        a.city.toLowerCase().includes(lower) ||
        a.code.toLowerCase().includes(lower) ||
        (a.name && a.name.toLowerCase().includes(lower)) ||
        (a.hebrew_city && a.hebrew_city.includes(query))
      ).slice(0, 10);
      setResults(filtered);
      setOpen(true);
    } else {
      setResults([]);
      setOpen(false);
    }
    setActive(-1);
  }, [query]);

  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const onInputChange = (e) => {
    setQuery(e.target.value);
    onChange && onChange(e);
  };

  const select = (airport) => {
    const val = `${airport.city} (${airport.code})`;
    setQuery(val);
    setOpen(false);
    onChange && onChange({ target: { name, value: val } });
  };

  const onKeyDown = (e) => {
    if (!open) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && active >= 0) {
      e.preventDefault();
      select(results[active]);
    }
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <input
        autoComplete="off"
        name={name}
        value={query}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={className}
      />
      {open && (
        <ul className="absolute z-10 w-full bg-white border rounded shadow mt-1 max-h-60 overflow-auto rtl:right-0 rtl:text-right">
          {results.length === 0 && (
            <li className="p-2 text-gray-500">{t('no_results')}</li>
          )}
          {results.map((a, idx) => (
            <li
              key={`${a.code}-${idx}`}
              onClick={() => select(a)}
              className={`p-2 cursor-pointer hover:bg-blue-50 ${idx === active ? 'bg-blue-100' : ''}`}
            >
              <span className="font-semibold">{a.city}</span> ({a.code})
              {a.name ? ` — ${a.name}` : ''}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
