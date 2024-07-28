import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import MealList from '../components/MealList';

const ResultPage = ({ results }) => {
  if (!results) {
    return (
      <Container maxWidth="xs">
        <Box mt={5}>
          <Typography variant="h5" component="h2" gutterBottom>
            Loading results...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <div>
      <MealList results={results} />
    </div>
  );
};

export default ResultPage;
