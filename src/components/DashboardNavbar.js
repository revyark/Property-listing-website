import React, { useState } from 'react';
import { FaGlobe, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './DashboardNavbar.css';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="nav-section logo">BOOKISH</div>

      {/* Center: Navigation */}
      <div className="nav-section nav-center">
        <span className="nav-link">Book Services</span>
        <span className="nav-link-globe">
          <FaGlobe /> English
        </span>
        <Link to="/dashboard/listings" className="list-space-btn">
          Start hosting
        </Link>
      </div>

      {/* Right: Profile Dropdown */}
      <div className="nav-section profile" onClick={() => setDropdownOpen(!dropdownOpen)}>
        <img
          src="https://i.pravatar.cc/40"
          alt="Profile"
          className="profile-img"
        />
        <span className="profile-name">Ananti</span>
        <FaChevronDown className="chevron" />
        {dropdownOpen && (
          <div className="dropdown">
            <a href="#">Dashboard</a>
            <a href="#">Profile</a>
            <a href="#">Logout</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
