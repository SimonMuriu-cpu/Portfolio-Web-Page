// server/routes/authRoutes.js
import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Admin credentials from .env
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;   // hardcoded for token payload
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

// JWT middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Login endpoint - improved validation
router.post('/login', (req, res) => {
  const { password } = req.body;

  // Check if password is provided
  if (!password) {
    return res.status(400).json({ 
      success: false,
      message: 'Password is required' 
    });
  }

  // Validate password
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ 
      success: false,
      message: 'Unauthorized: Invalid password' 
    });
  }

  // Create token with hardcoded email + role
  const token = jwt.sign(
    { role: 'admin', email: ADMIN_EMAIL },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ 
    success: true,
    message: 'Login successful',
    token 
  });
});

// Profile endpoint (protected)
router.get('/profile', authenticateToken, (req, res) => {
  res.json({ 
    success: true,
    email: req.user.email, 
    role: req.user.role 
  });
});

export default router;