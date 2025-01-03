import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log("Tentative de connexion avec :", { email, password }); // Log avant la requête
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log("Réponse de l'API :", response); // Log de la réponse complète
      console.log("Token reçu :", response.data.token); // Log du token uniquement

      alert("Connexion réussie !");
      // Stocker le token dans localStorage
      localStorage.setItem("token", response.data.token);

      // Rediriger vers le tableau de bord
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Erreur lors de la connexion :", error); // Log de l'erreur complète
      if (error.response && error.response.data) {
        console.log("Erreur retournée par l'API :", error.response.data.error); // Log du message d'erreur de l'API
        alert("Erreur : " + error.response.data.error);
      } else {
        alert("Une erreur inattendue s'est produite. Vérifiez le backend.");
      }
    }
  };

  return (
    <div>
      <h1>Connexion</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginPage;