const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Fallback to hardcoded URI if env var is missing
    const connStr = process.env.MONGO_URI || 'mongodb+srv://bhavishya:bhavishya123@cluster0.77o0gwf.mongodb.net/test';
    
    console.log(`Attempting to connect to MongoDB...`);
    
    await mongoose.connect(connStr);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;