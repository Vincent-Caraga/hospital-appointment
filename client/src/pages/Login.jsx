import React, { useState } from "react";
import "../CSS/Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(
        "https://health-sphere-1gb1.onrender.com/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("firstname", data.firstname);
        localStorage.setItem("lastname", data.lastname);
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-logo">HEALTH SPHERE MEDICAL CENTER</h1>
        <p className="login-title">
          “Welcome to Health Sphere, where compassionate care meets medical
          excellence.”
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="password-input"
            />
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showPassword">Show password</label>
            </div>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>

          <div className="login-links">
            <a href="/forgot-password">Forgot Password?</a>
            <p>
              New Patient? <Link to="/register"> Register here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
