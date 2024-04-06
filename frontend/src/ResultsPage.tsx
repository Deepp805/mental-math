import React from 'react';
import { Link } from 'react-router-dom';

const ResultsPage: React.FC = () => {
  const queryParams = new URLSearchParams(location.search);
  return (
    <div>
      <h1>Results</h1>
      <p>Your score: {queryParams.get('score')}</p>
      <Link to="/test">Restart Test</Link>
      <Link to="/">Go to Configuration Page</Link>
    </div>
  );
};

export default ResultsPage;
