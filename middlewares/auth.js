const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  console.log("Token reçu :", token);

  if (!token) {
    console.error("Erreur : Token manquant");
    return res.status(403).json({ error: "Token manquant" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    console.log("Token décodé :", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Erreur lors de la vérification du token :", error.message);
    res.status(401).json({ error: "Token invalide" });
  }
};

module.exports = authenticate;
