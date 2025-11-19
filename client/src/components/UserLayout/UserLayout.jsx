import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  return (
    <div className="layout">
      {/* Passing it open / closed state */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <Navbar onProfileClick={toggleSidebar} />

      <div className="main content"></div>
    </div>
  );
};

export default UserLayout;
