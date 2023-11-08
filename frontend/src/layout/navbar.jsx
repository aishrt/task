import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const user = localStorage.getItem("user");
  const userRole = JSON.parse(user)?.role;

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <img className="logoImg" src={logo} alt="logo" />
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          {!showNavbar ? (
            <i className="fa-solid fa-bars"></i>
          ) : (
            <i className="fa-solid fa-xmark"></i>
          )}
        </div>
        <div className={`nav-elements ${showNavbar && "active"}`}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">profile</Link>
            </li>
            {userRole === "Manager" && (
              <>
                <li>
                  <Link to="/profile">Employee List </Link>
                </li>
              </>
            )}
            <li>
              <Link onClick={() => handleLogout()}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
