import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MathChallenge from './MathChallenge';
import ConfigurationPage from './ConfigurationPage';
import ResultsPage from './ResultsPage';
import ScoresPage from './ScoresPage';
import { useUser } from '@clerk/clerk-react';

const AppRouter: React.FC = () => {
  const { user } = useUser();
  const userId = user?.id.toString() || '';
  return (
    <Router >
      <Routes>
        <Route path="/" element={<ConfigurationPage />} />
        <Route path="/test" element={<MathChallenge />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/scores" element={<ScoresPage uid={userId} />} /> // Fix: Pass the uid prop correctly
      </Routes>
    </Router>
  );
};

export default AppRouter;
