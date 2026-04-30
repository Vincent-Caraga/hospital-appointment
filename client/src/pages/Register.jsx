import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../CSS/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    birthdate: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    //Required fields check
    if (
      !formData.username ||
      !formData.firstname ||
      !formData.lastname ||
      !formData.email
    ) {
      setMessage("Please fill in all required fields.");
      return;
    }

    //Password match check
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch(
        "https://health-sphere-1gb1.onrender.com/api/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            firstname: formData.firstname,
            lastname: formData.lastname,
            birthdate: formData.birthdate,
            email: formData.email,
            password: formData.password,
          }),
        },
      );

      const data = await res.json();

      if (res.ok) {
        setMessage("Registration successful");
        localStorage.setItem("userId", data.user.user_id);
        localStorage.setItem("token", data.token);
        window.location.href = "/user-profile";

        setFormData({
          username: "",
          firstname: "",
          lastname: "",
          birthdate: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error. Please try again later");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
          />
          <input
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
          />
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {/* Password field with show/hide */}
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Confirm Password field */}
          <div className="password-field">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <span
              className="eye-icon"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit">Register</button>
        </form>
        {message && <p className="register-message">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
