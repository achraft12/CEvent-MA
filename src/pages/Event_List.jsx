// src/pages/EventList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase"; // Import Firestore instance
import { collection, getDocs } from "firebase/firestore";
import "./EventList.css";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch events from Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, "charityEvents");
        const eventSnapshot = await getDocs(eventsCollection);
        const eventList = eventSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventList);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on selected category
  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter((event) => event.category === selectedCategory);

  return (
    <div className="event-list-container">
      <h2>Upcoming Charity Events</h2>

      <div className="filter-container">
        <label>Filter by Category:</label>
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="All">All</option>
          <option value="Food">Food</option>
          <option value="Health">Health</option>
          <option value="Environment">Environment</option>
        </select>
      </div>

      <div className="events-grid">
        {filteredEvents.map((event) => (
          <div className="event-card" key={event.id}>
            <img
              src={event.coverImageUrl || "https://via.placeholder.com/150"}
              alt={event.name}
              className="event-image"
            />
            <h3>{event.name}</h3>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(event.startDate.seconds * 1000).toLocaleDateString()}
            </p>
            <p>
              <strong>Category:</strong> {event.category || "N/A"}
            </p>
            <p>{event.description}</p>
            <Link to={`/events/${event.id}`} className="event-details-link">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
