export const hebrewToCity = {
  'תל אביב': 'Tel Aviv',
  'חיפה': 'Haifa',
  'אילת': 'Eilat',
  'לונדון': 'London',
  'ניו יורק': 'New York',
};

export function mapToCity(value) {
  const trimmed = value.trim();
  const match = trimmed.match(/\(([^)]+)\)$/);
  if (match) return match[1];
  return hebrewToCity[trimmed] || trimmed;
}
