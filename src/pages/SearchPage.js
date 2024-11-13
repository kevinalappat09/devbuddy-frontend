import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaGithub, FaLinkedin, FaUserAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [language, setLanguage] = useState('');
  const [users, setUsers] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

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
        setConnectedUsers(data.connections.map(user => user.userId));
      } else {
        setConnectedUsers([]);
      }
    } catch (err) {
      console.error('Error fetching connected users:', err);
      setConnectedUsers([]);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`http://localhost:5000/api/search/${language}`);

      if (response.data.users) {
        setUsers(response.data.users);
        fetchConnectedUsers();
      } else {
        setError('No users found for this language.');
      }
    } catch (err) {
      setError('Error fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
        fetchConnectedUsers();
      } else {
        alert('Error connecting with user.');
      }
    } catch (err) {
      console.error('Error connecting with user:', err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/');
    } else {
      fetchConnectedUsers();
    }
  }, [navigate]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold text-center mt-10">Search Users by Language</h1>

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

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {loading && <p className="text-center mt-4">Loading...</p>}

        <div className="mt-10">
          {users.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-center mb-6">Top Users for "{language}"</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                  <div key={user.userId} className="bg-white p-4 rounded-lg shadow-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-full">
                        <FaUserAlt className="text-gray-600 text-3xl" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{user.firstName} {user.lastName}</h3>
                        <p className="text-gray-600">{user.email}</p>
                      </div>
                    </div>
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
