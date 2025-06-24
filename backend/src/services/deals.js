import { getFlights } from './flights.js';
import { getHotels } from './hotels.js';

export async function getDeals(params) {
  try {
    const flights = await getFlights(params);
    const hotels = await getHotels(params);
    return { flights, hotels };
  } catch (err) {
    return { flights: { data: [] }, hotels: { data: [] } };
  }
}

