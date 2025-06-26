import { Router } from 'express';
import { getHotels } from '../services/hotels.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const data = await getHotels(req.query);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch hotels' });
  }
});

export default router;
