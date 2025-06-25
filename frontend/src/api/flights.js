const API_TOKEN = import.meta.env.VITE_TRAVELPAYOUTS_API_KEY;
const MARKER = import.meta.env.VITE_TRAVELPAYOUTS_MARKER;

export async function fetchFlights(params) {
  const query = new URLSearchParams({ ...params, marker: MARKER }).toString();
  const res = await fetch(
    `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?${query}`,
    {
      headers: { 'X-Access-Token': API_TOKEN },
    },
  );
  return res.json();
}

export async function fetchMonthlyFlights(params) {
  const query = new URLSearchParams({ ...params, marker: MARKER }).toString();
  const res = await fetch(
    `https://api.travelpayouts.com/v1/prices/monthly?${query}`,
    {
      headers: { 'X-Access-Token': API_TOKEN },
    },
  );
  return res.json();
}
