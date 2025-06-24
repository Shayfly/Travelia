import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchFlights } from '../api/flights';
import { DealsContext } from '../contexts/DealsContext';

export default function Flights() {
  const { t } = useTranslation();
  const { addDeal } = useContext(DealsContext);
  const [form, setForm] = useState({ from: '', to: '', depart: '', return: '', passengers: 1 });
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const search = async () => {
    try {
      setError('');
      setResults([]);
      const data = await fetchFlights(form);
      if (!data?.data?.length) setError(t('flight_results') + ': 0');
      else setResults(data.data);
    } catch {
      setError('Error');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{t('flights')}</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        <input className="border p-2" name="from" onChange={handleChange} placeholder={t('from')} />
        <input className="border p-2" name="to" onChange={handleChange} placeholder={t('to')} />
        <input className="border p-2" type="date" name="depart" onChange={handleChange} />
        <input className="border p-2" type="date" name="return" onChange={handleChange} />
        <input className="border p-2" type="number" name="passengers" min="1" onChange={handleChange} placeholder={t('passengers')} />
      </div>
      <button className="bg-blue-600 text-white px-4 py-2" onClick={search}>{t('search')}</button>
      {error && <p className="text-red-600">{error}</p>}
      <ul className="space-y-2">
        {results.map((f, i) => (
          <li key={i} className="border p-2 flex justify-between items-center">
            <span>{f.airline} - {f.price}</span>
            <button className="bg-green-600 text-white px-2" onClick={() => addDeal(f, null)}>{t('add_deal')}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
