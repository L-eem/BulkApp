const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const foodSuggestions = [
  "Chicken Breast", "Brown Rice", "Broccoli", "Almonds", "Avocado",
  "Salmon", "Sweet Potatoes", "Oats", "Eggs", "Greek Yogurt",
  "Quinoa", "Lean Beef", "Spinach", "Chickpeas", "Tofu",
  "Turkey Breast", "Blueberries", "Chia Seeds", "Pumpkin Seeds", "Brussels Sprouts",
  "Lentils", "Cottage Cheese", "Kale", "Walnuts", "Peanut Butter",
  "Edamame", "Bell Peppers", "Asparagus", "Hummus", "Cauliflower"
];

function getRandomFoods(arr, n) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

app.post('/calculate', (req, res) => {
  const { height, currentWeight, goalWeight, timePeriod } = req.body;
  
  // Calculation logic here (simplified for brevity)
  const dailyCalories = Math.round((goalWeight - currentWeight) * 500 / timePeriod + 2500);
  
  res.json({
    dailyCalories,
    timePeriod,
    foodSuggestions: getRandomFoods(foodSuggestions, 4)
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
