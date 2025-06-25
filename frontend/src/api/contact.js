export async function sendContact(form) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
  if (!res.ok) {
    throw new Error('Failed to send');
  }
  return res.json();
}
