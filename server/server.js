const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const postRoutes = require("./routes/postRoutes");
const authRoutes = require('./routes/auth');


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/posts", postRoutes);
app.use('/api/auth', authRoutes);


// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1);
});



// Dummy user (replace with DB in real apps)
const adminUser = {
  email: process.env.ADMIN_EMAIL,
  passwordHash: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
};

// Auth Route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (email !== adminUser.email) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, adminUser.passwordHash);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Protected Route
app.get("/api/profile", authenticateToken, (req, res) => {
  res.json({ email: req.user.email });
});

// JWT Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
