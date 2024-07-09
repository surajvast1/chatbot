// routes/restaurants.js
const express = require('express');
const router = express.Router();
const City = require('../models/city');

// GET items in a restaurant by restaurant name
router.get('/:restaurantName/items', async (req, res) => {
  const { restaurantName } = req.params;
  try {
    const city = await City.findOne({ 'restaurants.name': restaurantName });
    if (!city) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    const restaurant = city.restaurants.find(r => r.name === restaurantName);
    res.json(restaurant.food_items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
