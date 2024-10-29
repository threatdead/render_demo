// backend/server.js
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const claimsRoutes = require("./routes/claims");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/claims", claimsRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
