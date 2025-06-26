import airports from '../data/airports.json';

export const hebrewToIata = airports.reduce((acc, a) => {
  acc[a.he] = a.iata;
  acc[a.en.toLowerCase()] = a.iata;
  return acc;
}, {});

export function mapToIata(value) {
  const trimmed = value.trim();
  const match = trimmed.match(/\(([^)]+)\)$/);
  if (match) return match[1];
  const lower = trimmed.toLowerCase();
  return hebrewToIata[trimmed] || hebrewToIata[lower] || trimmed;
}
