export async function fetchHotels(params) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`/api/hotels?${query}`);
  if (!res.ok) throw new Error('Network error');
  return res.json();
}
