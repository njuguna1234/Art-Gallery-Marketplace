// src/components/Navbar.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownOpen && !e.target.closest('.dropdown')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', closeDropdown);
    return () => document.removeEventListener('click', closeDropdown);
  }, [dropdownOpen]);

  return (
    <nav className="navbar">
      <h1>Art Gallery Marketplace</h1>
      <ul className="navbar-menu">
        <li><Link to="/artworks">Artworks</Link></li>
        <li className="dropdown">
          <button
            onClick={toggleDropdown}
            className="dropbtn"
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
          >
            Artist
          </button>
          <div className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
            <Link to="/artists/profile">Artist Profile</Link>
            <Link to="/upload">Upload Art</Link>
          </div>
        </li>
        <li><Link to="/reviews">Reviews</Link></li>
        <li><Link to="/purchases">My Purchases</Link></li> {/* Link to Purchases */}
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
