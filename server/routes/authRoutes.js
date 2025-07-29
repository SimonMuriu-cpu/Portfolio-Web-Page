import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Admin credentials from .env
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

// Login endpoint
router.post('/login', (req, res) => {
  const { password } = req.body;

  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Unauthorized: Invalid password' });
  }

  // Create token
  const token = jwt.sign(
    { role: 'admin', email: ADMIN_EMAIL },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

export default router;
