const express = require('express');
const Event = require('../models/Event');
const Review = require('../models/Review');

const router = express.Router();

// @route   GET /events
// @desc    Get all events
// @access  Public
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({ status: 'active' })
      .populate('organizer', 'name email')
      .sort({ date: 1 });

    res.json({
      success: true,
      count: events.length,
      events
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /events/city/:city
// @desc    Get events by city (dynamic)
// @access  Public
router.get('/city/:city', async (req, res) => {
  try {
    const { city } = req.params;
    
    if (!city || city.trim() === '') {
      return res.status(400).json({ message: 'City parameter is required' });
    }

    const events = await Event.find({ 
      city: city.trim().toLowerCase(), 
      status: 'active' 
    })
      .populate('organizer', 'name email')
      .sort({ date: 1 });

    res.json({
      success: true,
      count: events.length,
      city: city.trim(),
      events
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /events/category/:category
// @desc    Get events by category (dynamic)
// @access  Public
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    
    if (!category || category.trim() === '') {
      return res.status(400).json({ message: 'Category parameter is required' });
    }

    const events = await Event.find({ 
      category: category.trim().toLowerCase(), 
      status: 'active' 
    })
      .populate('organizer', 'name email')
      .sort({ date: 1 });

    res.json({
      success: true,
      count: events.length,
      category: category.trim(),
      events
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /events/date/:date
// @desc    Get events by date
// @access  Public
router.get('/date/:date', async (req, res) => {
  try {
    const { date } = req.params;
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    const events = await Event.find({
      date: {
        $gte: startDate,
        $lt: endDate
      },
      status: 'active'
    })
      .populate('organizer', 'name email')
      .sort({ time: 1 });

    res.json({
      success: true,
      count: events.length,
      date,
      events
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /events/:eventId
// @desc    Get single event details
// @access  Public
router.get('/:eventId', async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId)
      .populate('organizer', 'name email');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({
      success: true,
      event
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /events/search
// @desc    Search events (name / artist)
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const events = await Event.find({
      $and: [
        { status: 'active' },
        {
          $or: [
            { name: { $regex: q, $options: 'i' } },
            { artist: { $regex: q, $options: 'i' } }
          ]
        }
      ]
    })
      .populate('organizer', 'name email')
      .sort({ date: 1 });

    res.json({
      success: true,
      count: events.length,
      query: q,
      events
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /events/:eventId/reviews
// @desc    Get event reviews
// @access  Public
router.get('/:eventId/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({ event: req.params.eventId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    const avgRating = reviews.length > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
      : 0;

    res.json({
      success: true,
      count: reviews.length,
      avgRating: Math.round(avgRating * 10) / 10,
      reviews
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;