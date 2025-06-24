export async function fetchHotels(params) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`/api/hotels?${query}`);
  return res.json();
}
