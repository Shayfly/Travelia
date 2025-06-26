module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const token = process.env.TRAVELPAYOUTS_API_KEY || '8349af28ce9d95c3ee1635cc7729cc09';
  const marker = process.env.TRAVELPAYOUTS_MARKER || '640704';
  const searchParams = new URLSearchParams({ ...req.query, marker, token });
  const url = `https://api.travelpayouts.com/v1/prices/monthly?${searchParams.toString()}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch flights' });
  }
};
