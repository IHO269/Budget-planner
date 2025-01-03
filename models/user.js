const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Définir le schéma utilisateur
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Middleware `pre` pour hacher le mot de passe avant d'enregistrer
userSchema.pre("save", async function (next) {
  const user = this;

  // Vérifiez si le mot de passe est modifié (nouvel utilisateur ou mise à jour)
  if (!user.isModified("password")) return next();

  try {
    // Générer un hash pour le mot de passe
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next(); // Continuer le processus de sauvegarde
  } catch (err) {
    next(err); // Passer l'erreur à Mongoose
  }
});

// Méthode pour comparer le mot de passe
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Exporter le modèle utilisateur
const User = mongoose.model("User", userSchema);
module.exports = User;