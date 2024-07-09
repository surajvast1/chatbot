const mongoose = require('mongoose');
const City = require('./models/city');
const fs = require('fs');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://suraj:%23Shubham%401234@cluster0.ho3wgb4.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const insertData = async () => {
  try {
    await connectDB();
    const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    await City.insertMany(data.cities);
    console.log('Data inserted');
    process.exit();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

insertData();
