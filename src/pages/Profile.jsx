import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import "./Profile.css";

const Profile = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const [enrolledEvents, setEnrolledEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn || !user) {
      navigate("/login");
      return;
    }

    const fetchEnrolledEvents = async () => {
      try {
        const attendanceRef = collection(db, "attendance");
        const q = query(attendanceRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const events = [];

        for (const docSnap of querySnapshot.docs) {
          const { eventId } = docSnap.data();
          const eventRef = doc(db, "charityEvents", eventId);
          const eventDoc = await getDoc(eventRef);
          if (eventDoc.exists()) {
            events.push({ id: eventDoc.id, ...eventDoc.data() });
          }
        }

        setEnrolledEvents(events);
      } catch (error) {
        console.error("Error fetching enrolled events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledEvents();
  }, [isLoggedIn, user, navigate]);

  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <div className="profile-card">
        <img
          src={user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`}
          alt="User Avatar"
          className="profile-avatar"
        />
        <div className="profile-details">
          <p><strong>Name:</strong> {user.displayName || "N/A"}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User ID:</strong> {user.uid}</p>
        </div>
        <button className="logout-button2" onClick={logout}>
          Log Out
        </button>
      </div>

      <div className="enrolled-events-section">
        <h2>Enrolled Events</h2>
        {loading ? (
          <p>Loading events...</p>
        ) : enrolledEvents.length === 0 ? (
          <p>You haven't joined any events yet.</p>
        ) : (
          <Swiper
            spaceBetween={30}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="event-carousel"
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {enrolledEvents.map((event) => (
              <SwiperSlide key={event.id} className="event-slide">
                <div className="event-card">
                  <img
                    src={
                      event.coverImageUrl && event.coverImageUrl.trim() !== ""
                        ? event.coverImageUrl
                        : "https://via.placeholder.com/300x180?text=No+Image"
                    }
                    alt={event.name}
                    className="event-card-img"
                  />
                  <div className="event-card-body">
                    <h3>{event.name}</h3>
                    <p>
                      <strong>Date:</strong>{" "}
                      {event.startDate?.seconds
                        ? new Date(event.startDate.seconds * 1000).toLocaleDateString()
                        : "N/A"}
                    </p>
                    <p><strong>Location:</strong> {event.location}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default Profile;
