import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "../styles/navbar.css";

const Navbar = () => {
  const [search, setSearch] = useState("");

  return (
    <nav className="navbar">
      <div className="logo">Custom<span>Tees</span></div>

      {/* Search Bar */}
      <div className="search-container">
        <FaSearch className="search-icon1" />
        <input
          type="search"
          placeholder="Search for designs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />
      </div>

      {/* Navigation Links */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/design">Design</Link></li>
        <li><Link to="/cart">Add to Cart</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/login" className="login-button">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

