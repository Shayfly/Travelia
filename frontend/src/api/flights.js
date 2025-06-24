export async function fetchFlights(params) {
  const query = new URLSearchParams(params).toString();
  try {
    const res = await fetch(`/api/flights?${query}`);
    return await res.json();
  } catch {
    return { data: [] };
  }
}

