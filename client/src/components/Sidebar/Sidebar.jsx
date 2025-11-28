// Sidebar.js (Corrected)

import React from "react";
import { X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "../../CSS/Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  // Helper function to check if a link is the current active path
  const isActive = (path) => location.pathname === path;

  return (
    // ⭐️ FIX: Use sidebar-open and sidebar-closed classes ⭐️
    <div className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <button
        className="close-btn"
        onClick={toggleSidebar}
        aria-label="Close menu"
      >
        <X size={30} color="#333" />
      </button>
      <nav className="sidebar-nav">
        <ul>
          <li className={isActive("/user-profile") ? "active" : ""}>
            <Link to="/user-profile" onClick={toggleSidebar}>
              Profile
            </Link>
          </li>
          <li className={isActive("/dashboard") ? "active" : ""}>
            <Link to="/dashboard" onClick={toggleSidebar}>
              Dashboard
            </Link>
          </li>
          <li className={isActive("/doctorlist") ? "active" : ""}>
            <Link to="/doctorlist" onClick={toggleSidebar}>
              Doctor List
            </Link>
          </li>
          <li className={isActive("/test") ? "active" : ""}>
            <Link to="/test" onClick={toggleSidebar}>
              Appointments
            </Link>
          </li>
          <li className="logout-item">
            <Link to="/logout" onClick={toggleSidebar}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
