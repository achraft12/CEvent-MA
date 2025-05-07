// src/components/EventCarousel.js
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { db } from "../firebase";
import { collection, getDocs, query, limit } from "firebase/firestore";
import "./EventCarousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const EventCarousel = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const q = query(collection(db, "charityEvents"), limit(6));
        const snapshot = await getDocs(q);
        setEvents(snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
      } catch (error) {
        console.error("Error fetching events for carousel:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  if (loading) return <div>Loading events...</div>;
  if (events.length === 0) return <div>No upcoming events.</div>;

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {events.map((event) => (
          <div key={event.id} className="carousel-slide">
            <img
              src={event.coverImageUrl || "https://via.placeholder.com/150"}
              alt={event.name}
              className="carousel-image"
            />
            <div className="carousel-caption">
              <h3>{event.name}</h3>
              <p>
                {event.startDate?.seconds
                  ? new Date(event.startDate.seconds * 1000).toLocaleDateString()
                  : ""}
              </p>
              <p>
                {event.description
                  ? event.description.length > 80
                    ? event.description.slice(0, 80) + "..."
                    : event.description
                  : "No description available."}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default EventCarousel;
