import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import "./AddEvent.css";

const AddEvent = () => {
  const [eventData, setEventData] = useState({
    title: "",
    name: "",
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
    description: "",
    coverImageUrl: "", // Add this line
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert date strings to Firestore Timestamps
    const startDate = Timestamp.fromDate(new Date(eventData.startDate));
    const endDate = Timestamp.fromDate(new Date(eventData.endDate));

    try {
      await addDoc(collection(db, "charityEvents"), {
        ...eventData,
        startDate,
        endDate,
      });
      alert("Event Created and saved to database!");
      setEventData({
        title: "",
        name: "",
        startTime: "",
        endTime: "",
        startDate: "",
        endDate: "",
        description: "",
        coverImageUrl: "", // Add this line
      });
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      alert("Error adding event: " + error.message);
    }
  };

  return (
    <div className="add-event-container">
      <h1>Create Event</h1>
      <form className="add-event-form" onSubmit={handleSubmit}>
        <label>Event Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter event title"
          value={eventData.title}
          onChange={handleChange}
          required
        />

        <label>Event Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter event name"
          value={eventData.name}
          onChange={handleChange}
          required
        />

        <div className="grid">
          <div>
            <label>Start Time</label>
            <input
              type="time"
              name="startTime"
              value={eventData.startTime}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>End Time</label>
            <input
              type="time"
              name="endTime"
              value={eventData.endTime}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid">
          <div>
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={eventData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={eventData.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <h2>Event Description</h2>

        <label>Event Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            style={{
              width: "100%",
              maxHeight: "200px",
              objectFit: "cover",
              marginBottom: "20px",
              borderRadius: "8px",
            }}
          />
        )}

        <label>Event Image URL</label>
        <input
          type="url"
          name="coverImageUrl"
          placeholder="Paste image URL here"
          value={eventData.coverImageUrl}
          onChange={handleChange}
          required
        />
        {eventData.coverImageUrl && (
          <img
            src={eventData.coverImageUrl}
            alt="Preview"
            style={{
              width: "100%",
              maxHeight: "200px",
              objectFit: "cover",
              marginBottom: "20px",
              borderRadius: "8px",
            }}
          />
        )}

        <label>Event Description</label>
        <textarea
          name="description"
          placeholder="Type here..."
          value={eventData.description}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default AddEvent;