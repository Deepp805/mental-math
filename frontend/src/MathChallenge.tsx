import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

const MathChallenge: React.FC = () => {
  const [equation, setEquation] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);
  const [counter, setCounter] = useState<number>(0);
  const [timer, setTimer] = useState<number>(30);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const timerFromQueryParam = Number(queryParams.get('timer'));

  const navigate = useNavigate();

  const fetchEquation = async () => {
    console.log('Fetching equation...');
    try {
      const response = await axios.get('/generate-equation');
      setEquation(response.data.equation);
      setCorrectAnswer(response.data.answer);
      console.log('Equation fetched:', response.data.equation);
    } catch (error) {
      console.error('Error fetching equation:', error);
    }
  };

  useEffect(() => {
    console.log('Component mounted');
    fetchEquation();
    setTimer(timerFromQueryParam);
  }, [timerFromQueryParam]);

  useEffect(() => {
    if (timer > 0) {
      console.log('Timer:', timer);
      const timerId = setTimeout(() => {
        console.log('Timer expired!');
        setTimer(prevTimer => {
          console.log('Previous timer value:', prevTimer);
          return prevTimer - 1;
        });
      }, 1000);
  
      return () => clearTimeout(timerId);
    } else {
      console.log('Time\'s up, navigating to results page...');
      navigate('/results');
    }
  }, [timer, navigate]);
  
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(event.target.value);
  };

  console.log('Timer:', timer);

  const restartTest = () => {
    navigate(`/test?timer=${timerFromQueryParam}`);
  };

  useEffect(() => {
    const answer = parseFloat(userAnswer);
    if (answer === correctAnswer) {
      console.log('Correct answer!');
      setCounter(prevCounter => prevCounter + 1);
      fetchEquation();
      setUserAnswer('');
    }
  }, [userAnswer, correctAnswer]);

  return (
    <div>
      <div className="counter">Correct Answers: {counter}</div>
      <div className="timer">Time Left: {timer} seconds</div>
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
