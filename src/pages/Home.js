import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MarketingMaterial from "../components/MarketingMaterial";
import Recommendations from "../components/Recommendations";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      const fetchInitPreferences = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/user/init-preferences", {
            method: "GET",
            headers: { "x-auth-token": token },
          });

          const data = await response.json();

          if (response.ok) {
            if (data.init_preferences === false) {
              navigate("/set-preferences");
            } else {
              fetchUserProfile(token);
              fetchRecommendations(token);
              fetchConnectedUsers(token);
            }
          } else {
            console.log("Error fetching init_preferences:", data.msg);
          }
        } catch (error) {
          console.error("Error fetching init_preferences:", error);
        }
      };

      const fetchUserProfile = async (token) => {
        try {
          const response = await fetch("http://localhost:5000/api/user/profile", {
            method: "GET",
            headers: { "x-auth-token": token },
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

      const fetchRecommendations = async (token) => {
        try {
          const response = await fetch("http://localhost:5000/api/recommendations/recommendations", {
            method: "GET",
            headers: { "x-auth-token": token },
          });

          const data = await response.json();

          if (response.ok) {
            setRecommendations(data.recommendations);
          } else {
            console.log("Error fetching recommendations:", data.msg);
          }
        } catch (error) {
          console.error("Error fetching recommendations:", error);
        }
      };

      fetchInitPreferences();
    }
  }, [navigate]);

  const fetchConnectedUsers = async (token) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/connections", {
        method: "GET",
        headers: { "x-auth-token": token },
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (error) {
        console.error("Failed to parse response as JSON:", error);
        return;
      }

      if (response.ok && Array.isArray(data.connections)) {
        setConnectedUsers(data.connections);
      } else {
        console.log("Error fetching connected users:", data.msg || "Unexpected data format");
        setConnectedUsers([]);
      }
    } catch (error) {
      console.error("Error fetching connected users:", error);
      setConnectedUsers([]);
    }
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleConnect = async (recommendedUserId) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(`http://localhost:5000/api/user/connect/${recommendedUserId}`, {
        method: "POST",
        headers: {
          "x-auth-token": token,
        },
      });

      const data = await response.json();

      if (response.ok) {
        fetchConnectedUsers(token);
      } else {
        alert("Error connecting with user: " + data.msg);
      }
    } catch (error) {
      console.error("Error connecting with user:", error);
    }
  };

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  return (
    <div className="w-full h-screen mx-auto flex justify-center items-center">
      {isLoggedIn && userEmail ? (
        <>
          <Recommendations recommendations={recommendations} connectedUsers={connectedUsers} handleConnect={handleConnect} />
        </>
      ) : (
        <MarketingMaterial />
      )}
    </div>
  );
};

export default Home;
