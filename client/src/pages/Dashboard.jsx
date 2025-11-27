import React from "react";
import "../CSS/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Pending section */}
      <div className="appointment-card">
        <p>You're appointment still pending.</p>
        <p>Doctor Name</p>

        <div className="status-bar pending-status">PENDING</div>
      </div>
      {/* Approved Section */}
      <div className="appointment-card">
        <p>You're appointment was approved.</p>
        <p>Doctor Name</p>

        <div className="status-bar approved-status">APPROVED</div>
      </div>
      {/* Cancelled Section */}
      <div className="appointment-card">
        <p>You're appointment was cancelled.</p>
        <p>Doctor Name</p>

        <div className="status-bar cancelled-status">CANCELLED</div>
      </div>
    </div>
  );
};

export default Dashboard;
