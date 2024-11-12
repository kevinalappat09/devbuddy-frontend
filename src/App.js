import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login"; // Import the Login page
import Signup from "./pages/Signup";
import SetPreferences from "./pages/SetPreferences";

import '@fortawesome/fontawesome-free/css/all.min.css';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>  
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/set-preferences" element={<SetPreferences />} />
      </Routes>
    </Router>
  );
};

export default App;
