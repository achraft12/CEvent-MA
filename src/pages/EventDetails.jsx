import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./EventDetails.css";

// Dummy events (you can later fetch from backend or Firestore)
const dummyEvents = [
  {
    id: "1",
    title: "Feed the Homeless",
    date: "2025-05-01",
    category: "Food",
    description: "Join us in preparing and distributing nutritious meals to individuals experiencing homelessness. Together, we can make a difference one plate at a time.",
    location: "Central Park, New York City",
    organizer: "Helping Hands Organization",
    image: "https://www.rentecdirect.com/blog/wp-content/uploads/2016/12/bigstock-Happy-volunteer-family-holding-85091345.jpg ",
  },
  {
    id: "2",
    title: "Blood Donation Camp",
    date: "2025-05-10",
    category: "Health",
    description: "A single blood donation can save up to three lives. Join our mobile donation camp and be a hero to someone in need.",
    location: "Red Cross Center, Boston",
    organizer: "Global Blood Bank",
    image: "https://source.unsplash.com/featured/?blood,donation",
  },
  {
    id: "3",
    title: "Tree Planting",
    date: "2025-05-15",
    category: "Environment",
    description: "Participate in our reforestation drive to help combat climate change. All supplies will be provided. Family-friendly!",
    location: "City Forest Park, San Francisco",
    organizer: "Green Earth Collective",
    image: "https://source.unsplash.com/featured/?tree,planting",
  },
];

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();

  const event = dummyEvents.find((event) => event.id === id);

  const handleProtectedAction = (action) => {
    if (!isLoggedIn) {
      alert("Please log in to continue.");
      navigate("/login");
      return;
    }
    alert(`${user.email} chose to "${action}" this event.`);
  };

  if (!event) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        Event not found.
      </p>
    );
  }

  return (
    <div className="event-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <img src={event.image} alt={event.title} className="event-details-image" />

      <div className="event-meta">
        <h1>{event.title}</h1>
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Category:</strong> {event.category}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Organizer:</strong> {event.organizer}</p>
      </div>

      <div className="event-description">
        <h2>About the Event</h2>
        <p>{event.description}</p>
      </div>

      <div className="event-actions">
        <button className="event-action-button" onClick={() => handleProtectedAction("Attend")}>Attend</button>
        <button className="event-action-button donate" onClick={() => handleProtectedAction("Donate")}>Donate</button>
      </div>
    </div>
  );
};

export default EventDetails;
