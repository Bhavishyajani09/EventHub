const jwt = require('jsonwebtoken');
const Organizer = require('../models/Organizer');
const Event = require('../models/Event');
const Booking = require('../models/Booking');

/**
 * Generate JWT Token
 * @param {string} id - Organizer ID
 * @returns {string} - JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

/**
 * @desc    Register new organizer
 * @route   POST /auth/organizer/register
 * @access  Public
 */
const registerOrganizer = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Validate required fields
    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, password, phone'
      });
    }

    // Check if organizer already exists
    const existingOrganizer = await Organizer.findOne({ email });
    if (existingOrganizer) {
      return res.status(400).json({
        success: false,
        message: 'Organizer with this email already exists'
      });
    }

    // Create new organizer (password will be hashed by pre-save middleware)
    const organizer = await Organizer.create({
      name,
      email,
      password,
      phone
    });

    // Generate JWT token
    const token = generateToken(organizer._id);

    res.status(201).json({
      success: true,
      message: 'Organizer registered successfully',
      data: {
        organizer: {
          id: organizer._id,
          name: organizer.name,
          email: organizer.email,
          phone: organizer.phone,
          role: organizer.role,
          photo: organizer.photo
        },
        token
      }
    });

  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

/**
 * @desc    Authenticate organizer & get token
 * @route   POST /auth/organizer/login
 * @access  Public
 */
const loginOrganizer = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find organizer by email (include password for comparison)
    const organizer = await Organizer.findOne({ email });

    if (!organizer) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password using the comparePassword method
    const isPasswordValid = await organizer.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    if (organizer.isBlocked) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been blocked by the administrator.'
      });
    }

    // Generate JWT token
    const token = generateToken(organizer._id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        organizer: {
          id: organizer._id,
          name: organizer.name,
          email: organizer.email,
          phone: organizer.phone,
          role: organizer.role,
          photo: organizer.photo
        },
        token
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

/**
 * @desc    Update organizer profile
 * @route   PUT /organizer/profile
 * @access  Private (requires authentication)
 */
const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Get organizer ID from authenticated request
    const organizerId = req.user.id;

    // Find organizer
    const organizer = await Organizer.findById(organizerId);
    if (!organizer) {
      return res.status(404).json({
        success: false,
        message: 'Organizer not found'
      });
    }

    // Check if email is being updated and already exists
    if (email && email !== organizer.email) {
      const existingOrganizer = await Organizer.findOne({
        email,
        _id: { $ne: organizerId } // Exclude current organizer
      });

      if (existingOrganizer) {
        return res.status(400).json({
          success: false,
          message: 'Email is already in use by another organizer'
        });
      }
    }

    // Update fields
    if (name) organizer.name = name;
    if (email) organizer.email = email;
    if (phone) organizer.phone = phone;
    if (password) organizer.password = password; // Will be hashed by pre-save middleware
    if (req.body.photo) {
      organizer.photo = req.body.photo;
    }

    await organizer.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        organizer: {
          id: organizer._id,
          name: organizer.name,
          email: organizer.email,
          phone: organizer.phone,
          role: organizer.role,
          photo: organizer.photo
        }
      }
    });

  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during profile update'
    });
  }
};

/**
 * @desc    Get bookings for organizer's event
 * @route   GET /organizer/events/:id/bookings
 * @access  Private
 */
const getEventBookings = async (req, res) => {
  try {
    const { id } = req.params;
    const organizerId = req.user.id;

    const event = await Event.findOne({ _id: id, organizer: organizerId });
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    const bookings = await Booking.find({ event: id }).populate('event', 'title date');

    res.json({
      success: true,
      data: { bookings }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * @desc    Get attendee list for organizer's event
 * @route   GET /organizer/events/:id/attendees
 * @access  Private
 */
const getEventAttendees = async (req, res) => {
  try {
    const { id } = req.params;
    const organizerId = req.organizer._id;

    const event = await Event.findOne({ _id: id, organizer: organizerId });
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    const attendees = await Booking.find({ event: id, status: 'confirmed' })
      .select('attendee tickets totalAmount createdAt');

    res.json({
      success: true,
      data: { attendees }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * @desc    Get organizer dashboard stats
 * @route   GET /organizer/dashboard
 * @access  Private
 */
const getDashboard = async (req, res) => {
  try {
    const organizerId = req.user.id;

    const totalEvents = await Event.countDocuments({ organizer: organizerId });
    const publishedEvents = await Event.countDocuments({ organizer: organizerId, isPublished: true });

    // Get organizer's events first
    const organizerEvents = await Event.find({ organizer: organizerId }).select('_id');
    const eventIds = organizerEvents.map(event => event._id);

    const totalBookings = eventIds.length > 0 ? await Booking.countDocuments({ event: { $in: eventIds } }) : 0;

    let totalRevenue = 0;
    if (eventIds.length > 0) {
      const revenueResult = await Booking.aggregate([
        { $match: { event: { $in: eventIds }, status: 'confirmed' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ]);
      totalRevenue = revenueResult[0]?.total || 0;
    }

    res.json({
      success: true,
      data: {
        totalEvents,
        publishedEvents,
        totalBookings,
        totalRevenue
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * @desc    Close booking for event
 * @route   PUT /organizer/events/:id/close-booking
 * @access  Private
 */
const closeEventBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const organizerId = req.organizer._id;

    const event = await Event.findOneAndUpdate(
      { _id: id, organizer: organizerId },
      { bookingOpen: false },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.json({
      success: true,
      message: 'Booking closed successfully',
      data: { event }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * @desc    Cancel event and notify users
 * @route   PUT /organizer/events/:id/cancel
 * @access  Private
 */
const cancelEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const organizerId = req.organizer._id;

    const event = await Event.findOneAndUpdate(
      { _id: id, organizer: organizerId },
      { isCancelled: true, bookingOpen: false },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    await Booking.updateMany(
      { event: id },
      { status: 'cancelled' }
    );

    res.json({
      success: true,
      message: 'Event cancelled successfully',
      data: { event }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * @desc    Get analytics data for organizer
 * @route   GET /organizer/analytics
 * @access  Private
 */
const getAnalytics = async (req, res) => {
  try {
    const organizerId = req.user.id;
    const { timeRange, eventId, startDate, endDate } = req.query;

    // Get all events for this organizer
    const organizerEvents = await Event.find({ organizer: organizerId }).select('_id title');
    const eventIds = organizerEvents.map(event => event._id);

    if (eventIds.length === 0) {
      return res.json({
        success: true,
        data: {
          events: [],
          totalRevenue: 0,
          ticketsSold: 0,
          avgTicketPrice: 0,
          conversionRate: 0,
          ticketTypeDistribution: [],
          bookingFunnel: {
            totalBookings: 0,
            confirmedBookings: 0,
            cancelledBookings: 0,
            totalRevenue: 0
          }
        }
      });
    }

    // Build filter for bookings
    let bookingFilter = { event: { $in: eventIds } };

    // Apply event filter if specific event selected
    if (eventId && eventId !== 'All Events') {
      bookingFilter.event = eventId;
    }

    // Apply date range filter
    let dateFilter = {};
    if (startDate && endDate) {
      dateFilter = {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(new Date(endDate).setHours(23, 59, 59, 999))
        }
      };
    } else if (timeRange) {
      const now = new Date();
      let startDateCalc;

      switch (timeRange) {
        case 'Last 7 Days':
          startDateCalc = new Date(now.setDate(now.getDate() - 7));
          break;
        case 'Last 30 Days':
          startDateCalc = new Date(now.setDate(now.getDate() - 30));
          break;
        case 'This Year':
          startDateCalc = new Date(now.getFullYear(), 0, 1);
          break;
        default:
          startDateCalc = new Date(now.setDate(now.getDate() - 30));
      }

      dateFilter = {
        createdAt: { $gte: startDateCalc }
      };
    }

    // Combine filters
    const finalFilter = { ...bookingFilter, ...dateFilter };

    // Get all bookings with filter
    const allBookings = await Booking.find(finalFilter);
    const confirmedBookings = allBookings.filter(b => b.status === 'confirmed');
    const cancelledBookings = allBookings.filter(b => b.status === 'cancelled');

    // Calculate total revenue
    const totalRevenue = confirmedBookings.reduce((sum, b) => sum + b.totalAmount, 0);

    // Calculate tickets sold
    const ticketsSold = confirmedBookings.reduce((sum, b) => sum + b.tickets, 0);

    // Calculate average ticket price
    const avgTicketPrice = ticketsSold > 0 ? Math.round(totalRevenue / ticketsSold) : 0;

    // Calculate conversion rate
    const conversionRate = allBookings.length > 0
      ? ((confirmedBookings.length / allBookings.length) * 100).toFixed(1)
      : 0;

    // Calculate ticket type distribution
    const ticketTypeCount = confirmedBookings.reduce((acc, b) => {
      const type = b.ticketType;
      const qty = b.tickets;
      acc[type] = (acc[type] || 0) + qty;
      return acc;
    }, {});

    const totalConfirmedTickets = Object.values(ticketTypeCount).reduce((sum, val) => sum + val, 0);

    const ticketTypeDistribution = Object.entries(ticketTypeCount).map(([type, count]) => ({
      label: type,
      count: count,
      percent: totalConfirmedTickets === 0 ? 0 : Math.round((count / totalConfirmedTickets) * 100)
    }));

    // Booking funnel data
    const bookingFunnel = {
      totalBookings: allBookings.length,
      confirmedBookings: confirmedBookings.length,
      cancelledBookings: cancelledBookings.length,
      totalRevenue: totalRevenue
    };

    res.json({
      success: true,
      data: {
        events: organizerEvents,
        totalRevenue,
        ticketsSold,
        avgTicketPrice,
        conversionRate,
        ticketTypeDistribution,
        bookingFunnel
      }
    });

  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching analytics'
    });
  }
};

module.exports = {
  registerOrganizer,
  loginOrganizer,
  updateProfile,
  getEventBookings,
  getEventAttendees,
  getDashboard,
  closeEventBooking,
  cancelEvent,
  getAnalytics
};