import React from "react";
import "../../CSS/UserNavbar.css";

const UserNavbar = () => {
  return (
    <nav className="navbar">
      {/* Brand/Logo on the left */}
      <div className="navbar-brand">
        <a href="/">MyApp</a>
      </div>

      {/* Navigation links on the right */}
      <ul className="navbar-links">
        <li>
          <a href="/home">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/services">Services</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default UserNavbar;
