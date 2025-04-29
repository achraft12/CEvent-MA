// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar.jsx';
import Login from './pages/login.jsx';
import Footer from './components/footer.jsx';

import Home from './pages/home.jsx';
import SignUp from './pages/signup.jsx';
import EventList from './pages/Event_List.jsx';

import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="//event_list" element={<EventList />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
