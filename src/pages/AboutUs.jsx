import React from "react";
import "./AboutUs.css";

const teamMembers = [
  {
    name: "Achraf Taki",
    role: "FULL-STACK Developer",
    description: "Responsible for both frontend and backend development. Passionate about creating efficient and scalable applications.",
   
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
  },
  {
    name: "ayman ELAKKAOUI ",
    role: "Frontend Developer",
    description: "Crafts intuitive and responsive user interfaces to deliver seamless user experiences.",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Bilal Hassani",
    role: "Backend Developer",
    description: "Manages the server, database, and APIs. Ensures secure and efficient data flow.",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "wassim Benferrou",
    role: "UI/UX Designer",
    description: "Designs clean and accessible layouts that make the platform visually appealing and user-friendly.",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Ghali Nidal Ettiji",
    role: "frontend Developer",
    description: "Works on the client-side of the application, ensuring a smooth and engaging user experience.",
  
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
