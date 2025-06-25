import { Router } from 'express';
import { getDeals } from '../services/deals.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.get('/', asyncHandler(async (req, res) => {
  const data = await getDeals(req.query);
  res.json(data);
}));

export default router;
