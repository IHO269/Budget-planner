import React, { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/register", {
        username,
        email,
        password,
      });
      alert("Inscription réussie !");
      console.log("Utilisateur enregistré :", response.data);
      // Rediriger vers la page de connexion
      window.location.href = "/login";
    } catch (error) {
      if (error.response && error.response.data) {
        // Si l'erreur vient de l'API et contient une réponse
        alert("Erreur : " + error.response.data.error);
      } else {
        // Autres types d'erreurs (par exemple, problèmes de connexion)
        console.error("Erreur inattendue :", error);
        alert("Une erreur inattendue s'est produite. Veuillez réessayer.");
      }
    }
  };

  return (
    <div>
      <h1>Inscription</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label>Nom d'utilisateur :</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default RegisterPage;
