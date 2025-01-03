const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  color: { type: String, default: "#cccccc" }, // Ajoutez une couleur par défaut
});

module.exports = mongoose.model("Category", categorySchema);