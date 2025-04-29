// src/pages/EventList.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./EventList.css";

const dummyEvents = [
  {
    id: "1",
    title: "Feed the Homeless",
    date: "2025-05-01",
    category: "Food",
    description: "Helping the less fortunate with warm meals.",
    image:
      "https://www.rentecdirect.com/blog/wp-content/uploads/2016/12/bigstock-Happy-volunteer-family-holding-85091345.jpg",
  },
  {
    id: "2",
    title: "Blood Donation Camp",
    date: "2025-05-10",
    category: "Health",
    description: "Donate blood, save lives.",
    image:
      "https://www.rentecdirect.com/blog/wp-content/uploads/2016/12/bigstock-Happy-volunteer-family-holding-85091345.jpg",
  },
  {
    id: "3",
    title: "Tree Planting",
    date: "2025-05-15",
    category: "Environment",
    description: "Join us to plant trees and save the planet.",
    image:
      "https://www.rentecdirect.com/blog/wp-content/uploads/2016/12/bigstock-Happy-volunteer-family-holding-85091345.jpg",
  },
  {
    id: "4",
    title: "Tree Planting",
    date: "2025-05-15",
    category: "Environment",
    description: "Join us to plant trees and save the planet.",
    image:
      "https://www.rentecdirect.com/blog/wp-content/uploads/2016/12/bigstock-Happy-volunteer-family-holding-85091345.jpg",
  },
  {
    id: "5",
    title: "Tree Planting",
    date: "2025-05-15",
    category: "Environment",
    description: "Join us to plant trees and save the planet.",
    image:
      "https://www.rentecdirect.com/blog/wp-content/uploads/2016/12/bigstock-Happy-volunteer-family-holding-85091345.jpg",
  },
];

const EventList = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

 
const filteredEvents =
  selectedCategory === "All"
    ? dummyEvents
    : dummyEvents.filter((event) => event.category === selectedCategory);

  
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
            <img src={event.image} alt={event.title} className="event-image" />
            <h3>{event.title}</h3>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Category:</strong> {event.category}</p>
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
