import EventCarousel from "../components/EventCarousel";

const Home = () => {
  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "1rem" }}>Upcoming Events</h2>
      <EventCarousel />
    </div>
  );
};

export default Home;