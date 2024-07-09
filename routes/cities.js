const express = require('express');
const router = express.Router();
const data = require('../data.json');  // Load your JSON data

// GET all cities
router.get('/', async (req, res) => {
  try {
    const cities = data.cities.map(city => city.name);
    res.json(cities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET restaurants by city name
router.get('/:cityName', async (req, res) => {
  const { cityName } = req.params;
  try {
    const city = data.cities.find(city => city.name === cityName);
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }
    const restaurants = city.restaurants.map(restaurant => restaurant.name);
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET items by restaurant name
router.get('/:cityName/:restaurantName/items', async (req, res) => {
  const { cityName, restaurantName } = req.params;
  try {
    const city = data.cities.find(city => city.name === cityName);
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }
    const restaurant = city.restaurants.find(restaurant => restaurant.name === restaurantName);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant.food_items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST place an order
router.post('/:cityName/:restaurantName/order', async (req, res) => {
  const { cityName, restaurantName } = req.params;
  const { itemName, quantity } = req.body;

  try {
    const city = data.cities.find(city => city.name === cityName);
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }
    const restaurant = city.restaurants.find(restaurant => restaurant.name === restaurantName);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    const item = restaurant.food_items.find(item => item.name === itemName);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    if (item.quantity < quantity) {
      return res.status(400).json({ message: 'Not enough quantity available' });
    }
    item.quantity -= quantity;
    res.json({ message: 'Order placed successfully', item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
