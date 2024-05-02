import React from 'react';
import { Link } from 'react-router-dom';

const ResultsPage: React.FC = () => {
  const queryParams = new URLSearchParams(location.search);
  const res = `/test?timer=${queryParams.get('timer')}`
  return (
    <div>
      <h1>Results</h1>
      <p>Your score: {queryParams.get('score')}</p>
      <Link to={res}>Restart Test</Link>
      <Link to="/">Go to Configuration Page</Link>
      <Link to="/scores">Go to Scores Page</Link>
    </div>
  );
};

export default ResultsPage;
