export async function fetchFlights({ origin, destination, depart_date, return_date, currency = "USD" }) {
  const token = "8349af28ce9d95c3ee1635cc7729cc09"; // Travelpayouts API token שלך

  const url = `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=${origin}&destination=${destination}&depart_date=${depart_date}&return_date=${return_date}&currency=${currency}&token=${token}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch flights");
    }

    const result = await response.json();

    // החזר נתונים מעובדים
    return {
      data: result.data || [],
    };
  } catch (error) {
    console.error("Flight API error:", error.message);
    return {
      data: [],
      error: "Unable to load flights",
    };
  }
}
