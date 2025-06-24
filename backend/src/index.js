import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import flightsRouter from './routes/flights.js';
import hotelsRouter from './routes/hotels.js';
import dealsRouter from './routes/deals.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/flights', flightsRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/deals', dealsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
