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
  const timerFromState = location.state?.timer || 30;  // Default to 30 if no timer is provided

  const navigate = useNavigate();
  const {user} = useUser();

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
        setTimer(prevTimer => {
          return prevTimer - 1;
        });
      }, 1000);
  
      return () => clearTimeout(timerId);
    } else {
      axios.post('/gameOver', {
        userId: user?.id,
        score: counter,
        length: timerFromState
      })
      navigate(`/results?score=${counter}&timer=${timerFromState}`);
    }
  }, [timer, navigate]);
  
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(event.target.value);
  };


  // const restartTest = () => {
  //   navigate(`/test?timer=${timerFromQueryParam}`);
  // };

  useEffect(() => {
    const answer = parseFloat(userAnswer);
    if (answer === correctAnswer) {
      setCounter(prevCounter => prevCounter + 1);
      fetchEquation();
      setUserAnswer('');
    }
  }, [userAnswer, correctAnswer]);

  return (
    <div>
      <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded left-0 bottom-7" to="/">Configuration Page</Link>
      <div className="counter bg-white">Correct Answers: {counter}</div>
      <div className="timer">Time Left: {timer} seconds</div>
      <h1 className="text-5xl">Math Challenge</h1>
      <p>{equation}</p>
      <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 w-32"
        type="number"
        value={userAnswer}
        onChange={handleInputChange}
        placeholder="Answer"
      />
    </div>
  );
};

export default MathChallenge;
