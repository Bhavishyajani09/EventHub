const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config();

// Import routes
const organizerRoutes = require('./routes/organizerRoutes');
const eventRoutes = require('./routes/eventRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth/user', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/booking', require('./routes/bookings'));
app.use('/payments', require('./routes/payments'));
app.use('/api/reviews', require('./routes/reviews'));

// Routes
app.use('/api', organizerRoutes);
app.use('/api', eventRoutes);
app.use('/api', adminRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'EventHub API is running!',
    version: '1.0.0',
    endpoints: {
      'POST /api/auth/organizer/register': 'Register new organizer',
      'POST /api/auth/organizer/login': 'Organizer login',
      'PUT /api/organizer/profile': 'Update organizer profile (requires auth)'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});