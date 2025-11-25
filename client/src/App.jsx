import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PatientDashboard from "./pages/PatientDashboard";
import Navbar from "./components/Navbar/Navbar";
import UserLayout from "./components/UserLayout/UserLayout";

const App = () => {
  return (
    <Router>
      {/* FIX 2: All routes are now wrapped in the <Router> element, 
                       and the Navbar/Sidebar logic is used inside the routes where needed. */}
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        {/* Set Login as the default route */}
        <Route path="/" element={<Login />} />

        {/* Authenticated Routes: Wrap in the custom layout component */}
        <Route path="/doctorsearch" element={<PatientDashboard />} />

        <Route element={<UserLayout />}>
          <Route path="/dashboard" element={<PatientDashboard />} />
        </Route>

        {/* If you want the old routes to still exist for testing: */}
        <Route path="/navbar" element={<Navbar />} />
      </Routes>
    </Router>
  );
};

export default App;
