import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaGithub, FaLinkedin, FaUserAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [language, setLanguage] = useState('');
  const [users, setUsers] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]); // State for connected users
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); // To programmatically navigate

  // Fetch connected users
  const fetchConnectedUsers = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.get('http://localhost:5000/api/user/connections', {
        headers: {
          'x-auth-token': token,
        },
      });

      const data = response.data;
      if (response.status === 200 && data.connections) {
        setConnectedUsers(data.connections.map(user => user.userId)); // Store userIds of connected users
      } else {
        setConnectedUsers([]); // Reset if no data or error
      }
    } catch (err) {
      console.error('Error fetching connected users:', err);
      setConnectedUsers([]); // Reset if error
    }
  };

  // Fetch users based on language search
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`http://localhost:5000/api/search/${language}`);

      if (response.data.users) {
        setUsers(response.data.users);
        fetchConnectedUsers(); // Fetch connected users after each search
      } else {
        setError('No users found for this language.');
      }
    } catch (err) {
      setError('Error fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle connection with the user
  const handleConnect = async (recommendedUserId) => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(`http://localhost:5000/api/user/connect/${recommendedUserId}`, {
        method: "POST",
        headers: {
          "x-auth-token": token,
        },
      });

      if (response.status === 200) {
        fetchConnectedUsers(); // Refresh connections after successful connection
      } else {
        alert('Error connecting with user.');
      }
    } catch (err) {
      console.error('Error connecting with user:', err);
    }
  };

  useEffect(() => {
    // Check if the user is authenticated, if not redirect to login page
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/'); // Redirect to login page if not authenticated
    } else {
      fetchConnectedUsers(); // Fetch connected users when component loads
    }
  }, [navigate]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold text-center mt-10">Search Users by Language</h1>

        {/* Search form */}
        <form onSubmit={handleSearch} className="mt-6 text-center">
          <input
            type="text"
            placeholder="Enter language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="ml-4 px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
          >
            Search
          </button>
        </form>

        {/* Error message */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {/* Loading indicator */}
        {loading && <p className="text-center mt-4">Loading...</p>}

        {/* Display search results */}
        <div className="mt-10">
          {users.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-center mb-6">Top Users for "{language}"</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                  <div key={user.userId} className="bg-white p-4 rounded-lg shadow-lg">
                    <div className="flex items-center space-x-4">
                      {/* User Icon */}
                      <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-full">
                        <FaUserAlt className="text-gray-600 text-3xl" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{user.firstName} {user.lastName}</h3>
                        <p className="text-gray-600">{user.email}</p>
                      </div>
                    </div>

                    {/* Check if user is connected */}
                    {connectedUsers.includes(user.userId) ? (
                      <div className="flex justify-between mt-4">
                        <a
                          href={`https://github.com/${user.githubUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-black bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
                        >
                          <FaGithub className="mr-2" />
                          GitHub
                        </a>
                        <a
                          href={`https://www.linkedin.com/in/${user.linkedinUrl}`}
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
                        onClick={() => handleConnect(user.userId)}
                        className="mt-4 w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                      >
                        Connect
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
