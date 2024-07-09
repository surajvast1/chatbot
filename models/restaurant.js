const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
  food_items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem' }]
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
