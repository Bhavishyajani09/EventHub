const express = require('express');
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const Booking = require('../models/Booking');
const Event = require('../models/Event');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /bookings
// @desc    Create booking with detailed pricing
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { eventId, tickets, ticketTypeId } = req.body;

    if (!eventId || !tickets) {
      return res.status(400).json({ message: 'Event ID and tickets are required' });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Find ticket type and get price
    let ticketPrice;
    if (event.ticketTypes && event.ticketTypes.length > 0) {
      const ticketType = ticketTypeId ? 
        event.ticketTypes.find(t => t._id.toString() === ticketTypeId) :
        event.ticketTypes[0]; // Default to first ticket type
      
      if (!ticketType) {
        return res.status(400).json({ message: 'Invalid ticket type' });
      }
      ticketPrice = parseFloat(ticketType.price);
    } else {
      ticketPrice = parseFloat(event.price);
    }
    
    if (isNaN(ticketPrice) || ticketPrice <= 0) {
      return res.status(400).json({ message: 'Invalid event price' });
    }
    
    const subtotal = ticketPrice * tickets;
    const convenienceFee = subtotal * 0.05; // 5% convenience fee
    const gst = (subtotal + convenienceFee) * 0.18; // 18% GST
    const totalAmount = subtotal + convenienceFee + gst;

    const booking = await Booking.create({
      user: req.user.id,
      event: eventId,
      tickets,
      totalAmount
    });

    await booking.populate(['user', 'event']);

    res.status(201).json({
      success: true,
      booking: {
        bookingId: booking.bookingId,
        eventDetails: {
          name: booking.event.name,
          city: booking.event.city,
          venue: booking.event.venue,
          date: booking.event.date,
          time: booking.event.time
        },
        ticketDetails: {
          quantity: tickets,
          pricePerTicket: ticketPrice
        },
        pricingBreakdown: {
          subtotal: Math.round(subtotal * 100) / 100,
          convenienceFee: Math.round(convenienceFee * 100) / 100,
          gst: Math.round(gst * 100) / 100,
          totalAmount: Math.round(totalAmount * 100) / 100
        },
        status: booking.status,
        createdAt: booking.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /bookings/calculate
// @desc    Calculate detailed ticket pricing
// @access  Public
router.post('/calculate', async (req, res) => {
  try {
    const { eventId, tickets, ticketTypeId } = req.body;

    if (!eventId || !tickets) {
      return res.status(400).json({ message: 'Event ID and tickets are required' });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Find ticket type and get price
    let ticketPrice;
    if (event.ticketTypes && event.ticketTypes.length > 0) {
      const ticketType = ticketTypeId ? 
        event.ticketTypes.find(t => t._id.toString() === ticketTypeId) :
        event.ticketTypes[0];
      
      if (!ticketType) {
        return res.status(400).json({ message: 'Invalid ticket type' });
      }
      ticketPrice = parseFloat(ticketType.price);
    } else {
      ticketPrice = parseFloat(event.price);
    }
    
    if (isNaN(ticketPrice) || ticketPrice <= 0) {
      return res.status(400).json({ message: 'Invalid event price' });
    }

    const subtotal = ticketPrice * tickets;
    const convenienceFee = subtotal * 0.05;
    const gst = (subtotal + convenienceFee) * 0.18;
    const total = subtotal + convenienceFee + gst;

    res.json({
      success: true,
      eventDetails: {
        name: event.name,
        city: event.city,
        venue: event.venue,
        date: event.date,
        time: event.time
      },
      ticketDetails: {
        quantity: tickets,
        pricePerTicket: ticketPrice
      },
      pricingBreakdown: {
        subtotal: Math.round(subtotal * 100) / 100,
        convenienceFee: Math.round(convenienceFee * 100) / 100,
        gst: Math.round(gst * 100) / 100,
        totalAmount: Math.round(total * 100) / 100
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



// @route   GET /bookings/upcoming
// @desc    View upcoming bookings
// @access  Private
router.get('/upcoming', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ 
      user: req.user.id,
      status: { $ne: 'cancelled' }
    })
    .populate('event', 'name date time venue city')
    .sort({ 'event.date': 1 });

    const upcoming = bookings.filter(booking => new Date(booking.event.date) >= new Date());

    res.json({
      success: true,
      count: upcoming.length,
      bookings: upcoming
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /bookings/:id/download
// @desc    Download ticket
// @access  Private
router.get('/:id/download', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email')
      .populate('event', 'name date time venue city');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const qrData = `Booking: ${booking.bookingId}\nEvent: ${booking.event.name}\nTickets: ${booking.tickets}`;
    const qrCode = await QRCode.toDataURL(qrData);

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="ticket-${booking.bookingId}.pdf"`);

    doc.pipe(res);

    doc.fontSize(20).text('E-TICKET', 50, 50);
    doc.fontSize(14)
       .text(`Booking ID: ${booking.bookingId}`, 50, 100)
       .text(`Event: ${booking.event.name}`, 50, 120)
       .text(`Date: ${booking.event.date}`, 50, 140)
       .text(`Time: ${booking.event.time}`, 50, 160)
       .text(`Venue: ${booking.event.venue}`, 50, 180)
       .text(`Tickets: ${booking.tickets}`, 50, 200)
       .text(`Total: $${booking.totalAmount}`, 50, 220);

    const qrBuffer = Buffer.from(qrCode.split(',')[1], 'base64');
    doc.image(qrBuffer, 400, 100, { width: 100 });

    doc.end();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /bookings
// @desc    Get user's bookings
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('event', 'name date time venue city')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /bookings/:id/ticket
// @desc    Generate e-ticket (PDF + QR)
// @access  Private
router.get('/:id/ticket', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email')
      .populate('event', 'name date time venue city');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (booking.status !== 'confirmed') {
      return res.status(400).json({ message: 'Booking not confirmed' });
    }

    // Generate QR code
    const qrData = `Booking: ${booking.bookingId}\nEvent: ${booking.event.name}\nTickets: ${booking.tickets}`;
    const qrCode = await QRCode.toDataURL(qrData);

    // Create PDF
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="ticket-${booking.bookingId}.pdf"`);

    doc.pipe(res);

    // PDF content
    doc.fontSize(20).text('E-TICKET', 50, 50);
    doc.fontSize(14)
       .text(`Booking ID: ${booking.bookingId}`, 50, 100)
       .text(`Event: ${booking.event.name}`, 50, 120)
       .text(`Date: ${booking.event.date}`, 50, 140)
       .text(`Time: ${booking.event.time}`, 50, 160)
       .text(`Venue: ${booking.event.venue}`, 50, 180)
       .text(`Tickets: ${booking.tickets}`, 50, 200)
       .text(`Total: $${booking.totalAmount}`, 50, 220);

    // Add QR code
    const qrBuffer = Buffer.from(qrCode.split(',')[1], 'base64');
    doc.image(qrBuffer, 400, 100, { width: 100 });

    doc.end();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /bookings/:id/cancel
// @desc    Cancel booking
// @access  Private
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking already cancelled' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;