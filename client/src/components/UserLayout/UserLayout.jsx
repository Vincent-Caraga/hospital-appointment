import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import Sidebar from "../Sidebar/Sidebar";
import PatientDashboard from "../../pages/PatientDashboard";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  //Get the role of last save in login from localStorage
  const userRole = localStorage.getItem("role");

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  return (
    <div className="layout">
      {/*Conditional Rendering*/}
      {userRole === "SuperAdmin" ? (
        <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      ) : (
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}

      {/*Main container for Navbar and Content*/}
      <div className={`main-container ${isSidebarOpen ? "shifted" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <AdminSidebar toggleSidebar={toggleSidebar} />
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
