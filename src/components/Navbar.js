// src/components/Navbar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <h1>Art Gallery Marketplace</h1>
      <ul className="navbar-menu">
        <li><Link to="/artworks">Artworks</Link></li>

        {/* Dropdown for Artist */}
        <li className="dropdown">
          <button onClick={toggleDropdown} className="dropbtn">Artist</button>
          <div className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
            <Link to="/artists/profile">Artist Profile</Link>
            <Link to="/upload">Upload Art</Link>
          </div>
        </li>

        <li><Link to="/reviews">Reviews</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
