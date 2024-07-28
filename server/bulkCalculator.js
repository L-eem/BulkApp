import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import MealList from './MealList';
import '../styles/BulkCalculator.css'; // Import custom styles

const BulkCalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [timePeriod, setTimePeriod] = useState('');
  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    const bmr = calculateBMR(weight, height, age, gender);
    const dailyCalories = calculateDailyCalories(bmr, activityLevel);
    setResults({ dailyCalories, timePeriod });
  };

  const calculateBMR = (weight, height, age, gender) => {
    if (gender === 'male') {
      return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
  };

  const calculateDailyCalories = (bmr, activityLevel) => {
    const activityMultiplier = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderately_active: 1.55,
      very_active: 1.725,
      extra_active: 1.9,
    };
    return Math.round(bmr * activityMultiplier[activityLevel]);
  };

  return (
    <Container maxWidth="sm" className="bulk-calculator-container">
      <Box className="bulk-calculator-box">
        <Typography variant="h4" component="h1" gutterBottom className="bulk-calculator-title">
          Bulker Helper App
        </Typography>
        <TextField
          label="Weight (kg)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <TextField
          label="Height (cm)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <TextField
          label="Age"
          variant="outlined"
          fullWidth
          margin="normal"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <TextField
          label="Gender"
          variant="outlined"
          fullWidth
          margin="normal"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <TextField
          label="Activity Level"
          variant="outlined"
          fullWidth
          margin="normal"
          value={activityLevel}
          onChange={(e) => setActivityLevel(e.target.value)}
        />
        <TextField
          label="Time Period (weeks)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="bulk-calculator-button"
          onClick={handleCalculate}
        >
          Calculate
        </Button>
        {results && <MealList results={results} />}
      </Box>
    </Container>
  );
};

export default BulkCalculator;
