import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MathChallenge from './MathChallenge';
import ConfigurationPage from './ConfigurationPage';
import ResultsPage from './ResultsPage';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConfigurationPage />} />
        <Route path="/test" element={<MathChallenge />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
