// src/Components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './style.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    // keep local state in sync when route changes (optional)
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    setMenuOpen(false); // auto close on route change
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/", { replace: true });
  };

  return (
    <header>
      <div className="logo">🌾 AgroVision</div>

      <div className={`nav-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={menuOpen ? 'active' : ''}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>

        {/* Farmer login: check localStorage at click-time so we get the latest value */}
        <Link
          to="/LoginSignup"
          onClick={(e) => {
            const logged = localStorage.getItem("isLoggedIn") === "true";
            const userType = localStorage.getItem("userType");
            if (logged && userType === "Farmer") {
              e.preventDefault();
              navigate("/FarmerPage");
            }
            setMenuOpen(false);
          }}
        >
          Login as Farmer
        </Link>

        {/* Vendor login: same logic */}
        <Link
          to="/VendorSignup"
          onClick={(e) => {
            const logged = localStorage.getItem("isLoggedIn") === "true";
            const userType = localStorage.getItem("userType");
            if (logged && userType === "vendor") {
              e.preventDefault();
              navigate("/VendorsPage");
            }
            setMenuOpen(false);
          }}
        >
          Login as Vendor
        </Link>

        <Link
          to="/"
          onClick={(e) => {
            e.preventDefault();
            const section = document.getElementById("contact-section");
            if (section) {
              section.scrollIntoView({ behavior: 'smooth' });
            } else {
              navigate("/contact");
            }
            setMenuOpen(false);
          }}
        >
          Contact
        </Link>

        {localStorage.getItem("isLoggedIn") === "true" && (
          <span
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            style={{ cursor: "pointer", color: "white", fontWeight: "bold", marginTop: "10px" }}
          >
            Logout
          </span>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
