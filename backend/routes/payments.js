const express = require('express');
const Booking = require('../models/Booking');

const router = express.Router();

// @route   POST /payments/callback
// @desc    Payment success / failure callback
// @access  Public
router.post('/callback', async (req, res) => {
  try {
    const { bookingId, paymentId, status } = req.body;

    const booking = await Booking.findOne({ bookingId });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.paymentId = paymentId;
    booking.status = status === 'success' ? 'confirmed' : 'cancelled';
    await booking.save();

    res.json({
      success: true,
      message: `Payment ${status}`,
      booking: {
        id: booking._id,
        bookingId: booking.bookingId,
        status: booking.status
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;