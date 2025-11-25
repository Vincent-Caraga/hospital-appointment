import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import PatientDashboard from "../../pages/PatientDashboard";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  return (
    <div className="layout">
      {/* Passing it open / closed state */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <Navbar toggleSidebar={toggleSidebar} />

      <div className="main content">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
