import airports from '../data/airports.json';

export const hebrewToIata = airports.reduce((acc, a) => {
  acc[a.city_he] = a.code;
  acc[a.city_en.toLowerCase()] = a.code;
  return acc;
}, {});

export function mapToIata(value) {
  const trimmed = value.trim();
  const match = trimmed.match(/\(([^)]+)\)$/);
  if (match) return match[1];
  const lower = trimmed.toLowerCase();
  return hebrewToIata[trimmed] || hebrewToIata[lower] || trimmed;
}
