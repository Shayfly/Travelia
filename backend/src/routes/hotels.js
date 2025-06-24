import { Router } from 'express';
import { getHotels } from '../services/hotels.js';

const router = Router();

router.get('/', async (req, res) => {
  const data = await getHotels(req.query);
  res.json(data);
});

export default router;
