import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../CSS/Test.css";

const Test = () => {
  // Kunin ang current date bilang starting point
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(2026, 2, 1)); // Default: March 2026
  const [selectedDate, setSelectedDate] = useState(20);
  const [selectedTime, setSelectedTime] = useState(null);

  // Helper functions para sa Calendar Math
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth(); // 0 = Jan, 2 = Mar

  const totalDays = daysInMonth(year, month);
  const startBlankSpaces = firstDayOfMonth(year, month);

  // Array para sa grid (mga patlang + mga numero)
  const calendarGrid = [
    ...Array(startBlankSpaces).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  const handleMonthChange = (monthIndex) => {
    setViewDate(new Date(year, monthIndex, 1));
    setSelectedDate(null); // Reset select paglipat ng buwan
  };

  return (
    <div className="test-page">
      <div className="appointment-card">
        {/* Blue Header */}
        <div className="header-blue">
          <p className="title">Appointment Schedule</p>
          <div className="month-row">
            <span
              className={month === 2 ? "m-tab active" : "m-tab"}
              onClick={() => handleMonthChange(2)}
            >
              Mar
            </span>
            <span
              className={month === 3 ? "m-tab active" : "m-tab"}
              onClick={() => handleMonthChange(3)}
            >
              Apr
            </span>
          </div>
        </div>

        {/* Calendar Body */}
        <div className="calendar-section">
          <div className="days-label">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          <div className="dates-grid">
            {calendarGrid.map((day, index) => (
              <div
                key={index}
                className={`date-cell ${day === null ? "empty" : ""} ${day === selectedDate ? "active-day" : ""}`}
                onClick={() => day && setSelectedDate(day)}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Time Selection & Footer (Tuloy mo lang yung dati mong code dito) */}
        <div className="time-section">
          <p className="select-text">Select available time</p>
          <div className="time-grid">
            {["09:30 am", "11:30 am", "02:30 pm"].map((time) => (
              <button
                key={time}
                className={selectedTime === time ? "t-btn active" : "t-btn"}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <button className="check-btn">Check schedule</button>
      </div>
    </div>
  );
};

export default Test;
