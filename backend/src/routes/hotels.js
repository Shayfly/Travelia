import { Router } from 'express';
import { getHotels } from '../services/hotels.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.get('/', asyncHandler(async (req, res) => {
  const data = await getHotels(req.query);
  res.json(data);
}));

export default router;
