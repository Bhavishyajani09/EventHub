const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Booking = require('../models/Booking');
const Event = require('../models/Event');

// Get all bookings for organizer's events
router.get('/organizer', auth, async (req, res) => {
  try {
    const organizerId = req.user.id;

    // Get all events by this organizer
    const organizerEvents = await Event.find({ organizer: organizerId }).select('_id');
    const eventIds = organizerEvents.map(event => event._id);

    // Get all bookings for these events
    const bookings = await Booking.find({ event: { $in: eventIds } })
      .populate('user', 'name email phone')
      .populate('event', 'title date location')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings
    });

  } catch (error) {
    console.error('Get organizer bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings'
    });
  }
});

// Get bookings for specific event
router.get('/event/:eventId', auth, async (req, res) => {
  try {
    const { eventId } = req.params;
    const organizerId = req.user.id;

    // Verify event belongs to organizer
    const event = await Event.findOne({ _id: eventId, organizer: organizerId });
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found or unauthorized'
      });
    }

    const bookings = await Booking.find({ event: eventId })
      .populate('user', 'name email phone')
      .populate('event', 'title date location')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings
    });

  } catch (error) {
    console.error('Get event bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch event bookings'
    });
  }
});

module.exports = router;