import { Router } from 'express';
import { getFlights, searchFlights } from '../services/flights.js';

const router = Router();

router.get('/', async (req, res) => {
  const results = await searchFlights(req.query);
  res.json(results);
});

router.get('/monthly', async (req, res) => {
  const results = await getFlights(req.query);
  res.json(results);
});

export default router;
