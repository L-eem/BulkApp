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
        <Typography variant="h4" component="h1" gutterBottom className="calorie-calculator-title">
          BulkerApp
        </Typography>
        <form onSubmit={handleSubmit} className="calorie-calculator-form">
          <TextField
            label="Height (e.g., 6'2)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="calorie-calculator-input"
            autoComplete="off"
          />
          <TextField
            label="Current Weight (lbs)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={currentWeight}
            onChange={(e) => setCurrentWeight(e.target.value)}
            className="calorie-calculator-input"
            autoComplete="off"
          />
          <TextField
            label="Goal Weight (lbs)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={goalWeight}
            onChange={(e) => setGoalWeight(e.target.value)}
            className="calorie-calculator-input"
            autoComplete="off"
          />
          <TextField
            label="Time Period (weeks)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="calorie-calculator-input"
            autoComplete="off"
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
