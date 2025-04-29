// src/components/EventCarousel.js
import React from "react";
import Slider from "react-slick";
import "./EventCarousel.css"; // Optional custom styles
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const events = [
  {
    id: 1,
    title: "Food Drive for the Homeless",
    date: "2025-05-10",
    image: "https://www.rentecdirect.com/blog/wp-content/uploads/2016/12/bigstock-Happy-volunteer-family-holding-85091345.jpg",
    description: "Join us to distribute food to those in need.",
  },
  {
    id: 2,
    title: "Blood Donation Camp",
    date: "2025-05-18",
    image: "https://www.rentecdirect.com/blog/wp-content/uploads/2016/12/bigstock-Happy-volunteer-family-holding-85091345.jpg",
    description: "Donate blood and save lives.",
  },
  {
    id: 3,
    title: "School Supplies for Kids",
    date: "2025-06-01",
    image: "https://www.rentecdirect.com/blog/wp-content/uploads/2016/12/bigstock-Happy-volunteer-family-holding-85091345.jpg",
    description: "Help us provide school kits to children.",
  },
  {
    id: 4,
    title: "School Supplies for Kids",
    date: "2025-06-01",
    image: "https://www.rentecdirect.com/blog/wp-content/uploads/2016/12/bigstock-Happy-volunteer-family-holding-85091345.jpg",
    description: "Help us provide school kits to children.",
  },
];

const EventCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {events.map((event) => (
          <div key={event.id} className="carousel-slide">
            <img src={event.image} alt={event.title} className="carousel-image" />
            <div className="carousel-caption">
              <h3>{event.title}</h3>
              <p>{event.date}</p>
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default EventCarousel;
