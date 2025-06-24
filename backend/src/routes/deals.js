import { Router } from 'express';
import { getDeals } from '../services/deals.js';

const router = Router();

router.get('/', async (req, res) => {
  const data = await getDeals(req.query);
  res.json(data);
});

export default router;
