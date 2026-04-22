const express = require("express");
const cors = require("cors");
const { Pool } = require("pg"); // Import Pool from pg
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config(); //Load environent variables from .env files

const app = express();
//MIDDLEWARE
// Palitan ang app.use(cors()) nito:
app.use(
  cors({
    origin: "https://hospital-sphere.vercel.app", // allowing all websites
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
app.use(express.json()); //Allows server to read JSON data from the client side

//Database Configuration (POSTGRESQL)
// Connection Logic

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const SECRET_KEY = process.env.JWT_SECRET;

// Test query
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection error", err);
  } else {
    console.log("Database connected:", res.rows[0].now);
  }
});
// Login (generate JWT)

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.user_id, username: user.username, role: user.role },
      SECRET_KEY,
      { expiresIn: "1h" },
    );
    res.json({
      token,
      userId: user.user_id,
      firstname: user.first_name,
      lastname: user.last_name,
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Login failed" });
  }
});

// Middleware to check the JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token" });
    req.user = user; //attach user info for request
    next();
  });
}

//Test Route
app.get("/", (req, res) => {
  res.send("Server is running! Ready for appointments.");
});

// Protected Routes
app.get("/patients", authenticateToken, (req, res) => {
  res.json({ message: "List of patients", user: req.user });
});

app.post("/appointments", authenticateToken, (req, res) => {
  res.json({ message: "Appointment created", user: req.user });
});

// User Registration (hash password)

app.post("/api/register", async (req, res) => {
  const { username, firstname, lastname, birthdate, email, password } =
    req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (username, first_name, last_name, birthdate, email, password_hash, role, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, 'patient', NOW(), NOW())
      RETURNING user_id, username, first_name, last_name, email, role`,
      [username, firstname, lastname, birthdate, email, hashedPassword],
    );

    res.json({ message: "User registered successfully", user: result.rows[0] });
  } catch (err) {
    console.error("Error registering user:", err.message);
    res.status(500).json({ error: "Registration failed" });
  }
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

//B. CREATE APPOINTMENT
app.post("/api/appointments", async (req, res) => {
  try {
    const { patient_name, doctor_id, appointment_date, appointment_time } =
      req.body;

    const newAppointment = await pool.query(
      `INSERT INTO appointments (patient_name, doctor_id, appointment_date, appointment_time, status) VALUES ($1, $2, $3, $4, 'pending') RETURNING *`,
      [patient_name, doctor_id, appointment_date, appointment_time],
    );
    res.json(newAppointment.rows[0]);
  } catch (err) {
    console.error("Booking Error", err.message);
    res.status(500).json({ error: "Failed to create appointment" });
  }
});

//C. CHECK BOOKED SLOTS
// This will check by React if user choose a date on a calendar
app.get("/api/appointments/booked/:doctorId/:date", async (req, res) => {
  try {
    const { doctorId, date } = req.params;
    const result = await pool.query(
      "SELECT appointment_time FROM appointments WHERE doctor_id = $1 AND appointment_date = $2 AND status != 'cancelled'",
      [doctorId, date],
    );
    //Return of array for time
    res.json(result.rows.map((row) => row.appointment_time));
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//D. UPDATE USER PROFILE
app.put("/api/profile/:id", async (req, res) => {
  //Get the user ID from the URL parameter
  const { id } = req.params;

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
    dbDateOfBirth =
      parts.length === 3 ? `${parts[2]}-${parts[0]}-${parts[1]}` : dateOfBirth;
  }

  try {
    const updateQuery = `
    UPDATE patients
    SET
      lastname = $1,
      firstname = $2,
      middlename = $3,
      address = $4,
      zipcode = $5,
      sex = $6,
      date_of_birth = $7,
      place_of_birth = $8,
      civil_status = $9,
      citizenship = $10,
      telephone = $11,
      mobile_no = $12,
      email_address = $13
    WHERE patient_id = $14
    RETURNING *;
    `;
    const values = [
      lastname,
      firstname,
      middlename,
      address,
      zipcode,
      sex,
      dbDateOfBirth,
      placeOfBirth,
      civilStatus,
      citizenship,
      telephone,
      mobileNo,
      emailAddress,
      id, // The user_id goes last
    ];

    const result = await pool.query(updateQuery, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    console.log("Profile updated for user ID:", id);
    res.json({
      message: "Profile updated successfully",
      user: result.rows[0],
    });
  } catch (err) {
    console.error("Error updating profile:", err.message);
    res.status(500).send("Failed to update profile");
  }
});

//START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
