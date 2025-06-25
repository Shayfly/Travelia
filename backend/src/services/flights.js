import axios from 'axios';
import { toIataCode } from '../utils/airportCodes.js';

function normalizeParams(params = {}) {
  const normalized = { ...params };
  if (params.origin) {
    const code = toIataCode(params.origin);
    if (code) normalized.origin = code;
  }
  if (params.destination) {
    const code = toIataCode(params.destination);
    if (code) normalized.destination = code;
  }
  return normalized;
}

export async function getFlights(params) {
  const normalized = normalizeParams(params);
  const { data } = await axios.get('https://api.travelpayouts.com/v1/prices/monthly', {
    params: { ...normalized, token: process.env.TRAVELPAYOUTS_API_KEY },
  });
  return data;
}

export async function searchFlights(params) {
  const normalized = normalizeParams(params);
  const { data } = await axios.get(
    'https://api.travelpayouts.com/aviasales/v3/prices_for_dates',
    {
      params: { ...normalized, token: process.env.TRAVELPAYOUTS_API_KEY },
    },
  );
  return data;
}
