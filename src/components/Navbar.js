import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-primary text-secondary px-6 py-3 flex justify-between items-center shadow-lg">
            <div className="font-bold text-2xl">DevBuddy</div>
            <div className="flex items-center space-x-6">
                <Link to="/" className="text-secondary font-semibold hover:translate-y-1 hover:scale-105 transition-all">Home</Link>
                {user ? (
                    <>
                        <Link to="/search" className="text-secondary font-semibold hover:translate-y-1 hover:scale-105 transition-all">Search</Link>
                        <button 
                            onClick={handleLogout} 
                            className="text-secondary font-semibold hover:translate-y-1 hover:scale-105 transition-all ml-auto"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-secondary font-semibold hover:translate-y-1 hover:scale-105 transition-all">Login</Link>
                        <Link to="/signup" className="text-secondary font-semibold hover:translate-y-1 hover:scale-105 transition-all">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
