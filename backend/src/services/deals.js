import { getFlights } from './flights.js';
import { getHotels } from './hotels.js';

export async function getDeals(params) {
  const flights = await getFlights(params);
  const hotels = await getHotels(params);
  return { flights, hotels };
}
