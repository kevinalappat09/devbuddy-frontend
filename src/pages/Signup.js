import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    githubProfile: "",
    linkedinProfile: "",
  });

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, githubProfile, linkedinProfile } = formData;

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          githubProfile,
          linkedinProfile,
          firstName,
          lastName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login"); // Redirect to login page
      } else {
        alert("Error: " + data.msg); // Show error message if signup fails
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side: Gradient background and circles with text */}
      <div className="w-1/2 bg-gradient-to-b from-orange-500 to-orange-800 relative flex items-center justify-center">
        {/* Large Circles near the edges */}

        {/* Text inside the left graphic area */}
        <div className="absolute text-white text-4xl font-bold">
          Sign Up To Connect Now
        </div>
      </div>

      {/* Right side: Sign up form taking most of the width */}
      <div className="w-1/2 p-8 flex justify-center items-center">
        <form className="w-full max-w-lg space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-3xl text-center font-semibold text-gray-800 mb-6">Sign Up</h2>

          {/* First Name Input */}
          <div className="relative">
            <label className="text-sm text-gray-500">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
              value={formData.firstName}
              onChange={handleChange}
              name="firstName"
              required
            />
          </div>

          {/* Last Name Input */}
          <div className="relative">
            <label className="text-sm text-gray-500">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
              value={formData.lastName}
              onChange={handleChange}
              name="lastName"
              required
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <label className="text-sm text-gray-500">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
              value={formData.email}
              onChange={handleChange}
              name="email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label className="text-sm text-gray-500">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
              value={formData.password}
              onChange={handleChange}
              name="password"
              required
            />
          </div>

          {/* GitHub Profile Input */}
          <div className="relative">
            <label className="text-sm text-gray-500">GitHub Profile URL</label>
            <input
              type="url"
              placeholder="GitHub Profile URL"
              className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
              value={formData.githubProfile}
              onChange={handleChange}
              name="githubProfile"
              required
            />
          </div>

          {/* LinkedIn Profile Input */}
          <div className="relative">
            <label className="text-sm text-gray-500">LinkedIn Profile URL</label>
            <input
              type="url"
              placeholder="LinkedIn Profile URL"
              className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
              value={formData.linkedinProfile}
              onChange={handleChange}
              name="linkedinProfile"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 text-white text-lg rounded-md border-4 border-transparent hover:bg-white hover:text-orange-500 hover:border-orange-500 focus:ring-2 focus:ring-orange-500 transition-colors"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
