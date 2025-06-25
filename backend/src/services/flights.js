import axios from 'axios';

/*
Sample Travelpayouts flight response:
{
  "success": true,
  "data": [
    {
      "airline": "W6",
      "price": 120,
      "departure_at": "2024-07-10T09:00:00Z",
      "return_at": "2024-07-20T16:00:00Z",
      "transfers": 0,
      "link": "https://example.com"
    }
  ]
}
*/

const API_TOKEN = process.env.TRAVELPAYOUTS_API_KEY ||
  '8349af28ce9d95c3ee1635cc7729cc09';
const MARKER = process.env.TRAVELPAYOUTS_MARKER || '640704';

export async function getFlights(params) {
  const { data } = await axios.get(
    'https://api.travelpayouts.com/v1/prices/monthly',
    {
      params: { ...params, marker: MARKER },
      headers: { 'X-Access-Token': API_TOKEN },
    },
  );
  return data;
}

export async function searchFlights(params) {
  const { data } = await axios.get(
    'https://api.travelpayouts.com/aviasales/v3/prices_for_dates',
    {
      params: { ...params, marker: MARKER },
      headers: { 'X-Access-Token': API_TOKEN },
    },
  );
  return data;
}
