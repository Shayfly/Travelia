import airports from '../data/airports.json';

export const hebrewToCity = airports.reduce((acc, a) => {
  acc[a.he] = a.en;
  acc[a.en.toLowerCase()] = a.en;
  return acc;
}, {});

export function mapToCity(value) {
  const trimmed = value.trim();
  const match = trimmed.match(/\(([^)]+)\)$/);
  if (match) return match[1];
  const lower = trimmed.toLowerCase();
  return hebrewToCity[trimmed] || hebrewToCity[lower] || trimmed;
}
