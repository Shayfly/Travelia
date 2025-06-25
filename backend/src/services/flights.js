import axios from 'axios';

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
