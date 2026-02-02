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
          phone: organizer.phone
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
          phone: organizer.phone
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
    const organizerId = req.organizer._id;

    // Build update object with only provided fields
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (password) updateData.password = password; // Will be hashed by pre-save middleware

    // Check if email is being updated and already exists
    if (email) {
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

    // Update organizer profile
    const updatedOrganizer = await Organizer.findByIdAndUpdate(
      organizerId,
      updateData,
      { 
        new: true, // Return updated document
        runValidators: true // Run schema validations
      }
    ).select('-password'); // Exclude password from response

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        organizer: {
          id: updatedOrganizer._id,
          name: updatedOrganizer.name,
          email: updatedOrganizer.email,
          phone: updatedOrganizer.phone
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
    const organizerId = req.organizer._id;

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
    const organizerId = req.organizer._id;

    const totalEvents = await Event.countDocuments({ organizer: organizerId });
    const publishedEvents = await Event.countDocuments({ organizer: organizerId, isPublished: true });
    const totalBookings = await Booking.countDocuments({
      event: { $in: await Event.find({ organizer: organizerId }).select('_id') }
    });
    const totalRevenue = await Booking.aggregate([
      { $lookup: { from: 'events', localField: 'event', foreignField: '_id', as: 'eventData' } },
      { $match: { 'eventData.organizer': organizerId, status: 'confirmed' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    res.json({
      success: true,
      data: {
        totalEvents,
        publishedEvents,
        totalBookings,
        totalRevenue: totalRevenue[0]?.total || 0
      }
    });
  } catch (error) {
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

module.exports = {
  registerOrganizer,
  loginOrganizer,
  updateProfile,
  getEventBookings,
  getEventAttendees,
  getDashboard,
  closeEventBooking,
  cancelEvent
};