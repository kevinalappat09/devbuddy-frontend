import React from 'react';
import { FaGithub, FaLinkedin, FaUserAlt } from 'react-icons/fa';

const Recommendations = ({ recommendations, connectedUsers, handleConnect }) => {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">Recommended Users</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((user) => (
          <div key={user.user._id} className="bg-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-full">
                <FaUserAlt className="text-gray-600 text-3xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{user.user.firstName} {user.user.lastName}</h3>
                <p className="text-gray-600">{user.user.email}</p>
              </div>
            </div>

            {Array.isArray(connectedUsers) && connectedUsers.some((u) => u.userId === user.user._id) ? (
              <div className="flex justify-between mt-4">
                <a
                  href={`https://github.com/${user.user.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-black bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
                >
                  <FaGithub className="mr-2" />
                  GitHub
                </a>
                <a
                  href={`https://www.linkedin.com/in/${user.user.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-700 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
                >
                  <FaLinkedin className="mr-2" />
                  LinkedIn
                </a>
              </div>
            ) : (
              <button
                onClick={() => handleConnect(user.user._id)}
                className="mt-4 w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Connect
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
