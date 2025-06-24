export async function fetchFlights(params) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`/api/flights?${query}`);
  return res.json();
}
