const express = require('express');
const Review = require('../models/Review');
const Event = require('../models/Event');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /reviews/event/:eventId
// @desc    Get all reviews for an event
// @access  Public
router.get('/event/:eventId', async (req, res) => {
  try {
    const reviews = await Review.find({ event: req.params.eventId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      : 0;

    res.json({
      success: true,
      reviews,
      totalReviews,
      averageRating: Math.round(averageRating * 10) / 10
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /reviews/user/:userId
// @desc    Get all reviews by a user
// @access  Public
router.get('/user/:userId', async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.params.userId })
      .populate('event', 'title')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      reviews
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /reviews
// @desc    Add review
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { eventId, rating, comment } = req.body;

    if (!eventId || !rating) {
      return res.status(400).json({ message: 'Event ID and rating are required' });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const existingReview = await Review.findOne({ user: req.user.id, event: eventId });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this event' });
    }

    const review = await Review.create({
      user: req.user.id,
      event: eventId,
      rating,
      comment
    });

    await review.populate('user', 'name');

    res.status(201).json({
      success: true,
      review
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /reviews/:id
// @desc    Edit own review
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    await review.save();

    await review.populate('user', 'name');

    res.json({
      success: true,
      review
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /reviews/:id
// @desc    Delete own review
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Review.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /reviews/can-review/:eventId
// @desc    Check if user can review an event
// @access  Private
router.get('/can-review/:eventId', auth, async (req, res) => {
  try {
    const { eventId } = req.params;

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Check if event has expired
    const eventDate = new Date(event.date);
    const now = new Date();
    if (eventDate >= now) {
      return res.json({
        success: true,
        canReview: false,
        reason: 'Event has not occurred yet'
      });
    }

    // Check if user has a confirmed booking
    const booking = await Booking.findOne({
      user: req.user.id,
      event: eventId,
      status: 'confirmed'
    });

    if (!booking) {
      return res.json({
        success: true,
        canReview: false,
        reason: 'No confirmed booking found'
      });
    }

    // Check if user already reviewed
    const existingReview = await Review.findOne({
      user: req.user.id,
      event: eventId
    });

    if (existingReview) {
      return res.json({
        success: true,
        canReview: false,
        reason: 'Already reviewed',
        review: existingReview
      });
    }

    res.json({
      success: true,
      canReview: true
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// @route   GET /reviews/organizer/my-reviews
// @desc    Get all reviews for organizer's events
// @access  Private
router.get('/organizer/my-reviews', auth, async (req, res) => {
  try {
    // Find all events by this organizer
    const organizerEvents = await Event.find({ organizer: req.user.id });
    const eventIds = organizerEvents.map(event => event._id);

    // Find all reviews for these events
    const reviews = await Review.find({ event: { $in: eventIds } })
      .populate('user', 'name email')
      .populate('event', 'title date location')
      .sort({ createdAt: -1 });

    // Calculate statistics
    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      : 0;

    // Rating breakdown
    const ratingBreakdown = [
      { star: 5, count: reviews.filter(r => r.rating === 5).length },
      { star: 4, count: reviews.filter(r => r.rating === 4).length },
      { star: 3, count: reviews.filter(r => r.rating === 3).length },
      { star: 2, count: reviews.filter(r => r.rating === 2).length },
      { star: 1, count: reviews.filter(r => r.rating === 1).length }
    ];

    res.json({
      success: true,
      reviews,
      stats: {
        totalReviews,
        averageRating: Math.round(averageRating * 10) / 10,
        ratingBreakdown,
        fiveStarCount: ratingBreakdown[0].count,
        fiveStarPercentage: totalReviews > 0 ? Math.round((ratingBreakdown[0].count / totalReviews) * 100) : 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router;