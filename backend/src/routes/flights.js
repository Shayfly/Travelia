import { Router } from 'express';
import { getFlights, searchFlights } from '../services/flights.js';

const router = Router();

router.get('/', async (req, res) => {
  const data = await searchFlights(req.query);
  res.json(data);
});

router.get('/monthly', async (req, res) => {
  const data = await getFlights(req.query);
  res.json(data);
});

export default router;
