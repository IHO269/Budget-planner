import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header style={{ backgroundColor: "#f8f9fa", padding: "1rem 2rem", borderBottom: "1px solid #ddd" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ margin: "0", fontSize: "1.5rem", color: "#333" }}>
            <Link to="/" style={{ textDecoration: "none", color: "#007bff" }}>
              Budget Planner
            </Link>
          </h1>
        </div>
        <div>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              padding: "0.5rem 1rem",
              backgroundColor: "#007bff",
              color: "white",
              borderRadius: "5px",
              marginRight: "0.5rem",
            }}
          >
            Accueil
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;