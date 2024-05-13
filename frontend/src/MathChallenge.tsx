import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

axios.defaults.baseURL = 'https://mental-math-jieg.onrender.com';

const MathChallenge: React.FC = () => {
  const [equation, setEquation] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);
  const [counter, setCounter] = useState<number>(0);
  const [timer, setTimer] = useState<number>(30);

  const location = useLocation();
  const timerFromState = location.state?.timer || 30;

  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();

  const fetchEquation = async () => {
    try {
      const response = await axios.get('/generate-equation');
      setEquation(response.data.equation);
      setCorrectAnswer(response.data.answer);
    } catch (error) {
      console.error('Error fetching equation:', error);
    }
  };

  useEffect(() => {
    fetchEquation();
    setTimer(timerFromState);
  }, [timerFromState]);

  useEffect(() => {
    if (timer > 0) {
      const timerId = setTimeout(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
  
      return () => clearTimeout(timerId);
    } else {
      if (isSignedIn) {
        axios.post('/gameOver', {
          userId: user?.id,
          score: counter,
          length: timerFromState
        })
      }
      navigate(`/results?score=${counter}&timer=${timerFromState}`);
    }
  }, [timer, navigate, user?.id, counter, timerFromState]);
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(event.target.value);
  };

  useEffect(() => {
    const answer = parseFloat(userAnswer);
    if (answer === correctAnswer) {
      setCounter(prevCounter => prevCounter + 1);
      fetchEquation();
      setUserAnswer('');
    }
  }, [userAnswer, correctAnswer]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute top-4 right-4 flex space-x-2">
        <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" to="/">
          Configuration Page
        </Link>
      </div>
      <div className="space-y-4">
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h1 className="text-5xl text-center text-blue-800 mb-4">Math Challenge</h1>
          <div className="text-3xl font-bold text-gray-800 bg-white p-3 rounded shadow">
            {equation}
          </div>
          <div className="flex justify-center items-center mt-4">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 w-full max-w-xs"
              type="number"
              value={userAnswer}
              onChange={handleInputChange}
              placeholder="Answer"
            />
          </div>
        </div>
        <div className="flex space-x-10">
          <div className="counter bg-white p-3 shadow rounded">Correct Answers: {counter}</div>
          <div className="timer bg-white p-3 shadow rounded">Time Left: {timer} seconds</div>
        </div>
      </div>
    </div>
  );
};

export default MathChallenge;
