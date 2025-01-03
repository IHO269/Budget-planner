const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ error: "Token manquant" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded; // Ajoute les informations de l'utilisateur décodé à l'objet `req`
    next(); // Passe au middleware ou à la route suivante
  } catch (error) {
    console.error("Erreur lors de la vérification du token :", error.message);
    return res.status(401).json({ error: "Token invalide" });
  }
};

module.exports = authenticate;