import React from 'react';
import { Link } from 'react-router-dom';

const ResultsPage: React.FC = () => {
  const queryParams = new URLSearchParams(window.location.search); // Use `window.location.search`
  const res = `/test?timer=${queryParams.get('timer')}`;
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl text-blue-800 font-bold mb-4">Results</h1>
        <p className="text-xl mb-6">Your score: {queryParams.get('score')}</p>
        <div className="space-y-4">
          <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" to={res}>
            Restart Test
          </Link>
          <Link className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" to="/">
            Go to Configuration Page
          </Link>
          <Link className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" to="/scores">
            Go to Scores Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
