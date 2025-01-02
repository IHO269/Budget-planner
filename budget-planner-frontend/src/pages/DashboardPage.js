import React from "react";

const DashboardPage = () => {
  const handleLogout = () => {
    // Supprime le token du localStorage et redirige vers la page de connexion
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Tableau de bord</h1>
      <p>Bienvenue sur votre tableau de bord !</p>

      <div style={{ marginTop: "2rem" }}>
        <button
          onClick={handleLogout}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;