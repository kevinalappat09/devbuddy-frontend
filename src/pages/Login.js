import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Destructure login function from context

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        // Call the login function from context to update the state
        login(data.token); // Assuming the token is returned in the response

        // Optionally save the token in localStorage
        localStorage.setItem("authToken", data.token);

        // Redirect to home page after successful login
        navigate("/");
      } else {
        setErrorMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      setErrorMessage("Error logging in");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side: Gradient background and circles with text */}
      <div className="w-1/2 bg-gradient-to-b from-orange-500 to-orange-800 relative flex items-center justify-center">
        {/* Large Circles near the edges */}

        {/* Text inside the left graphic area */}
        <div className="absolute text-white text-4xl font-bold">
          Login To Connect Now
        </div>
      </div>

      {/* Right side: Login form taking most of the width */}
      <div className="w-1/2 p-8 flex justify-center items-center">
        <form className="w-full max-w-lg space-y-6" onSubmit={handleLogin}>
          <h2 className="text-3xl text-center font-semibold text-gray-800 mb-6">Login</h2>

          {/* Email Input */}
          <div className="relative">
            <label className="text-sm text-gray-500">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label className="stext-sm text-gray-500">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="text-red-500 text-center mt-2">{errorMessage}</div>
          )}

          {/* Login Button */}
          <button
  type="submit"
  className="w-full py-3 bg-orange-500 text-white text-lg rounded-md border-4 border-transparent hover:bg-white hover:text-orange-500 hover:border-orange-500 focus:ring-2 focus:ring-orange-500 transition-colors"
>
  Login
</button>

        </form>
      </div>
    </div>
  );
};

export default Login;
