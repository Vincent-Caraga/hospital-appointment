import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PatientDashboard from "./pages/PatientDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Login />} />
        <Route path="/doctorsearch" element={<PatientDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
