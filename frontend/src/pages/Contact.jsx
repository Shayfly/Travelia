import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">{t('contact')}</h2>
      {sent ? (
        <p className="text-green-600">{t('message')}</p>
      ) : (
        <form onSubmit={submit} className="space-y-2">
          <input className="border p-2 w-full" name="name" onChange={handleChange} placeholder={t('name')} required />
          <input className="border p-2 w-full" name="email" type="email" onChange={handleChange} placeholder={t('email')} required />
          <textarea className="border p-2 w-full" name="message" onChange={handleChange} placeholder={t('message')} required />
          <button className="bg-blue-600 text-white px-4 py-2" type="submit">{t('send')}</button>
        </form>
      )}
    </div>
  );
}
