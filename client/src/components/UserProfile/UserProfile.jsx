import React, { useState } from "react";

const UserProfile = () => {
  //Test User Input
  const [profileData, setProfileData] = useState({
    lastname: "CARAGA",
    firstname: "VINCENT",
    middlename: "CABREJAS",
    address:
      "BLOCK 5 LOT, PHASE 9, BENEVENTO ST. LESSANDRA, SALINAS 1, BACOOR CITY, CAVITE",
    zipcode: "4102",
    sex: "Male",
    dateOfBirth: "03/23/1998",
    placeOfBirth: "BACOOR, CAVITE",
    civilStatus: "SINGLE",
    citizenship: "FILIPINO",
    telephone: "",
    mobileNo: "09392283694",
    emailAddress: "vincentccaraga@gmail.com",
  });

  // Function to handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission (Update profile)
  const handleSubmit = (e) => {
    e.preventDefault();

    // API Integration
    console.log("Updating Profile:", profileData);
    alert("Profile Updated Successfully");
  };

  // Helper component for a single input field
  const InputField = ({
    label,
    name,
    value,
    onChange,
    required = true,
    hint = null,
  }) => (
    <div className="form-group">
      <label htmlFor={name}>
        {required ? "*" : ""}
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
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
          value={profileData.zipcode}
          onChange={handleChange}
        />
      </div>

      {/* --Row Personal Details */}
      <div className="form-row five-col">
        <InputField
          label="SEX"
          name="sex"
          value={profileData.sex}
          onChange={handleChange}
        />
        <InputField
          label="DATE OF BIRTH"
          name="dateOfBirth"
          value={profileData.dateOfBirth}
          onChange={handleChange}
        />
        <InputField label="PLACE OF BIRTH" />
      </div>
    </form>
  );
};

export default UserProfile;
