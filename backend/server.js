const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth/user', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/booking', require('./routes/doBookings'));
app.use('/payments', require('./routes/payments'));
app.use('/api/reviews', require('./routes/reviews'));

app.get('/', (req, res) => {
  res.json({ message: 'EventHub API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});