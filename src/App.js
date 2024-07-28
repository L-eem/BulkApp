import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import HomePage from './pages/HomePage';
import ResultPage from './pages/ResultPage';

function App() {
  const [results, setResults] = useState(null);

  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<HomePage setResults={setResults} />} />
        <Route path="/results" element={<ResultPage results={results} />} />
      </Routes>
    </Router>
  );
}

export default App;
