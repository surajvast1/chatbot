// routes/foodItems.js
const express = require('express');
const router = express.Router();
const City = require('../models/city');

// POST order food item
router.post('/order', async (req, res) => {
  const { restaurantName, itemName, quantity } = req.body;
  try {
    const city = await City.findOne({ 'restaurants.name': restaurantName });
    if (!city) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    const restaurant = city.restaurants.find(r => r.name === restaurantName);
    const item = restaurant.food_items.find(i => i.name === itemName);
    
    if (!item) {
      return res.status(404).json({ message: 'Food item not found in the restaurant' });
    }

    if (item.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient quantity available' });
    }

    // Update item quantity
    item.quantity -= quantity;

    // Save the updated city document
    await city.save();

    res.json({ message: `Ordered ${quantity} ${itemName}(s) from ${restaurantName}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
