export function combineDeals(flights, hotels) {
  return flights.map((f, i) => ({ ...f, hotel: hotels[i] }));
}
