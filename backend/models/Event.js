const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['music', 'sports', 'comedy', 'theater', 'conference', 'workshop', 'other']
  },
  city: {
    type: String,
    required: true,
    lowercase: true
  },
  venue: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  ticketTypes: [{
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    quantity: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  totalTickets: {
    type: Number,
    required: true,
    min: 1
  },
  availableTickets: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'completed'],
    default: 'active'
  }
}, {
  timestamps: true
});

eventSchema.index({ name: 'text', artist: 'text', description: 'text' });

module.exports = mongoose.model('Event', eventSchema);