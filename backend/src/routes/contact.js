import { Router } from 'express';
import nodemailer from 'nodemailer';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

router.post('/', asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.CONTACT_TO || process.env.SMTP_USER,
    subject: `Contact form submission from ${name}`,
    replyTo: email,
    text: message,
  });
  res.json({ status: 'ok' });
}));

export default router;
