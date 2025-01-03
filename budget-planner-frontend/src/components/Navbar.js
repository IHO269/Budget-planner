import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { getUserProfile } from "../services/userService";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userProfile = await getUserProfile(token);
          setUser(userProfile);
        } catch (error) {
          console.error("Erreur lors de la récupération du profil utilisateur :", error.message);
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="navbar-container">
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="menu-toggle" onClick={toggleMenu}>
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
        <ul className="menu-list">
          <li>
            <Link to="/" onClick={toggleMenu}>
              Accueil
            </Link>
          </li>
          <li>
            <Link to="/dashboard" onClick={toggleMenu}>
              Tableau de Bord
            </Link>
          </li>
          <li>
            <Link to="/transactions" onClick={toggleMenu}>
              Transactions
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={toggleMenu}>
              Connexion
            </Link>
          </li>
          <li>
            <Link to="/register" onClick={toggleMenu}>
              Inscription
            </Link>
          </li>
        </ul>
      </div>
      <div className="main-content">
        <h1>Budget Planner</h1>
        {/* Affichage du nom d'utilisateur connecté */}
        {user && (
          <div className="user-info">
            <span>Bonjour, {user.username}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;