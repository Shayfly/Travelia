export async function fetchDeals(params) {
  const query = new URLSearchParams(params).toString();
  try {
    const res = await fetch(`/api/deals?${query}`);
    return await res.json();
  } catch {
    return { flights: { data: [] }, hotels: { data: [] } };
  }
}

