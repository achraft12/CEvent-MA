import React, { useState } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import "./login.css"; // You can keep or rename this as Login.css

const Login = () => {
  const [email, setEmail] = useState(""); // Changed from name to email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Logged in with Google!");
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
        <h2>Log In to Your Account</h2>
        <form className="signup-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="signup-button">
            Log In
          </button>
        </form>

        <div className="divider">Or</div>

        <button className="google-btn" onClick={handleGoogleLogin}>
          <img
            src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
            alt="Google"
            className="google-icon"
          />
          Log in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;