export const airportCodes = {
  'ישראל': 'TLV',
  'תל אביב': 'TLV',
  'tlv': 'TLV',
  'רומניה': 'OTP',
  'בוקרשט': 'OTP',
  'otp': 'OTP',
  'טורקיה': 'IST',
  'איסטנבול': 'IST',
  'ist': 'IST',
  'אנגליה': 'LON',
  'לונדון': 'LON',
  'lon': 'LON',
  'יוון': 'ATH',
  'אתונה': 'ATH',
  'ath': 'ATH',
  'איטליה': 'ROM',
  'רומא': 'ROM',
  'rom': 'ROM',
  'צרפת': 'PAR',
  'פריז': 'PAR',
  'par': 'PAR'
};

export function toIataCode(value) {
  if (!value) return null;
  const key = String(value).trim().toLowerCase();
  return airportCodes[key] || null;
}
