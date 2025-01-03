const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // Importer bcrypt pour hasher les mots de passe
const User = require("../models/user");
const router = express.Router();

// Route pour l'inscription
router.post("/register", async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      if (!username || !email || !password) {
        return res.status(400).json({ error: "Tous les champs sont requis" });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Cet utilisateur existe déjà" });
      }
  
      const user = new User({ username, email, password });
      const savedUser = await user.save();
  
      console.log("Utilisateur créé avec succès :", savedUser);
      res.status(201).json({ message: "Utilisateur créé avec succès" });
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  });

// Route pour la connexion
router.post("/login", async (req, res) => {
  console.log("Requête reçue pour connexion :", req.body);

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("Erreur : Utilisateur non trouvé");
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    console.log("Mot de passe envoyé :", password);
    console.log("Mot de passe enregistré (haché) :", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Erreur : Mot de passe incorrect");
      return res.status(401).json({ error: "Mot de passe incorrect" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION || "1h",
    });
    console.log("Connexion réussie. Token généré :", token);

    res.status(200).json({ token });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

module.exports = router;