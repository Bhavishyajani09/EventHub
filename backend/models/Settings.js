const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  commission: {
    type: Number,
    default: 10,
    min: 0,
    max: 100
  },
  taxPercentage: {
    type: Number,
    default: 8,
    min: 0,
    max: 100
  },
  convenienceFee: {
    type: Number,
    default: 2.5,
    min: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Settings', settingsSchema);
