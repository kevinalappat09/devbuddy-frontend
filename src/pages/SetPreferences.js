import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

const SetPreferences = () => {
  const languagesList = [
    { name: "Python", icon: "fa-python" },
    { name: "Java", icon: "fa-java" },
    { name: "JavaScript", icon: "fa-js-square" },
    { name: "C", icon: "fa-c" },
    { name: "Go", icon: "fa-golang" },
    { name: "PHP", icon: "fa-php" },
    { name: "Rust", icon: "fa-rust" },
    { name: "HTML", icon: "fa-html5" },
    { name: "CSS", icon: "fa-css3" },
  ];

  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [languageScores, setLanguageScores] = useState({});
  const [userId, setUserId] = useState(null);
  const [isRatingVisible, setIsRatingVisible] = useState(false);
  const navigate = useNavigate();

  // Get the user ID from the JWT token only once when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId);
    }
  }, []);  // Empty dependency array to ensure this runs only once

  // Handle language selection
  const handleLanguageSelect = (language) => {
    setSelectedLanguages((prevSelected) => {
      if (prevSelected.includes(language)) {
        return prevSelected.filter((item) => item !== language);
      } else {
        return [...prevSelected, language];
      }
    });
  };

  // Handle skill rating change
  const handleScoreChange = (language, score) => {
    setLanguageScores((prevScores) => ({
      ...prevScores,
      [language]: score,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!userId) {
      console.error("No user ID found. Please log in.");
      return;
    }

    const languages = selectedLanguages.map((language) => ({
      language,
      score: languageScores[language] || 1, 
    }));

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/set-language-preferences",
        {
          userId,
          languages,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("authToken"),
          },
        }
      );

      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting preferences:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-6 text-center font-semibold">Select Your Known Languages</h2>

        {/* Step 1: Language Selection */}
        {!isRatingVisible && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            {languagesList.map(({ name, icon }) => (
              <button
                key={name}
                onClick={() => handleLanguageSelect(name)}
                className={`p-4 border-2 rounded-lg ${
                  selectedLanguages.includes(name) ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                <i className={`fab ${icon} text-3xl mb-2`}></i>
                <div>{name}</div>
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Skill Rating for Selected Languages */}
        {isRatingVisible && selectedLanguages.length > 0 && (
          <div>
            <h3 className="text-xl mb-4">Rate Your Skills for Selected Languages</h3>
            {selectedLanguages.map((language) => (
              <div key={language} className="mb-4">
                <div className="text-lg">{language}</div>
                <div className="flex justify-between">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <label key={score} className="flex items-center">
                      <input
                        type="radio"
                        name={language}
                        value={score}
                        checked={languageScores[language] === score}
                        onChange={() => handleScoreChange(language, score)}
                        className="mr-2"
                      />
                      {score}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Next/Back Button */}
        <div className="flex justify-between">
          {!isRatingVisible ? (
            <button
              onClick={() => setIsRatingVisible(true)}
              className="w-1/2 bg-blue-500 text-white py-2 rounded mt-6"
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => setIsRatingVisible(false)}
              className="w-1/2 bg-gray-500 text-white py-2 rounded mt-6"
            >
              Back
            </button>
          )}

          {isRatingVisible && (
            <button
              onClick={handleSubmit}
              className="w-1/2 bg-green-500 text-white py-2 rounded mt-6"
            >
              Save Preferences
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetPreferences;
