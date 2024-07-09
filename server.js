const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const citiesRouter = require('./routes/cities');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/cities', citiesRouter);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
