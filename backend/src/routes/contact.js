import { Router } from 'express';
import nodemailer from 'nodemailer';

const router = Router();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_TO || process.env.SMTP_USER,
      subject: `Contact form message from ${name}`,
      text: `${message}\n\nFrom: ${email}`,
    });
    res.json({ status: 'ok' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

export default router;
