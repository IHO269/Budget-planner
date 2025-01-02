require("dotenv").config(); // Charge les variables d'environnement
const express = require("express");
const mongoose = require("mongoose"); // Ajout de mongoose pour MongoDB

const app = express();

// Importation des routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// Configuration de l'application
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Variables d'environnement
const PORT = process.env.PORT || 3000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/budget-planner";

// Connexion à MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connecté à MongoDB"))
  .catch((error) => {
    console.error("Erreur de connexion à MongoDB :", error.message);
    process.exit(1); // Arrête le serveur si la connexion échoue
  });

// Route d'accueil
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'app de planification de budget !");
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
