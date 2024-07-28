import React from 'react';
import CalorieCalculator from '../components/CalorieCalculator';

const HomePage = ({ setResults }) => {
  return (
    <div>
      <CalorieCalculator setResults={setResults} />
    </div>
  );
};

export default HomePage;
