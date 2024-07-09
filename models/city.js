const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number
});

const restaurantSchema = new mongoose.Schema({
  name: String,
  food_items: [foodItemSchema]
});

const citySchema = new mongoose.Schema({
  name: String,
  restaurants: [restaurantSchema]
});

module.exports = mongoose.model('City', citySchema);
