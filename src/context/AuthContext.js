import React, { createContext, useContext, useState, useEffect } from 'react';

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Function to log in and set the user data
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("authToken", userData.token); // Save token to localStorage
    };

    // Function to log out and clear user data
    const logout = () => {
        setUser(null);
        localStorage.removeItem("authToken"); // Remove token from localStorage
    };

    // Check localStorage for token to maintain login state on refresh
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            // Set a placeholder user object; replace with a real user fetch if needed
            setUser({ token });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to access auth context
export const useAuth = () => useContext(AuthContext);
