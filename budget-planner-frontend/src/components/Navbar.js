import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import "./Navbar.css"; // Ajoutez un fichier CSS pour styliser

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <h1>Budget Planner</h1>
        <button className="menu-button" onClick={toggleMenu}>
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
      <ul className={`menu-list ${isOpen ? "open" : ""}`}>
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
    </nav>
  );
};

export default Navbar;