import React from "react";
import "./AboutUs.css";

const teamMembers = [
  {
    name: "Achraf Taki",
    role: "Project Lead",
    description: "Oversees the project's direction and ensures all milestones are met. Passionate about tech for social good.",
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
  },
  {
    name: "Sarah El Mansouri",
    role: "Frontend Developer",
    description: "Crafts intuitive and responsive user interfaces to deliver seamless user experiences.",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Youssef Bensalem",
    role: "Backend Developer",
    description: "Manages the server, database, and APIs. Ensures secure and efficient data flow.",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Imane Chafik",
    role: "UI/UX Designer",
    description: "Designs clean and accessible layouts that make the platform visually appealing and user-friendly.",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Hamza Idrissi",
    role: "QA & Tester",
    description: "Ensures the platform is bug-free and performs well under all conditions.",
    image: "https://via.placeholder.com/150",
  },
];

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <p className="mission">
        We are a team of passionate students building a platform to connect people with meaningful charity events.
        Our mission is to empower communities through technology and encourage social responsibility.
      </p>

      <h2>Meet the Team</h2>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div className="team-member-card" key={index}>
            <img src={member.image} alt={member.name} />
            <h3>{member.name}</h3>
            <p className="role">{member.role}</p>
            <p className="bio">{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
