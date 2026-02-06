const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  registerOrganizer,
  loginOrganizer,
  updateProfile,
  getEventBookings,
  getEventAttendees,
  getDashboard,
  closeEventBooking,
  cancelEvent,
  getAnalytics
} = require('../controllers/organizerController');

/**
 * Organizer Authentication Routes
 * These routes handle organizer registration and login
 */

/**
 * @route   POST /auth/organizer/register
 * @desc    Register a new organizer account
 * @access  Public
 * @body    { name, email, password, phone }
 */
router.post('/auth/organizer/register', registerOrganizer);

/**
 * @route   POST /auth/organizer/login
 * @desc    Authenticate organizer and get JWT token
 * @access  Public
 * @body    { email, password }
 */
router.post('/auth/organizer/login', loginOrganizer);

/**
 * Organizer Profile Routes
 * These routes require authentication (JWT token)
 */

/**
 * @route   PUT /organizer/profile
 * @desc    Update organizer profile information
 * @access  Private (requires valid JWT token)
 * @body    { name?, email?, phone?, password? } - all fields optional
 * @header  Authorization: Bearer <jwt_token>
 */
router.put('/organizer/profile', authMiddleware, updateProfile);

/**
 * Organizer Booking Management Routes
 */

/**
 * @route   GET /organizer/events/:id/bookings
 * @desc    View bookings for own events
 * @access  Private
 */
router.get('/organizer/events/:id/bookings', authMiddleware, getEventBookings);

/**
 * @route   GET /organizer/events/:id/attendees
 * @desc    View attendee list
 * @access  Private
 */
router.get('/organizer/events/:id/attendees', authMiddleware, getEventAttendees);

/**
 * Organizer Dashboard Routes
 */

/**
 * @route   GET /organizer/dashboard
 * @desc    Organizer dashboard stats
 * @access  Private
 */
router.get('/organizer/dashboard', authMiddleware, getDashboard);

/**
 * @route   GET /organizer/analytics
 * @desc    Get analytics data with filters
 * @access  Private
 */
router.get('/organizer/analytics', authMiddleware, getAnalytics);

/**
 * Event Control Routes
 */

/**
 * @route   PUT /organizer/events/:id/close-booking
 * @desc    Close booking manually
 * @access  Private
 */
router.put('/organizer/events/:id/close-booking', authMiddleware, closeEventBooking);

/**
 * @route   PUT /organizer/events/:id/cancel
 * @desc    Cancel event & notify users
 * @access  Private
 */
router.put('/organizer/events/:id/cancel', authMiddleware, cancelEvent);

module.exports = router;