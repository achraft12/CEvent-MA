import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import EventCarousel from "../components/EventCarousel";
import './Home.css';

const Home = () => {
  const navigate = useNavigate(); // Initialize the hook

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Make a Difference in Your Community</h1>
          <p>Join us in creating positive change through volunteer work and community service</p>
          <button className="cta-button" onClick={() => navigate('/signup')}>Get Involved</button>
        </div>
      </section>

      {/* Events Section */}
      <section className="events-section">
        <h2>Upcoming Events</h2>
        <EventCarousel />
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Make an Impact?</h2>
          <p>Join our community of volunteers and start making a difference today</p>
          <button className="cta-button" onClick={() => navigate('/signup')}>
            Sign Up Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
