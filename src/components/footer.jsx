import React from 'react';
import './footer.css';
import logo from '../assets/white_on_trans.png'; // Adjust the path to your logo image

function Footer() {
  return (
    <footer className="footer">
    <div className="footer-content">
      <div className="upper">
        <div className="socialmedia">
          <ul className="social-media-list">
            <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>
  
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-image" />
        </div>
      <div className="socialmedia">
          <ul className="social-media-list">
            <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>
      </div>
  
      <p className="copyright">&copy; 2023 Your Company Name. All rights reserved.</p>
    </div>
  </footer>
  
  );
}

export default Footer;