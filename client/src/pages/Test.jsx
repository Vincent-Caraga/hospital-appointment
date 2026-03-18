import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../CSS/Test.css";

const Test = () => {
  //Get the current date as starting point
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(2026, 2, 1)); //Default: March 2026
  const [selectedDate, setSelectedDate] = useState(20);
  const [selectedTime, setSelectedTime] = useState(null);

  //Functions for Calendar Math
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth(); //0 = Jan, 2 = Mar

  const totalDays = daysInMonth(year, month);
  const startBlankSpaces = firstDayOfMonth(year, month);

  //Array for grid
  const calendarGrid = [
    ...Array(startBlankSpaces).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  //Action handlers
  const handleMonthChange = (newMonth) => {
    //Updating the viewDate in the same year
    setViewDate(new Date(year, newMonth, 1));
    setSelectedDate(null); //Reset date if month change
  };

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <>
      <div className="test-page">
        <div className="appointment-card">
          <div className="header-blue">
            <p className="title">Appointment Schedule</p>
            <div className="month-row">
              {[2, 3].map((mIndex) => (
                <span
                  key={mIndex}
                  className={month === mIndex ? "m-tab active" : "m-tab"}
                  onClick={() => handleMonthChange(mIndex)}
                >
                  {monthNames[mIndex]}
                </span>
              ))}
            </div>
          </div>

          {/*Calendar Body*/}
          <div className="calendar-section">
            <div className="days-label">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>

            <div className="dates-grid">
              {calendarGrid.map((day, index) => (
                <div
                  key={index}
                  className={`date-cell ${day === null ? "empty" : ""} ${day === selected ? "active-day" : ""}`}
                  onClick={() => day && setSelectedTime(day)}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
