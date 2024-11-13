import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SetPreferences from "./pages/SetPreferences";

import "./index.css"

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <div className="main-content mx-auto">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/set-preferences" element={<SetPreferences />} />
                        <Route path="/search" element={<SearchPage />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
