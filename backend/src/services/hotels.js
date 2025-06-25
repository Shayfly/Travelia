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

export async function getHotels(params) {
  const { data } = await axios.get('https://api.travelpayouts.com/v1/prices/hotel-offers', {
    params: { ...params, token: process.env.TRAVELPAYOUTS_API_KEY },
  });
  return data;
}
