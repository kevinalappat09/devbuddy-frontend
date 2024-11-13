import React from 'react';
import HeroSection from './HeroSection';
import { FaUsers, FaProjectDiagram, FaCodeBranch } from 'react-icons/fa'; // Importing icons for the cards

const MarketingMaterial = () => {
  return (
    <div className="w-full h-screen">
      <HeroSection />
      <div className="w-full h-auto flex flex-col justify-center items-center text-center py-12 bg-gray-50">
        {/* Adjust the grid layout with explicit column widths */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 w-full max-w-screen-xl">
          {/* Card 1 */}
          <div className="bg-white px-12 py-10 rounded-lg shadow-lg transform transition-all hover:shadow-2xl hover:scale-105 max-w-sm mx-auto">
            <div className="flex items-center justify-center mb-4">
              <span className="text-5xl font-semibold text-orange-500 mr-4">1M+</span>
              <FaUsers className="text-5xl text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Connections Made</h3>
            <p className="text-gray-600 mb-6">Our community has made over 1 million connections, fostering collaboration and learning.</p>
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              Join the Network
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white px-12 py-10 rounded-lg shadow-lg transform transition-all hover:shadow-2xl hover:scale-105 max-w-sm mx-auto">
            <div className="flex items-center justify-center mb-4">
              <span className="text-5xl font-semibold text-orange-500 mr-4">10K+</span>
              <FaProjectDiagram className="text-5xl text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Projects Made</h3>
            <p className="text-gray-600 mb-6">More than 10,000 projects have been completed through collaborations in our community.</p>
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              Explore Projects
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-white px-12 py-10 rounded-lg shadow-lg transform transition-all hover:shadow-2xl hover:scale-105 max-w-sm mx-auto">
            <div className="flex items-center justify-center mb-4">
              <span className="text-5xl font-semibold text-orange-500 mr-4">#1</span>
              <FaCodeBranch className="text-5xl text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Developer Networking Site</h3>
            <p className="text-gray-600 mb-6">We are the leading platform for developers to connect, share ideas, and grow professionally.</p>
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              Start Networking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingMaterial;
