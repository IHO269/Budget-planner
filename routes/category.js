const express = require("express");
const router = express.Router();
const Category = require("../models/category"); // Créez un modèle pour les catégories

// Route pour récupérer toutes les catégories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des catégories" });
  }
});

// Route pour ajouter une nouvelle catégorie
router.post("/", async (req, res) => {
  const { name, color } = req.body;
  try {
    const newCategory = new Category({ name, color });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'ajout de la catégorie" });
  }
});

// Route pour supprimer une catégorie
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: "Catégorie supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression de la catégorie" });
  }
});

module.exports = router;