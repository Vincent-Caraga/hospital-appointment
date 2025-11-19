import React, { useState } from "react"; // <-- FIX 1: Import useState
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PatientDashboard from "./pages/PatientDashboard";
import Navbar from "./components/Navbar/Navbar";
import UserLayout from "./components/UserLayout/UserLayout";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  // State for controlling the sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Component to wrap authenticated routes (Dashboard, etc.)
  // This allows the Navbar and Sidebar to be present only when the user is logged in
  const AuthenticatedLayout = ({ children }) => (
    <div className={`layout-wrapper ${isSidebarOpen ? "sidebar-open" : ""}`}>
      {/* 1. The Navbar gets the toggle function */}
      <Navbar toggleSidebar={toggleSidebar} />
      {/* 2. The Sidebar gets the state and toggle function */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main>
        {children}{" "}
        {/* Renders the specific page content (e.g., PatientDashboard) */}
      </main>
    </div>
  );

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
        <Route
          path="/doctorsearch"
          element={
            <AuthenticatedLayout>
              <PatientDashboard />
            </AuthenticatedLayout>
          }
        />

        {/* If you want the old routes to still exist for testing: */}
        <Route
          path="/user-navbar"
          element={<Sidebar toggleSidebar={toggleSidebar} />}
        />
        <Route path="/userlayout" element={<UserLayout />} />
        <Route
          path="/sidebar"
          element={
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
