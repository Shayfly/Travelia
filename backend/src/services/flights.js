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

export async function getFlights(params) {
  const { data } = await axios.get('https://api.travelpayouts.com/v1/prices/monthly', {
    params: { ...params, token: process.env.TRAVELPAYOUTS_API_KEY },
  });
  return data;
}

export async function searchFlights(params) {
  const { data } = await axios.get(
    'https://api.travelpayouts.com/aviasales/v3/prices_for_dates',
    {
      params: { ...params, token: process.env.TRAVELPAYOUTS_API_KEY },
    },
  );
  return data;
}
