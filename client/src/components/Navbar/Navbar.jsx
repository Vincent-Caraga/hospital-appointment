import React, { useState } from "react";
import "../../CSS/Navbar.css";
import { assets } from "../../assets/assets";
import { Menu } from "lucide-react";

const Navbar = ({ toggleSidebar }) => {
  // 👈 PASS TOGGLE FUNCTION AS PROP
  // The existing 'isOpen' state is fine, but it should control the *sidebar's* state.
  // However, it's generally cleaner for the *parent* component to manage the sidebar's
  // state and pass a toggle function down. Let's assume you pass a function.

  // If you MUST control the sidebar from the Navbar, the logic changes,
  // but the best practice is to pass a prop.

  return (
    <div className="navbar-container">
      {/* 💡 MOBILE-FIRST EDIT: Add a toggle button for the sidebar */}
      <button
        className="sidebar-toggle-btn"
        onClick={toggleSidebar}
        aria-label="Toggle Navigation Menu" // 👈 Call the function passed from the parent
      >
        {/* We don't need a state here just to decide which icon to show 
                    if the component's main job is just to toggle the parent's state. 
                    We'll just show the Menu icon (hamburger). 
                */}
        <Menu size={25} color="#000" />
      </button>

      <div className="user-info-section">
        <img
          src={assets.profile}
          alt="user profile"
          className="patient-profile"
        />
        <div className="greeting-text">
          <p className="user-name-text">Hi, Vincent Caraga</p>
          <p className="greeting-subtext">How are you today?</p>
        </div>
      </div>

      <div className="notification-bell">
        <img src={assets.bell} alt="bell icon" className="bell-icon" />
      </div>

      <div className="main-content"></div>
    </div>
  );
};
export default Navbar;
