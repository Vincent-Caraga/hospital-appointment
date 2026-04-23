import React from "react";
import { Menu } from "lucide-react";
import { assets } from "../../assets/assets";
import "../../CSS/AdminNavbar.css";

const AdminNavbar = ({ toggleSidebar }) => {
  return (
    <>
      <div className="navbar-container-admin">
        <div className="nav-left-group">
          <button
            className="sidebar-toggle-btn"
            onClick={toggleSidebar}
            aria-label="Toggle Navigation Menu"
          >
            <Menu size={25} color="#000" />
          </button>
          <div className="user-info-section">
            <img
              src={assets.profile}
              alt="user profile"
              className="admin-profile"
            />
            <div className="greeting-text">
              <p className="user-name-text">Hello, SuperAdmin!</p>
              <p className="greeting-subtext">SuperAdmin</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
