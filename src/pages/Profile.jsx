import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <div className="profile-card">
        <img
          src={user.photoURL || "https://i.pravatar.cc/150?u=" + user.uid}
          alt="User Avatar"
          className="profile-avatar"
        />
        <div className="profile-details">
          <p><strong>Name:</strong> {user.displayName || "N/A"}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User ID:</strong> {user.uid}</p>
        </div>
        <button className="logout-button2" onClick={logout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
