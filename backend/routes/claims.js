// backend/routes/claims.js
const express = require("express");
const fs = require("fs");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

const claimsFilePath = "C:/Users/nishi/Documents/sds_demo/backend/data/claims.json";

// Get all claims for the logged-in user
router.get("/", authMiddleware, (req, res) => {
  const claims = JSON.parse(fs.readFileSync(claimsFilePath, "utf8"));
  const userClaims = claims.filter((claim) => claim.userId === req.user.id);
  res.json(userClaims);
});

// Submit a new claim
router.post("/", authMiddleware, (req, res) => {
  const { claimType, description } = req.body;
  const claims = JSON.parse(fs.readFileSync(claimsFilePath, "utf8"));

  const newClaim = {
    claimId: String(claims.length + 1),
    userId: req.user.id,
    claimType,
    description,
    status: "Pending",
    timestamp: new Date().toISOString()
  };

  claims.push(newClaim);
  fs.writeFileSync(claimsFilePath, JSON.stringify(claims, null, 2));

  res.status(201).json({ message: "Claim submitted successfully.", claim: newClaim });
});

// Edit an existing claim
router.put("/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  const { claimType, description, status } = req.body;
  const claims = JSON.parse(fs.readFileSync(claimsFilePath, "utf8"));
  const claimIndex = claims.findIndex(claim => claim.claimId === id && claim.userId === req.user.id);

  if (claimIndex === -1) return res.status(404).json({ message: "Claim not found or unauthorized." });

  claims[claimIndex] = { ...claims[claimIndex], claimType, description, status };
  fs.writeFileSync(claimsFilePath, JSON.stringify(claims, null, 2));

  res.json({ message: "Claim updated successfully.", claim: claims[claimIndex] });
});

module.exports = router;
