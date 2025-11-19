// Sidebar.js

import React from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import "../../CSS/Sidebar.css"; // You'll need this file

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    // The 'open' class will trigger the CSS slide-in
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        <X size={24} />
      </button>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/appointments">Appointment</Link>
          </li>
          {/* Add more links here */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
