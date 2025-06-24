import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  return (
    <div className="flex gap-2">
      <input
        className="border p-2 flex-1"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button className="bg-blue-600 text-white px-4" onClick={() => onSearch(query)}>
        Go
      </button>
    </div>
  );
}
