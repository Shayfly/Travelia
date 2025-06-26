export async function fetchHotels({ city, check_in, check_out, guests, rooms, currency }) {
  const token = "8349af28ce9d95c3ee1635cc7729cc09"; // הטוקן שלך

  const url = `https://engine.hotellook.com/api/v2/cache.json?location=${encodeURIComponent(city)}&checkIn=${check_in}&checkOut=${check_out}&adults=${guests}&rooms=${rooms}&currency=${currency}&limit=10&token=${token}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch hotel data');

  const hotels = await response.json();

  return {
    data: hotels.map(h => ({
      name: h.hotelName,
      address: h.address,
      price: h.priceAvg,
      photo: h.photo || null,
      link: `https://www.hotellook.com/?marker=640704&hotelId=${h.hotelId}`,
    }))
  };
}
