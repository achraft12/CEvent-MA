import DonationPage from './pages/donation.jsx';  // <-- Import your donation page
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar.jsx';
import Login from './pages/login.jsx';
import Footer from './components/footer.jsx';

import Home from './pages/home.jsx';
import SignUp from './pages/signup.jsx';
import EventList from './pages/Event_List.jsx';
import EventDetails from './pages/EventDetails.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Profile from './pages/Profile.jsx';
import AddEvent from './pages/AddEvent.jsx';

import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/event_list" element={<EventList />} />
          <Route path="/events/:id" element={<EventDetails />} />
         
          <Route path="/donation/:id" element={<DonationPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add_event" element={<AddEvent />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
       
       <Footer />
       
        
      </div>
    </>
  );
}

export default App;
