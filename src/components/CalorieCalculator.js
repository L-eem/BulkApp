import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/CalorieCalculator.css'; // Import custom styles

const CalorieCalculator = ({ setResults }) => {
  const [height, setHeight] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/calculate', {
        height,
        currentWeight,
        goalWeight,
        timePeriod
      });
      setResults(response.data);
      navigate('/results');
    } catch (error) {
      console.error('There was an error calculating the calories!', error);
    }
  };

  return (
    <Container maxWidth="xs" className="calorie-calculator-container">
      <Box mt={5} className="calorie-calculator-box">
        <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
          <Typography variant="h4" component="h1" className="calorie-calculator-title" style={{ fontWeight: 'bold' }}>
            BulkerApp
          </Typography>
          <img src="/logo.png" alt="Logo" className="calorie-calculator-logo" />
        </Box>
        <form onSubmit={handleSubmit} className="calorie-calculator-form">
          <TextField
            label="Height (e.g., 6'2)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="calorie-calculator-input"
          />
          <TextField
            label="Current Weight (lbs)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={currentWeight}
            onChange={(e) => setCurrentWeight(e.target.value)}
            className="calorie-calculator-input"
          />
          <TextField
            label="Goal Weight (lbs)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={goalWeight}
            onChange={(e) => setGoalWeight(e.target.value)}
            className="calorie-calculator-input"
          />
          <TextField
            label="Time Period (weeks)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="calorie-calculator-input"
          />
          <Box mt={3}>
            <Button variant="contained" color="primary" type="submit" fullWidth className="calorie-calculator-button">
              Get Results
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default CalorieCalculator;
