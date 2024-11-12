import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      const fetchInitPreferences = async () => {
        try {
          // Fetch init_preferences
          const response = await fetch("http://localhost:5000/api/user/init-preferences", {
            method: "GET",
            headers: {
              "x-auth-token": token,
            },
          });

          const data = await response.json();

          if (response.ok) {
            if (data.init_preferences === false) {
              // If preferences are not initialized, redirect
              navigate("/set-preferences");
            } else {
              // If preferences are initialized, fetch the profile data
              fetchUserProfile();
            }
          } else {
            console.log("Error fetching init_preferences:", data.msg);
          }
        } catch (error) {
          console.error("Error fetching init_preferences:", error);
        }
      };

      const fetchUserProfile = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/user/profile", {
            method: "GET",
            headers: {
              "x-auth-token": token,
            },
          });

          const data = await response.json();

          if (response.ok) {
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setUserEmail(data.email);
          } else {
            console.log("Error fetching user profile:", data.msg);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };

      fetchInitPreferences();
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold text-center mt-10">
          Welcome to the Home Page
        </h1>
        {userEmail ? (
          <p className="text-center mt-4">Hello, {firstName} {lastName}</p>
        ) : (
          <p className="text-center mt-4">Please log in to continue</p>
        )}
      </div>
    </div>
  );
};

export default Home;
