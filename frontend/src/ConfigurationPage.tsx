import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ConfigurationPage: React.FC = () => {
  const [timerDuration, setTimerDuration] = useState<number>(60);

  const navigate = useNavigate();

  const handleTimerDurationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimerDuration(Number(event.target.value));
  };

  const startTest = () => {
    navigate(`/test?timer=${timerDuration}`);
  };

  return (
    <div>
      <h1>Configuration Page</h1>
      <label htmlFor="timerDuration">Timer Duration (seconds):</label>
      <select id="timerDuration" value={timerDuration} onChange={handleTimerDurationChange}>
        <option value={30}>30</option>
        <option value={60}>60</option>
        <option value={90}>90</option>
        {/* Add more options for other test modes later */}
      </select>
      <button onClick={startTest}>Start Test</button>
    </div>
  );
};

export default ConfigurationPage;
