import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import TransactionPage from "./pages/TransactionPage"; // Importation ajoutée
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <div>
        {/* Ajout du Header pour toutes les pages */}
      {/* Navbar toujours visible */}
      <Navbar />
      <div style={{ marginTop: "64px" }}></div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/transactions" element={<TransactionPage />} /> {/* Route correcte */}
        </Routes>
      </div>
    </Router>
  );
};

export default App; 