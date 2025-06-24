import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const { t } = useTranslation();
  return (
    <div className="flex gap-2">
      <input
        className="border p-2 flex-1"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t('search')}
      />
      <button className="bg-blue-600 text-white px-4" onClick={() => onSearch(query)}>
        {t('search')}
      </button>
    </div>
  );
}
