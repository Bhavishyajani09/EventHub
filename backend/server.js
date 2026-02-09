if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Import routes
const organizerRoutes = require('./routes/organizerRoutes');
const eventRoutes = require('./routes/eventRoutes');
const adminRoutes = require('./routes/adminRoutes');
const startExpiryTask = require('./utils/expiryTask');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/auth/user', require('./routes/auth'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/payments', require('./routes/payments'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/events', require('./routes/events')); // Public events routes
app.use('/api/artists', require('./routes/artistRoutes'));

// Routes
app.use('/api', organizerRoutes);
app.use('/api/organizer/events', eventRoutes); // Organizer-specific events routes
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
  // Start background task to unpublish expired events
  startExpiryTask();
});