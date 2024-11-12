import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/" className="text-lg font-semibold hover:text-gray-300">
            Home
          </Link>
          {!isLoggedIn && (
            <>
              <Link to="/login" className="text-lg font-semibold hover:text-gray-300">
                Login
              </Link>
              <Link to="/signup" className="text-lg font-semibold hover:text-gray-300">
                Signup
              </Link>
            </>
          )}
        </div>

        {isLoggedIn && (
          <div className="flex space-x-4">
            <button
              className="text-lg font-semibold hover:text-gray-300"
              onClick={() => {
                // Simulate logout by removing the token
                localStorage.removeItem("authToken");
                setIsLoggedIn(false);
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
