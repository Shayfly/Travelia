import { Router } from 'express';
import { getFlights } from '../services/flights.js';

const router = Router();

router.get('/', async (req, res) => {
  const data = await getFlights(req.query);
  res.json(data);
});

export default router;
