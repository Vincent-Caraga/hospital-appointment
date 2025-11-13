import React, { useState, useEffect } from "react";
import "../CSS/PatientDashboard.css";
import { useNavigate } from "react-router-dom"; //Assuming I will use react-router-dom for navigation

// DUMMY DATA
const DUMMY_DOCTORS = [
  {
    id: 7,
    firstname: "Juan",
    lastname: "Lonzana",
    specialty: "OB/GYNs",
    email: "juan.lonzana@hospital.com",
  },
  {
    id: 8,
    firstname: "Michelle",
    lastname: "Almencion",
    specialty: "Nephrologist",
    email: "michelle.almencion@hospital.com",
  },
];

function PatientDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let filtered = DUMMY_DOCTORS;

    if (selectedSpecialty) {
      filtered = filtered.filter((doc) => doc.specialty === selectedSpecialty);
    }

    if (searchTerm) {
      filtered = filtered.filter((doc) =>
        doc.lastname.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setDoctors(filtered);
  }, [selectedSpecialty, searchTerm]);

  //Navigate to schedule selection screen
  const handleBookNow = (doctorId) => {
    //Navigate to the booking screen, passing the doctorId
    navigate(`/book/${doctorId}`);
  };

  return (
    <div className="container">
      <h2>Doctor / Specialty Search</h2>

      {/* Search Bar */}

      <input
        type="text"
        placeholder="Search a Doctor's Name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Dropdown Filter */}
      <select
        value={selectedSpecialty}
        onChange={(e) => setSelectedSpecialty(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "20px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <option value="">All Specialty</option>
        {/* I will put from my API the list of specialty */}
        <option value="Cardiology">Cardiology</option>
        <option value="Pediatrics">Pediatrics</option>
        <option value="Neurology">Neurology</option>
        <option value="Dentistry">Dentistry</option>
        <option value="Dermatology">Dermatology</option>
        <option value="Opthalmology">Opthalmology</option>
      </select>

      {/* List of Doctors */}
      <h3>Available Doctors ({doctors.length})</h3>
      <div className="doctor-list">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <div className="doctor-info">
                <strong>
                  Dr. {doctor.firstname} {doctor.lastname}
                </strong>{" "}
                - <span className="doctor-specialty">{doctor.specialty}</span>
                <p className="doctor-email">{doctor.email}</p>
              </div>
              <button
                className="book-btn"
                onClick={() => handleBookNow(doctor.id)}
              >
                Book Now / View Schedule
              </button>
            </div>
          ))
        ) : (
          <p>No available Doctor.</p>
        )}
      </div>
    </div>
  );
}

export default PatientDashboard;
