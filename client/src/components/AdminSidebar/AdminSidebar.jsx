import React, { useState } from "react";
import { X, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../CSS/AdminSidebar.css";

const AdminSidebar = (isOpen, toggleSidebar) => {
  const location = useLocation();
  const navigate = useNavigate(); //For redirect after logout

  //Helper function to check if a link is the current active path
  const isActive = (path) => location.pathname === path;

  //State management for dropdown
  const [isMainOpen, setIsMainOpen] = useState(false);
  const [isManagementOpen, setIsManagementOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  //Logout Handler
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear(); //Clear all data from localStorage
    toggleSidebar(); //Close all sidebar (if mobile)
    navigate("/", { replace: true }); //Redirect to login page and avoid history entry
  };

  return (
    <div className={`sidebar${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <button
        className="close-btn"
        onClick={toggleSidebar}
        aria-label="Close menu"
      >
        {" "}
        <X size={30} color="#333" />{" "}
      </button>
      <div className="sidebar">
        <div className="my-profile">My Profile</div>
        {/*Main Section */}
        <div
          className="menu-header"
          onClick={() => setIsMainOpen(!isMainOpen)}
          style={{ cursor: "pointer" }}
        >
          MAIN {isMainOpen ? "▾" : "▸"}
        </div>
        {/*Conditional Rendering: Show the list if true*/}
        {isMainOpen && (
          <ul className="sub-menu">
            <li>Dashboard</li>
          </ul>
        )}

        {/*Management Section*/}
        <div
          className="menu-header"
          onClick={() => setIsManagementOpen(!isManagementOpen)}
          style={{ cursor: "pointer" }}
        >
          MANAGEMENT {isManagementOpen ? "▾" : "▸"}
        </div>
        {/*Conditional Rendering: Show the list if true */}
        {isManagementOpen && (
          <ul className="sub-menu">
            <li>Patients</li>
            <li>Doctors</li>
            <li>Departments</li>
          </ul>
        )}

        {/*Reports Section */}
        <div
          className="menu-header"
          onClick={() => setIsReportOpen(!isReportOpen)}
          style={{ cursor: "pointer" }}
        >
          REPORTS {isReportOpen ? "▾" : "▸"}
        </div>
        {/*Conditional Rendering: Show the list if true */}
        {isReportOpen && (
          <ul className="sub-menu">
            <li>Appointments</li>
          </ul>
        )}
        <li className="logout-item">
          <button
            onClick={handleLogout}
            className="logout-button-style"
            style={{
              background: "none",
              border: "none",
              color: "#ff4d4d",
              cursor: "pointer",
              width: "100%",
              textAlign: "left",
              padding: "10px 0",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            {" "}
            <LogOut size={28} />
            Logout
          </button>
          {/*Continue April 24 */}
        </li>
      </div>
    </div>
  );
};

export default AdminSidebar;
