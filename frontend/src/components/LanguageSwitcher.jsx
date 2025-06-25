import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="text-black p-1 rounded"
    >
      <option value="he">HE</option>
      <option value="en">EN</option>
    </select>
  );
}
