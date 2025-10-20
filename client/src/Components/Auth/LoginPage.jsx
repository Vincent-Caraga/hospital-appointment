import React, { useState } from "react";
import "../../CSS/LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); //Clear previous errors

    // Backend API call
    if (email === "m.santos@hospital.com" && password === "password123") {
      console.log("Login successful!");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-logo">Hospital Appointment</h1>
        <p className="login-title">Sign in to book or manage appointments</p>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required="true"
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>

          <div className="login-links">
            <a href="/forgot-password">Forgot Password?</a>
            <p>
              New Patient? <a href="/register">Register Here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
