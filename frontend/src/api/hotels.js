export async function fetchHotels(params) {
  const query = new URLSearchParams(params).toString();
  try {
    const res = await fetch(`/api/hotels?${query}`);
    return await res.json();
  } catch {
    return { data: [] };
  }
}

