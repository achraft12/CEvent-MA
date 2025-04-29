// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
     
        <li className="nav-item"><Link to="/">Home</Link></li>
        <li className="nav-item"> <Link to="/event_list">events list</Link></li>
        <li className="nav-item"><a href="#about">About</a></li>
        <li className="nav-item"><Link to="/login"> login</Link></li>
        <li className="nav-item"><Link to="/signup">Sign Up</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;