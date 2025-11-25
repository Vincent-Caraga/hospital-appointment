// Sidebar.js (Corrected)

import React from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import "../../CSS/Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    // ⭐️ FIX: Use sidebar-open and sidebar-closed classes ⭐️
    <div className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
           {" "}
      <button className="close-btn" onClick={toggleSidebar}>
                <X size={24} color="#333" />     {" "}
      </button>
           {" "}
      <nav className="sidebar-nav">
               {" "}
        <ul>
                   {" "}
          <li>
                       {" "}
            <Link to="/dashboard" onClick={toggleSidebar}>
                            Dashboard            {" "}
            </Link>
                     {" "}
          </li>
                   {" "}
          <li>
                       {" "}
            <Link to="/appointments" onClick={toggleSidebar}>
                            Appointment            {" "}
            </Link>
                     {" "}
          </li>
                    {/* Add more links here */}       {" "}
        </ul>
             {" "}
      </nav>
         {" "}
    </div>
  );
};

export default Sidebar;
