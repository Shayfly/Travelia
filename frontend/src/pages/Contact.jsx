import { useState, useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

export default function Contact() {
  const { t } = useContext(LanguageContext);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSuccess(true);
  };

  return (
    <div className="p-4 space-y-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold">{t('contact')}</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          className="border p-2 w-full"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder={t('name')}
          required
        />
        <input
          className="border p-2 w-full"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder={t('email')}
          required
        />
        <textarea
          className="border p-2 w-full"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder={t('message')}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          {t('send')}
        </button>
      </form>
      {success && <p className="text-green-600">Thanks! We will contact you soon.</p>}
    </div>
  );
}


