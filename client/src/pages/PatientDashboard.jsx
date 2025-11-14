import React, { useState, useEffect } from "react";
import "../CSS/PatientDashboard.css";
import { useNavigate } from "react-router-dom";

// --- START useDebounce Hook ---
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
// --- END useDebounce Hook ---

function PatientDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  // ⭐️ Performance Fix: Use the debounced value for the API call
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBookNow = (doctorId) => {
    navigate(`/book/${doctorId}`);
  };

  // Fetch doctors whenever specialty or the DEBOUNCED term changes
  useEffect(() => {
    // ⭐️ Stability Fix: Use AbortController for race condition cleanup
    const controller = new AbortController();
    const signal = controller.signal;

    console.log("Fetching doctors with:", {
      selectedSpecialty,
      debouncedSearchTerm,
    });

    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/doctors?name=${debouncedSearchTerm}&specialty=${selectedSpecialty}`,
          { signal } // Pass the abort signal
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setDoctors(data);
      } catch (error) {
        // Ignore the error if it was a deliberate abort
        if (error.name !== "AbortError") {
          console.error("Error fetching doctors.", error);
          setDoctors([]);
        }
      } finally {
        // Only set loading to false if the request was NOT aborted
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchDoctors();

    // Cleanup: Abort the request when dependencies change or component unmounts
    return () => controller.abort();

    // ⭐️ Dependency: Use the debounced value here to trigger the fetch after typing stops
  }, [selectedSpecialty, debouncedSearchTerm]);

  return (
    <div className="container">
      <h2>Doctor / Specialty Search</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search a Doctor's Name..."
        value={searchTerm}
        // NOTE: We still update searchTerm instantly for a smooth typing experience
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
        <option value="Cardiologist">Cardiologist</option>
        <option value="Pediatrician">Pediatrician</option>
        <option value="Neurologist">Neurologist</option>
        <option value="Dentist">Dentist</option>
        <option value="Dermatologist">Dermatologist</option>
        <option value="Ophthalmologist">Ophthalmologist</option>
      </select>

      {/* List of Doctors */}
      <h3>Available Doctors ({doctors.length})</h3>

      {loading ? (
        <p>Loading...</p>
      ) : (
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
      )}
    </div>
  );
}

export default PatientDashboard;
