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
    <div className="flex flex-col items-center justify-center p-5">
      <h1 className="text-3xl font-semibold mb-4">Configuration Page</h1>
      <div className="mb-3 w-1/2">
        <label htmlFor="timerDuration" className="block text-sm font-medium text-gray-700">Timer Duration (seconds):</label>
        <select
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          id="timerDuration"
          value={timerDuration}
          onChange={handleTimerDurationChange}
        >
          <option value={30}>30</option>
          <option value={60}>60</option>
          <option value={90}>90</option>
          {/* Add more options for other test modes later */}
        </select>
      </div>
      <button
        onClick={startTest}
        className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Start Test
      </button>
    </div>
  );
};

export default ConfigurationPage;
