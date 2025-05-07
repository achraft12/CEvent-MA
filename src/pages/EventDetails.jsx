import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import "./EventDetails.css";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventRef = doc(db, "charityEvents", id);
        const eventSnap = await getDoc(eventRef);
        if (eventSnap.exists()) {
          setEvent({ id: eventSnap.id, ...eventSnap.data() });
        } else {
          setEvent(null);
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleProtectedAction = (action) => {
    if (!isLoggedIn) {
      alert("Please log in to continue.");
      navigate("/login");
      return;
    }
    alert(`${user.email} chose to "${action}" this event.`);
  };

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</p>;
  }

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
      <img src={event.coverImageUrl || "https://via.placeholder.com/150"} alt={event.name} className="event-details-image" />

      <div className="event-meta">
        <h1>{event.name}</h1>
        <p><strong>Date:</strong> {event.startDate?.seconds ? new Date(event.startDate.seconds * 1000).toLocaleDateString() : "N/A"}</p>
        <p><strong>Category:</strong> {event.category}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Organizer:</strong> {event.organizer || "N/A"}</p>
        <p><strong>Time:</strong> {event.startTime || "N/A"} - {event.endTime || "N/A"}</p>
      </div>

      <div className="event-description">
        <p>{event.description}</p>
      </div>

      <div className="event-actions">
        <button onClick={() => handleProtectedAction("Join")}>Join Event</button>
        <button onClick={() => handleProtectedAction("Bookmark")}>Bookmark</button>
      </div>
    </div>
  );
};

export default EventDetails;
