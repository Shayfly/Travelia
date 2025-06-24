export async function fetchDeals(params) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`/api/deals?${query}`);
  return res.json();
}
