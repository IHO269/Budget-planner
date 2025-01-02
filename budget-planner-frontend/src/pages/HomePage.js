import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center", padding: "2rem" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#333" }}>Bienvenue dans Budget Planner</h1>
        <p style={{ fontSize: "1.2rem", color: "#555" }}>
          Gérez vos finances efficacement avec notre outil simple et intuitif.
        </p>
      </header>

      <section style={{ marginBottom: "2rem" }}>
        <img
          src="./public/image.jpg" // Remplacez par une vraie image si disponible
          alt="Illustration Budget Planner"
          style={{ width: "80%", maxWidth: "600px", borderRadius: "10px" }}
        />
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.5rem", color: "#333" }}>Commencez dès maintenant :</h2>
        <div style={{ marginTop: "1rem" }}>
          <Link
            to="/register"
            style={{
              textDecoration: "none",
              padding: "0.8rem 1.5rem",
              backgroundColor: "#28a745",
              color: "white",
              borderRadius: "5px",
              margin: "0.5rem",
            }}
          >
            S'inscrire
          </Link>
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              padding: "0.8rem 1.5rem",
              backgroundColor: "#007bff",
              color: "white",
              borderRadius: "5px",
              margin: "0.5rem",
            }}
          >
            Se connecter
          </Link>
        </div>
      </section>

      <footer style={{ marginTop: "2rem", fontSize: "0.9rem", color: "#777" }}>
        <p>© {new Date().getFullYear()} Budget Planner. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default HomePage;