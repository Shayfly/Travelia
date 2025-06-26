export function formatPrice(value, currency = 'USD') {
  if (value === undefined || value === null) return '';
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(Number(value));
}
