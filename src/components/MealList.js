import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/MealList.css'; // Import custom styles

const apiKey = ''; // Provided OpenAI API key

const fetchImage = async (query) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        prompt: query,
        n: 1,
        size: '256x256' // Adjusted size for consistency
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.data[0].url;
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
};

const fetchRecommendations = async (dailyCalories, timePeriod) => {
  const varietyPrompts = [
    "I need 3 unique and different foods with short and sweet 1 sentence descriptions for someone who needs (no pork products)",
    "Suggest 3 different foods with brief 1 sentence descriptions for a person who needs (no pork products)",
    "Can you give me 3 varied food recommendations with concise 1 sentence descriptions for someone who requires (no pork products)"
  ];
  const randomPrompt = varietyPrompts[Math.floor(Math.random() * varietyPrompts.length)];
  const promptMessage = `${randomPrompt} ${dailyCalories} calories daily for ${timePeriod} weeks to gain weight.`;

  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: promptMessage }
  ];
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 150
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('Response:', response.data); // Debug: Check the response data
    const recommendations = response.data.choices[0].message.content.trim().split('\n').filter(Boolean);
    return recommendations.slice(0, 3); // Ensure only 3 recommendations
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return [];
  }
};

const MealList = ({ results }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [images, setImages] = useState({});
  const navigate = useNavigate(); // Use React Router's useNavigate hook for navigation

  useEffect(() => {
    const getRecommendations = async () => {
      const foods = await fetchRecommendations(results.dailyCalories, results.timePeriod);
      setRecommendations(foods);
      const newImages = {};

      for (const food of foods) {
        const prompt = food.replace(/[\d\.\s]+/, ''); // Clean up prompt for image generation
        const imageUrl = await fetchImage(prompt);
        newImages[food] = imageUrl;
        setImages((prevImages) => ({ ...prevImages, [food]: imageUrl }));
      }
    };

    getRecommendations();
  }, [results.dailyCalories, results.timePeriod]);

  const handleStartOver = () => {
    navigate('/'); // Navigate back to the main page
  };

  return (
    <Container maxWidth="xs" className="meal-list-container">
      <Box className="meal-list-box">
        <Typography variant="h4" component="h2" gutterBottom className="meal-list-title">
          {results.dailyCalories} Calories Needed Daily for {results.timePeriod} weeks
        </Typography>
        <Typography variant="h5" component="h3" gutterBottom className="meal-list-subtitle">
          Recommended Foods:
        </Typography>
        {recommendations.length === 0 ? (
          <Typography variant="body1" component="p">
            Loading recommendations...
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {recommendations.map((food, index) => (
              <Grid item xs={12} key={index} className="meal-list-item">
                {images[food] ? (
                  <img src={images[food]} alt={food} className="meal-list-image" />
                ) : (
                  <Typography variant="body1" component="p">
                    Loading image...
                  </Typography>
                )}
                <Typography variant="body1" component="p" className="meal-list-food">
                  {food.replace(/!\[.*\]\(.*\)/, '')}
                </Typography>
              </Grid>
            ))}
          </Grid>
        )}
        <Button variant="contained" color="primary" onClick={handleStartOver} style={{ marginTop: '20px' }}>
          Start Over
        </Button>
      </Box>
    </Container>
  );
};

export default MealList;
