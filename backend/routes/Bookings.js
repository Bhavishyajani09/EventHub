const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Booking = require('../models/Booking');
const Event = require('../models/Event');

// Get authenticated user's bookings
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await Booking.find({ user: userId })
      .populate('event')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings
    });
  } catch (error) {
    console.error('Get my bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch your bookings'
    });
  }
});

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

// Create new booking
router.post('/create', auth, async (req, res) => {
  try {
    const { eventId, ticketType, quantity, totalAmount, paymentId } = req.body;
    const userId = req.user.id; // From auth middleware

    // Validate input
    if (!eventId || !ticketType || !quantity || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required booking details'
      });
    }

    // Find event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Check if event has specific seat types configured
    let pricePerTicket;
    let selectedTicketType;

    if (event.seatTypes && event.seatTypes.length > 0) {
      // Find the specific seat type
      // Convert ticketType to match database format (case insensitive or exact match)
      const seatTypeIndex = event.seatTypes.findIndex(
        seat => seat.name.toLowerCase() === ticketType.toLowerCase()
      );

      if (seatTypeIndex === -1) {
        return res.status(400).json({
          success: false,
          message: 'Invalid ticket type'
        });
      }

      const seatDetails = event.seatTypes[seatTypeIndex];
      pricePerTicket = seatDetails.price;
      selectedTicketType = seatDetails.name;

      // Check availability
      if (seatDetails.available < quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough seats available. Only ${seatDetails.available} left.`
        });
      }

      // Update available seats
      event.seatTypes[seatTypeIndex].available -= quantity;
    } else {
      // Generic booking using event base price and capacity
      pricePerTicket = event.price;
      selectedTicketType = 'Standard';

      // Check overall capacity
      if (event.capacity < quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough seats available. Only ${event.capacity} left.`
        });
      }

      // Update total capacity
      event.capacity -= quantity;
    }

    await event.save();

    // Create Booking
    const newBooking = new Booking({
      user: userId,
      event: eventId,
      tickets: quantity,
      ticketType: selectedTicketType,
      pricePerTicket: pricePerTicket,
      totalAmount,
      status: 'confirmed', // Assuming immediate confirmation after payment
      paymentId: paymentId || 'PAY-' + Date.now(), // Use provided ID or generate one
      bookingId: 'BK' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase()
    });

    await newBooking.save();

    res.status(201).json({
      success: true,
      message: 'Booking successful',
      booking: newBooking
    });

  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking'
    });
  }
});

// Cancel booking
// Cancel booking
router.post('/cancel/:bookingId', auth, async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user.id;
    
    console.log(`[Cancel Booking] Request for bookingId: ${bookingId}, User: ${userId}`);

    // Find booking
    const booking = await Booking.findOne({ _id: bookingId, user: userId });
    
    if (!booking) {
      console.log(`[Cancel Booking] Booking not found or user unauthorized`);
      return res.status(404).json({
        success: false,
        message: 'Booking not found or unauthorized'
      });
    }

    if (booking.status === 'cancelled') {
        console.log(`[Cancel Booking] Booking already cancelled`);
        return res.status(400).json({
            success: false,
            message: 'Booking is already cancelled'
        });
    }

    // Find event
    const event = await Event.findById(booking.event);
    if (!event) {
      console.log(`[Cancel Booking] Event not found for id: ${booking.event}`);
      return res.status(404).json({
        success: false,
        message: 'Event associated with booking not found'
      });
    }

    console.log(`[Cancel Booking] Found event: ${event.title}, Date: ${event.date}`);

    // Check time difference for refund policy (24 hours)
    const eventDate = new Date(event.date);
    const currentDate = new Date();
    const timeDiff = eventDate.getTime() - currentDate.getTime();
    const hoursDiff = timeDiff / (1000 * 3600);
    
    console.log(`[Cancel Booking] Hours diff: ${hoursDiff}`);

    let refundStatus = 'none';
    let refundMessage = 'Cancellation successful. No refund as per policy (less than 24h before event).';

    if (hoursDiff > 24) {
      refundStatus = 'full';
      refundMessage = 'Cancellation successful. Amount refunded to source.';
    }

    // Update booking status
    booking.status = 'cancelled';
    await booking.save();
    console.log(`[Cancel Booking] Booking status updated to cancelled`);

    // Restore event capacity/seats
    console.log(`[Cancel Booking] Restoring tickets. Type: ${booking.ticketType}, Count: ${booking.tickets}`);
    
    if (event.seatTypes && event.seatTypes.length > 0) {
      // Case-insensitive matching with trim
      const bookingTicketType = (booking.ticketType || '').toLowerCase().trim();
      
      const seatTypeIndex = event.seatTypes.findIndex(
        seat => seat.name && seat.name.toLowerCase().trim() === bookingTicketType
      );
      
      if (seatTypeIndex !== -1) {
        const currentAvailable = event.seatTypes[seatTypeIndex].available || 0;
        const newAvailable = currentAvailable + Number(booking.tickets);
        
        console.log(`[Cancel Booking] Updating seat ${event.seatTypes[seatTypeIndex].name}. Old: ${currentAvailable}, New: ${newAvailable}`);
        
        event.seatTypes[seatTypeIndex].available = newAvailable;
      } else {
        console.warn(`[Cancel Booking] Seat type match failed. Booking type: '${bookingTicketType}'. Available types: ${event.seatTypes.map(s => s.name).join(', ')}`);
        // Fallback: Try to find "General" or "Standard" if checking fail? 
        // Or simply fail silently on inventory restore but still cancel booking?
        // Let's log heavily.
      }
    } else {
      const currentCapacity = event.capacity || 0;
      event.capacity = currentCapacity + Number(booking.tickets);
      console.log(`[Cancel Booking] Updating general capacity. Old: ${currentCapacity}, New: ${event.capacity}`);
    }
    
    // Mark modified to ensure mongoose saves it
    event.markModified('seatTypes');
    event.markModified('capacity');
    
    await event.save();
    console.log(`[Cancel Booking] Event saved successfully`);

    res.json({
      success: true,
      message: refundMessage,
      refundStatus
    });

  } catch (error) {
    console.error('[Cancel Booking] Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel booking',
      error: error.message
    });
  }
});

module.exports = router;