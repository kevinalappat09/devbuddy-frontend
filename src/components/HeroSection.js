import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="relative w-full h-[calc(100vh-3rem)] bg-gradient-to-b from-orange-500 to-orange-700">
      <div className="flex flex-col justify-center items-center h-full text-center px-6 space-y-6">
        <h1 className="text-5xl font-extrabold text-white">
          DevBuddy
        </h1>
        <p className="text-2xl font-semibold text-white opacity-90">
          Find Like Minded Developers. Forge Stronger Projects.
        </p>
        <button
          onClick={handleLoginClick}
          className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold text-lg transition-transform transform hover:scale-105 hover:bg-orange-100"
        >
          Connect Now
        </button>
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-[20%] opacity-30"
        >
          <path
            fill="#ffffff"
            d="M0,256C288,192,576,320,864,256C1152,192,1440,128,1440,128V320H0Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
