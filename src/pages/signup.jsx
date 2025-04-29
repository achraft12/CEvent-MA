
import React, { useState } from "react";
import { auth, googleProvider } from "../firebase";

import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import "./SignUp.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, `${name}@gmail.com`, password);
      alert("User created successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Signed up with Google!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
  <div className="left-section">
    <img
      src="https://images.squarespace-cdn.com/content/v1/62f137e61dcd4738eda70190/1659975665125-EXTB57SKUE3INDSN2AOS/Donation+Box.jpg"
      alt="Donate"
      className="signup-image"
    />
  </div>

  <div className="right-section">
    <h2>Create an Account</h2>
    <form className="signup-form" onSubmit={handleSignUp}>
      <div className="form-group">
        <label>Your Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <button type="submit" className="signup-button">
        Sign Up
      </button>
    </form>

    <div className="divider">Or</div>

    <button className="google-btn" onClick={handleGoogleSignUp}>
      <img
        src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
        alt="Google"
        className="google-icon"
      />
      Sign up with Google
    </button>
  </div>
</div>


  );
};

export default SignUp;
