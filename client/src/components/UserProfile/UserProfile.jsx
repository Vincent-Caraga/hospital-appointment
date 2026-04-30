import React, { useState } from "react";
import "../../CSS/UserProfile.css";
import { useEffect } from "react";

const UserProfile = () => {
  const [profileData, setProfileData] = useState({
    lastname: "",
    firstname: "",
    middlename: "",
    address: "",
    zipcode: "",
    sex: "",
    dateOfBirth: "",
    placeOfBirth: "",
    civilStatus: "",
    citizenship: "",
    telephone: "",
    mobileNo: "",
    emailAddress: "",
  });
  const userId = localStorage.getItem("userId");

  // API Integration
  // The URL of API endpoint to update the user profile
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/profile/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) =>
        setProfileData((prev) => ({
          ...prev,
          dateOfBirth: data.dateOfBirth,
          emailAddress: data.userEmail || data.patientEmail,
        })),
      );
  }, [userId]);

  //HandleChange to function the form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission (Update profile)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/profile/${userId}`, {
        // Use  PUT for updating resource
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(profileData), // Convert the JavaScript object to a JSON string
      });

      if (response.ok) {
        // The update was successful
        const result = await response.json(); // Get the response body from the server
        console.log("Profile Updated Successfully:", result);
        alert("Profile Updated Successfully!");
      } else {
        //The server responded with an error status
        const errorData = await response.json();
        console.error("Profile Update Failed:", errorData);
        alert(`Profile Update Failed: ${errorData.message || "Server Error"}`);
      }
    } catch (error) {
      console.error("Network Error during Profile Update:", error);
      alert("A new network occured. Please try again.");
    }
  };

  // Helper component for a single input field
  const InputField = ({
    label,
    name,
    value,
    onChange,
    required = true,
    hint = null,
    type = "text", // 'type' prop with default value
  }) => (
    <div className="form-group">
      <label htmlFor={name}>
        {required ? "*" : ""}
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value || ""}
        onChange={onChange}
        required={required}
      />
      {hint && <span className="input-hint">{hint}</span>}
    </div>
  );

  return (
    <form className="profile-form-container" onSubmit={handleSubmit}>
      <h2>Personal Information</h2>

      {/* --Row 1: Name -- */}
      <div className="form-row three-col">
        <InputField
          label="LAST NAME"
          name="lastname"
          value={profileData.lastname}
          onChange={handleChange}
        />
        <InputField
          label="FIRST NAME"
          name="firstname"
          value={profileData.firstname}
          onChange={handleChange}
        />
        <InputField
          label="MIDDLE NAME"
          name="middlename"
          value={profileData.middlename}
          onChange={handleChange}
          required={false}
          hint="Leave blank if Not Applicable"
        />
      </div>

      {/* --Row 2: Address -- */}
      <div className="form-row address-row">
        <InputField
          label="COMPLETE HOME ADDRESS"
          name="address"
          value={profileData.address}
          onChange={handleChange}
          hint="Maximum of 80 characters acceptable."
        />
        <InputField
          label="ZIP CODE"
          name="zipcode"
          value={profileData.zipcode}
          onChange={handleChange}
          type="text"
        />
      </div>

      {/* --Row 3: Personal Details */}
      <div className="form-row five-col">
        <div className="form-group">
          <label htmlFor="sex">*SEX</label>
          <select
            id="sex"
            name="sex"
            value={profileData.sex}
            onChange={handleChange}
            required
          >
            <option value="">Select...</option>
            <option value="Male">MALE</option>
            <option value="Female">FEMALE</option>
          </select>
        </div>

        <InputField
          label="DATE OF BIRTH"
          name="dateOfBirth"
          value={profileData.dateOfBirth}
          onChange={handleChange}
          type="date"
        />
        <InputField
          label="PLACE OF BIRTH"
          name="placeOfBirth"
          value={profileData.placeOfBirth}
          onChange={handleChange}
          hint="City or Municipality and Province"
        />
        <div className="form-group">
          <label htmlFor="civilstatus">*CIVIL STATUS</label>
          <select
            id="civilStatus"
            name="civilStatus"
            value={profileData.civilStatus}
            onChange={handleChange}
            required
          >
            <option value="">Select...</option>
            <option value="Single">SINGLE</option>
            <option value="Married">MARRIED</option>
            <option value="Divorced">DIVORCED</option>
            <option value="Separated">SEPARATED</option>
            <option value="Other">OTHER</option>
          </select>
        </div>
      </div>
      {/* --Row 4: Contact Details */}
      <div className="form-row four-col">
        <InputField
          label="CITIZENSHIP"
          name="citizenship"
          value={profileData.citizenship}
          onChange={handleChange}
        />
        <InputField
          label="TELEPHONE NO."
          name="telephone"
          value={profileData.telephone}
          onChange={handleChange}
          required={false}
          type="tel"
        />
        <InputField
          label="MOBILE PHONE NO."
          name="mobileNo"
          value={profileData.mobileNo}
          onChange={handleChange}
          type="tel"
        />
        <InputField
          label="EMAIL ADDRESS"
          name="emailAddress"
          value={profileData.emailAddress}
          onChange={handleChange}
          type="email"
        />
      </div>

      {/* Submit Button */}
      <div className="form-actions">
        <button type="submit" className="update-button">
          Update Profile
        </button>
      </div>
    </form>
  );
};

export default UserProfile;
