import React, { useState, useEffect } from "react";
import "../CSS/PatientDashboard.css";
import { useNavigate } from "react-router-dom"; //Assuming I will use react-router-dom for navigation

function PatientDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBookNow = (doctorId) => {
    navigate(`/book/${doctorId}`);
  };

  // Fetch specialties from API
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/doctors?specialty=${selectedSpecialty}&name=${searchTerm}`
        ); // Fetch for all doctors
        const data = await res.json();

        // Optional: filter by name or specialty client-side
        let filtered = data;

        if (selectedSpecialty) {
          filtered = filtered.filter(
            (doc) => doc.specialty === selectedSpecialty
          );
        }
        if (searchTerm) {
          filtered = filtered.filter((doc) =>
            `${doc.first_name} ${doc.last_name}`
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          );
        }
        setDoctors(filtered);
      } catch (error) {
        console.error("Error fetching doctors.", error);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, [selectedSpecialty, searchTerm]);

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
        {/* From my API list */}
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
            <div key={doctor.doctor_id} className="doctor-card">
              <div className="doctor-info">
                <strong>
                  Dr. {doctor.first_name} {doctor.last_name}
                </strong>{" "}
                - <span className="doctor-specialty">{doctor.specialty}</span>
                <p className="doctor-email">{doctor.email}</p>
              </div>
              <button
                className="book-btn"
                onClick={() => handleBookNow(doctor.doctor_id)}
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
