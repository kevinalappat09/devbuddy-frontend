import React from 'react';
import { FaGithub, FaLinkedin, FaUserAlt } from 'react-icons/fa';

const UserCard = ({ user, isConnected, handleConnect }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-full">
          <FaUserAlt className="text-gray-600 text-3xl" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{user.firstName} {user.lastName}</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      {isConnected ? (
        <div className="flex justify-between mt-4">
          {user.githubUrl && (
            <a
              href={`https://github.com/${user.githubUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-black bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              <FaGithub className="mr-2" />
              GitHub
            </a>
          )}
          {user.linkedinUrl && (
            <a
              href={`https://www.linkedin.com/in/${user.linkedinUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-700 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              <FaLinkedin className="mr-2" />
              LinkedIn
            </a>
          )}
        </div>
      ) : (
        <button
          onClick={() => handleConnect(user.userId)}
          className="mt-4 w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Connect
        </button>
      )}
    </div>
  );
};

export default UserCard;
