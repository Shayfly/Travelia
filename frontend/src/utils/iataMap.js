export const hebrewToIata = {
  'תל אביב': 'TLV',
  'חיפה': 'HFA',
  'אילת': 'ETH',
  'לונדון': 'LON',
  'ניו יורק': 'NYC',
};

export function mapToIata(value) {
  const trimmed = value.trim();
  const match = trimmed.match(/\(([^)]+)\)$/);
  if (match) return match[1];
  return hebrewToIata[trimmed] || trimmed;
}
