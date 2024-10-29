// backend/server.js
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const claimsRoutes = require("./routes/claims");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'frontend/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
  });
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/claims", claimsRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
