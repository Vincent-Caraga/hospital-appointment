import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PatientDashboard from "./pages/PatientDashboard";
import Navbar from "./components/Navbar/Navbar";
import UserLayout from "./components/UserLayout/UserLayout";
import Test from "./pages/Test";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./components/UserProfile/UserProfile";
import ProtectedRoute from "./pages/ProtectedRoute";

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

        {/* Authenticated Routes: Wrap in the custom layout component 
        <Route path="/doctorsearch" element={<PatientDashboard />} /> */}

        <Route element={<UserLayout />}>
          <Route
            path="/doctorlist"
            element={
              <ProtectedRoute>
                <PatientDashboard />
              </ProtectedRoute>
            }
          />
          {/* :doctorId a variable for selecting a doctor to have an appointment*/}
          <Route path="/test" element={<Test />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/user-profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* If you want the old routes to still exist for testing: */}
        <Route path="/navbar" element={<Navbar />} />
      </Routes>
    </Router>
  );
};

export default App;
