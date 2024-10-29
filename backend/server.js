// backend/server.js
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const claimsRoutes = require("./routes/claims");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the React app (make sure the path is correct)
app.use(express.static(path.join(__dirname, 'frontend/dist'))); // Use 'build' if that's where your output goes

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/claims", claimsRoutes);

// The catchall handler: for any request that doesn't match one above, send back the React app.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html')); // Adjust to 'build' if necessary
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
