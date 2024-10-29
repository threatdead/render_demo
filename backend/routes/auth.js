// backend/routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const router = express.Router();

const usersFilePath = ("./users.json");
const secret = "XYZ";

// Ensure users.json exists
if (!fs.existsSync(usersFilePath)) {
  fs.writeFileSync(usersFilePath, JSON.stringify([]));
}

// Register route (no bcrypt)
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  const users = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));
  const existingUser = users.find(user => user.email === email);

  if (existingUser) return res.status(400).json({ message: "User already exists." });

  const newUser = { id: String(users.length + 1), name, email, password, role: "user" };

  users.push(newUser);
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

  res.status(201).json({ message: "User registered successfully." });
});

// Login route (no bcrypt)
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));
  const user = users.find(user => user.email === email && user.password === password);

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password." });
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, secret, { expiresIn: "1h" });
  res.json({ token });
});

module.exports = router;
