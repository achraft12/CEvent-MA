import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item"><Link to="/">Home</Link></li>
        <li className="nav-item"><Link to="/event_list">Events List</Link></li>
        <li className="nav-item"><Link to="/aboutus">About</Link></li>

        {!isLoggedIn ? (
          <>
            <li className="nav-item"><Link to="/login">Login</Link></li>
            <li className="nav-item"><Link to="/signup">Sign Up</Link></li>
          </>
        ) : (
          <>
            <li className="nav-item user-email">
              <Link to="/profile">Welcome, {user.email}</Link>
            </li>
            <li className="nav-item">
              <button className="logout-button" onClick={logout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
