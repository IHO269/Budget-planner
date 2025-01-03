require("dotenv").config(); // Charge les variables d'environnement
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware CORS
app.use(
  cors({
    origin: "http://localhost:3001", // L'origine du frontend
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Autorise l'envoi de cookies et headers spécifiques
  })
);

// Middleware global pour logger les requêtes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Importation des routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const transactionRoutes = require("./routes/transaction");
const categoryRoutes = require("./routes/category");

// Configuration de l'application
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/transactions", transactionRoutes); // Routes des transactions
app.use("/api/categories", categoryRoutes);

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

// Gestionnaire d'erreurs global
app.use((err, req, res, next) => {
  console.error("Erreur non gérée :", err.stack);
  res.status(500).json({ error: "Erreur interne du serveur" });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});