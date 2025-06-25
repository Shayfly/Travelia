import { Router } from 'express';
import { getFlights } from '../services/flights.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.get('/', asyncHandler(async (req, res) => {
  const data = await getFlights(req.query);
  res.json(data);
}));

export default router;
