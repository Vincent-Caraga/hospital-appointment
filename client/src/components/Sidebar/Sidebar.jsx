import React from "react";
import { X, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../CSS/Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate(); //For redirect after logout
  // Helper function to check if a link is the current active path
  const isActive = (path) => location.pathname === path;

  //LOGOUT Handler
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear(); //Clear all data from localStorage
    toggleSidebar(); //Close the sidebar (if mobile)
    navigate("/"); //Redirect to login page and avoid history entry
  };

  return (
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
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
