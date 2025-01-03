import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import TransactionPage from "./pages/TransactionPage";
import BottomNavbar from "./components/BottomNavbar"; // Importation de la barre de navigation inférieure

const App = () => {
  return (
    <Router>
      {/* Ajouter un conteneur global */}
      <div style={{ paddingBottom: "60px" }}> {/* Assure un espace pour la Bottom Navbar */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/transactions" element={<TransactionPage />} />
        </Routes>
        {/* Barre de navigation inférieure toujours visible */}
        <BottomNavbar />
      </div>
    </Router>
  );
};

export default App;