// Import required modules
import React, { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

// Define MathChallenge component
const MathChallenge: React.FC = () => {
  // State variables
  const [equation, setEquation] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);

  // Function to fetch a new math equation from the backend
  const fetchEquation = async () => {
    try {
      const response = await axios.get('/generate-equation');
      console.log(response.data); // Log response data for debugging
      setEquation(response.data.equation);
      setCorrectAnswer(response.data.answer);
      setUserAnswer('');
    } catch (error) {
      console.error('Error fetching equation:', error);
    }
  };

  // Effect hook to fetch initial equation on component mount
  useEffect(() => {
    fetchEquation();
  }, []);

  // Function to handle user input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(event.target.value);
  };

  // Function to check if the user's answer is correct
  useEffect(() => {
    const answer = parseFloat(userAnswer);
    if (answer === correctAnswer) {
      fetchEquation();
    }
  }, [userAnswer, correctAnswer]);

  // Render component
  return (
    <div>
      <h1>Math Challenge</h1>
      <p>{equation}</p>
      <input
        type="number"
        value={userAnswer}
        onChange={handleInputChange}
        placeholder="Enter your answer"
      />
    </div>
  );
};

export default MathChallenge;
