import React, { useState } from "react";
import { X, LogOut, ChevronDown, ChevronRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../CSS/AdminSidebar.css";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate(); //For redirect after logout

  //Helper function to check if a link is the current active path
  const isActive = (path) => location.pathname === path;

  //State management for dropdown
  const [isMainOpen, setIsMainOpen] = useState(true); //Default open para sa Dashboard
  const [isManagementOpen, setIsManagementOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  //Logout Handler
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear(); //Clear all data from localStorage
    if (toggleSidebar) toggleSidebar();
    navigate("/", { replace: true }); //Redirect to login page and avoid history entry
  };

  return (
    <div className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <button
        className="close-btn"
        onClick={toggleSidebar}
        aria-label="Close menu"
      >
        {" "}
        <X size={30} color="#333" />{" "}
      </button>
      <div className="sidebar-content">
        <div className="my-profile">My Profile</div>

        {/*Main Section */}
        <div
          className="menu-header"
          onClick={() => setIsMainOpen(!isMainOpen)}
          style={{ cursor: "pointer" }}
        >
          <span>MAIN</span>
          {isMainOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </div>
        {/*Conditional Rendering: Show the list if true*/}
        {isMainOpen && (
          <ul className="sub-menu">
            <li
              className={
                location.pathname === "/admin-dashboard" ? "active" : ""
              }
            >
              <Link Component={Link} to="/admin-dashboard">
                Dashboard
              </Link>
            </li>
          </ul>
        )}

        {/*Management Section*/}
        <div
          className="menu-header"
          onClick={() => setIsManagementOpen(!isManagementOpen)}
        >
          <span>MANAGEMENT</span>
          {isManagementOpen ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </div>
        {isManagementOpen && (
          <ul className="sub-menu">
            <li>
              <Link to="/admin/patients">Patients</Link>
            </li>
            <li>
              <Link to="/admin/doctors">Doctors</Link>
            </li>
            <li>
              <Link to="/admin/departments">Departments</Link>
            </li>
          </ul>
        )}

        {/*Reports Section */}
        <div
          className="menu-header"
          onClick={() => setIsReportOpen(!isReportOpen)}
        >
          <span>REPORTS</span>
          {isReportOpen ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </div>
        {/*Conditional Rendering: Show the list if true */}
        {isReportOpen && (
          <ul className="sub-menu">
            <li>
              <Link to="/admin/appointments">Appointments</Link>
            </li>
          </ul>
        )}

        {/*--Logout--*/}
        <div className="logout-container">
          <button onClick={handleLogout} className="logout-button-style">
            <LogOut size={28} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
