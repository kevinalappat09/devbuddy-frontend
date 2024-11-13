import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchPage = () => {
  const [language, setLanguage] = useState('');
  const [users, setUsers] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]); // State for connected users
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
        console.log(users)
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

  useEffect(() => {
    fetchConnectedUsers(); // Fetch connected users when component loads
  }, []);

  const handleConnect = async (recommendedUserId) => {
    const token = localStorage.getItem('authToken');
    try {
        console.log(recommendedUserId);
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

  return (
    <div className="min-h-screen bg-gray-100">
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
            className="ml-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
                    <h3 className="text-xl font-semibold">{user.firstName} {user.lastName}</h3>
                    <p className="text-gray-600">{user.email}</p>

                    {/* Check if user is connected */}
                    {connectedUsers.includes(user.userId) ? (
                      <div className="flex justify-between mt-4">
                        {user.githubUrl && (
                          <a
                            href={`https://github.com/${user.githubUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500"
                          >
                            GitHub
                          </a>
                        )}
                        {user.linkedinUrl && (
                          <a
                            href={`https://www.linkedin.com/in/${user.linkedinUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500"
                          >
                            LinkedIn
                          </a>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => handleConnect(user.userId)}
                        className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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
