import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Button } from "@chakra-ui/react";

const ConfigurationPage: React.FC = () => {
  const [timerDuration, setTimerDuration] = useState<number>(60);
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  const handleTimerDurationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTimerDuration(Number(event.target.value));
  };

  const startTest = () => {
    navigate("/test", { state: { timer: timerDuration } });
  };

  if (isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="flex justify-end items-center space-x-4 p-4">
          <Button colorScheme="blue" onClick={() => navigate("/scores")}>
            Go to Scores Page
          </Button>

          <SignOutButton>
            <Button colorScheme="blue">Sign Out</Button>
          </SignOutButton>
        </div>

        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Choose the Test Configuration!
        </h2>
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-semibold text-gray-800 mt-4 mb-5">
            Configuration Page
          </h1>
          <div className="mb-4 w-full sm:w-96">
            <label
              htmlFor="timerDuration"
              className="block text-md font-medium text-gray-700"
            >
              Timer Duration (seconds):
            </label>
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
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Start Test
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Choose the Test Configuration!
        </h2>
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-semibold text-gray-800 mt-4 mb-5">
            Configuration Page
          </h1>
          <div className="mb-4 w-full sm:w-96">
            <label
              htmlFor="timerDuration"
              className="block text-md font-medium text-gray-700"
            >
              Timer Duration (seconds):
            </label>
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
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Start Test
          </button>
        </div>
      </div>
    );
  }
};

export default ConfigurationPage;
