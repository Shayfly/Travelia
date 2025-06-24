import axios from 'axios';

export async function getFlights(params) {
  try {
    const { data } = await axios.get(
      'https://api.travelpayouts.com/v1/prices/monthly',
      {
        params: { ...params, token: process.env.TRAVELPAYOUTS_API_KEY },
      }
    );
    return data;
  } catch (err) {
    return { data: [] };
  }
}

