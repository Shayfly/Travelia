export const hebrewToIata = {
  'תל אביב': 'TLV',
  'חיפה': 'HFA',
  'אילת': 'ETH',
  'לונדון': 'LON',
  'ניו יורק': 'NYC',
};

export function mapToIata(value) {
  const trimmed = value.trim();
  return hebrewToIata[trimmed] || trimmed;
}
