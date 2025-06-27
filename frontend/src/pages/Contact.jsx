import { useState } from 'react';
import useTranslation from '../hooks/useTranslation';
import { sendContact } from '../api/contact';
import SEO from '../components/SEO';

export default function Contact() {
  const t = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await sendContact(form);
      setSent(true);
    } catch {
      setError('Failed to send message');
    }
  };

  return (
    <>
      <SEO title={t('contact')} description="Contact Travelia" />
      <div className="space-y-4 max-w-md mx-auto px-4">
      <h2 className="text-xl font-bold">{t('contact')}</h2>
      {sent ? (
        <p className="text-green-600">{t('message')}</p>
      ) : (
        <form onSubmit={submit} className="space-y-2">
          <input className="border p-2 w-full" name="name" onChange={handleChange} placeholder={t('name')} required />
          <input className="border p-2 w-full" name="email" type="email" onChange={handleChange} placeholder={t('email')} required />
          <textarea className="border p-2 w-full" name="message" onChange={handleChange} placeholder={t('message')} required />
          <button className="bg-primary text-white px-4 py-2" type="submit">{t('send')}</button>
          {error && <p className="text-red-600">{error}</p>}
        </form>
      )}
      </div>
    </>
  );
}
