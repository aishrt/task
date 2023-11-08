import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand" >
          <h3>C-R-U-D</h3>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/" className="nav-link" >
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link" >
                Create-Data
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/fetch" className="nav-link" >
                Read-Data
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/fetchone" className="nav-link" >
                Read-One-Data
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/update" className="nav-link" >
                Update-Data
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/delete" className="nav-link" >
                Delete-Record
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/updateed" className="nav-link" >
                Update-All
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;
