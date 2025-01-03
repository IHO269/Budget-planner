import React from "react";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PieChartIcon from "@mui/icons-material/PieChart";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CategoryIcon from "@mui/icons-material/Category";
import SettingsIcon from "@mui/icons-material/Settings";
import "./BottomNavbar.css"; // Fichier CSS pour styliser

const BottomNavbar = () => {
  const location = useLocation();

  return (
    <nav className="bottom-navbar">
      <Link to="/" className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
        <HomeIcon />
        <span>Accueil</span>
      </Link>
      <Link
        to="/dashboard"
        className={`nav-item ${location.pathname === "/dashboard" ? "active" : ""}`}
      >
        <PieChartIcon />
        <span>Graphiques</span>
      </Link>
      <Link
        to="/transactions"
        className={`nav-item ${location.pathname === "/transactions" ? "active" : ""}`}
      >
        <ListAltIcon />
        <span>Transactions</span>
      </Link>
      <Link
        to="/categories"
        className={`nav-item ${location.pathname === "/categories" ? "active" : ""}`}
      >
        <CategoryIcon />
        <span>Catégories</span>
      </Link>
      <Link
        to="/settings"
        className={`nav-item ${location.pathname === "/settings" ? "active" : ""}`}
      >
        <SettingsIcon />
        <span>Paramètres</span>
      </Link>
    </nav>
  );
};

export default BottomNavbar;