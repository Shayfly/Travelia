import axios from 'axios';

/*
Sample Travelpayouts hotel response:
{
  "status": true,
  "data": [
    {
      "name": "Hotel Example",
      "price": 80,
      "rating": 4.5,
      "photo": "https://example.com/image.jpg",
      "link": "https://example.com"
    }
  ]
}
*/

const API_TOKEN = process.env.TRAVELPAYOUTS_API_KEY ||
  '8349af28ce9d95c3ee1635cc7729cc09';
const MARKER = process.env.TRAVELPAYOUTS_MARKER || '640704';

export async function getHotels(params) {
  const { data } = await axios.get(
    'https://api.travelpayouts.com/v1/prices/hotel-offers',
    {
      params: { ...params, marker: MARKER, token: API_TOKEN },
    },
  );
  return data;
}
