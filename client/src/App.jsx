import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PatientDashboard from "./pages/PatientDashboard";
import UserNavbar from "./components/Navbar/UserNavbar";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Login />} />
        <Route path="/doctorsearch" element={<PatientDashboard />} />
        <Route path="/patient-navbar" element={<UserNavbar />} />
      </Routes>
    </Router>
  );
};

export default App;
