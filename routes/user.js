const express = require("express");
const User = require("../models/user");
const authenticate = require("../middlewares/auth"); // Import du middleware
const router = express.Router();

// Route protégée pour récupérer les données de l'utilisateur connecté
router.get("/profile", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
