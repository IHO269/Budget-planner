const express = require("express");
const mongoose = require("mongoose");
const Transaction = require("../models/transaction");
const authenticate = require("../middlewares/auth"); // Importation du middleware
const router = express.Router();

// Ajouter une transaction
router.post("/", authenticate, async (req, res) => {
  console.log("Requête reçue pour ajouter une transaction :", req.body); // Ajout du log
  console.log("Token reçu dans les headers :", req.headers.authorization); // Log du token
  try {
      const { amount, category, description, date } = req.body;
      const userId = req.user.id; // Extraire userId du token
      console.log("userId extrait du token :", userId); // Log du userId
      console.log("userId extrait du token :", userId); // Log supplémentaire

      if (!amount || !category) {
          console.error("Erreur : Champs obligatoires manquants");
          return res.status(400).json({ error: "Les champs amount et category sont obligatoires" });
      }

      const transaction = new Transaction({
          userId,
          amount,
          category,
          description,
          date,
      });

      const savedTransaction = await transaction.save();
      console.log("Transaction ajoutée avec succès :", savedTransaction);
      res.status(201).json(savedTransaction);
  } catch (error) {
      console.error("Erreur lors de l'ajout de la transaction :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
  }
});


// Récupérer les transactions d'un utilisateur
router.get("/:userId", authenticate, async (req, res) => {
  try {
    const userId = req.params.userId.trim();

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "ID utilisateur invalide" });
    }

    const transactions = await Transaction.find({ userId });
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Erreur lors de la récupération des transactions :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// Mettre à jour une transaction
router.put("/:transactionId", authenticate, async (req, res) => {
  try {
    const { transactionId } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(transactionId)) {
      return res.status(400).json({ error: "ID de transaction invalide" });
    }

    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "Aucune donnée de mise à jour fournie" });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ error: "Transaction non trouvée" });
    }

    res.status(200).json(updatedTransaction);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la transaction :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// Supprimer une transaction
router.delete("/:transactionId", authenticate, async (req, res) => {
  try {
    const { transactionId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(transactionId)) {
      return res.status(400).json({ error: "ID de transaction invalide" });
    }

    const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);

    if (!deletedTransaction) {
      return res.status(404).json({ error: "Transaction non trouvée" });
    }

    res.status(200).json({ message: "Transaction supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de la transaction :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

module.exports = router;