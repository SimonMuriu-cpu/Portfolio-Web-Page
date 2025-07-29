// server/routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'dev_password';
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

router.post('/login', (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Unauthorized: Incorrect password' });
  }

  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;
