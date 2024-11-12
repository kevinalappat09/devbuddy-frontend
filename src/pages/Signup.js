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
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-6 text-center font-semibold">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* First Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Last Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Github Profile Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold" htmlFor="githubProfile">
              GitHub Profile URL
            </label>
            <input
              type="url"
              id="githubProfile"
              name="githubProfile"
              value={formData.githubProfile}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* LinkedIn Profile Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold" htmlFor="linkedinProfile">
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              id="linkedinProfile"
              name="linkedinProfile"
              value={formData.linkedinProfile}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded mt-6"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
