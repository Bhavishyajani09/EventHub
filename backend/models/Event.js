const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  artistName: { type: String, required: true },
  city: { type: String, required: true },
  venue: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  ticketTypes: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  }],
  poster: { type: String },
  isPublished: { type: Boolean, default: false },
  bookingOpen: { type: Boolean, default: true },
  isCancelled: { type: Boolean, default: false },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'Organizer', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);