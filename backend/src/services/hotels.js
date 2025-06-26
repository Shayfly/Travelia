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
const PARTNER_ID = process.env.TRAVELPAYOUTS_MARKER || '640704';

export async function getHotels(params) {
  const {
    city,
    check_in,
    check_out,
    guests = 1,
    rooms = 1,
    currency = 'USD',
    locale = 'en',
    limit = 20,
  } = params;

  const { data } = await axios.get(
    'https://engine.hotellook.com/api/v2/cache.json',
    {
      params: {
        location: city,
        checkIn: check_in,
        checkOut: check_out,
        adults: guests,
        rooms,
        currency,
        language: locale,
        limit,
        partnerId: PARTNER_ID,
        token: API_TOKEN,
      },
    },
  );

  return data;
}
