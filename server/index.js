const express = require("express");
const cors = require("cors");
const app = express();
const { Pool } = require("pg"); // Import Pool from pg
require("dotenv").config(); //Load environent variables from .env files

//Database Configuration (POSTGRESQL)
// Connection Logic
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// Test query
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection error", err);
  } else {
    console.log("Database connected:", res.rows[0].now);
  }
});

//MIDDLEWARE
app.use(cors());
app.use(express.json()); //Allows server to read JSON data from the client side

//Test Route
app.get("/", (req, res) => {
  res.send("Server is running! Ready for appointments.");
});

//A. GET ALL DOCTORS ROUTE
app.get("/api/doctors", async (req, res) => {
  let { name, specialty } = req.query;

  //Ensure variables are either a non-empty string or null
  const querySpecialty =
    specialty && specialty.trim() !== "" ? specialty.trim() : null;
  const queryName = name && name.trim() !== "" ? name.trim() : null;

  console.log("Query params:", { querySpecialty, queryName });

  try {
    const query = `
      SELECT doctor_id, first_name, last_name, specialty, email
      FROM doctors
      WHERE ($1::text IS NULL OR specialty ILIKE '%' || $1 || '%')
      AND (
        $2::text IS NULL OR
        first_name ILIKE '%' || $2 || '%' OR
        last_name ILIKE '%' || $2 || '%' OR
        CONCAT(first_name, ' ', last_name) ILIKE '%' || $2 || '%'
      )
    `;
    const result = await pool.query(query, [querySpecialty, queryName]);
    console.log("Doctors found:", result.rows.length);
    res.json(result.rows);
  } catch (err) {
    console.error("Error executing query:", err.message);
    res.status(500).send("Server Error");
  }
});

//B. GET ALL APPOINTMENTS (Sample POST)
app.post("/api/appointments", async (req, res) => {
  try {
    //Assume you are sending patient_id, doctor_id, date, and reason from the frontend
    const { patient_id, doctor_id, appointment_date, reason } = req.body;

    const newAppointment = await pool.query(
      "INSERT INTO appointments (patient_id, doctor_id, appointment_date, reason) VALUES ($1, $2, $3, $4) RETURNING *",
      [patient_id, doctor_id, appointment_date, reason]
    );
    res.json(newAppointment.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed to create appointment");
  }
});

//C. UPDATE USER PROFILE
app.put("api/profile/:id", async (req, res) => {
  //Get the user ID from the URL parameter
  const { patient_id } = req.params;

  //Destructure the data sent from the React from (req.body)
  const {
    lastname,
    firstname,
    middlename,
    address,
    zipcode,
    sex,
    dateOfBirth,
    placeOfBirth,
    civilStatus,
    citizenship,
    telephone,
    mobileNo,
    emailAddress,
  } = req.body;

  //Convert date format for PostgreSQL
  let dbDateOfBirth = null;
  if (dateOfBirth) {
    //Simple conversion of date format to YYYY-MM-DD
    const parts = dateOfBirth.split("/");
    dbDateOfBirth = parts.length === 3 ? ``
  }
});

//START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
