const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const eventController = require('../controllers/eventController');

// Get organizer's events
router.get('/', auth, eventController.getOrganizerEvents);

// Get event by ID
router.get('/:id', auth, eventController.getEventById);

// Create event
router.post('/', auth, upload.single('image'), eventController.createEvent);

// Update event
router.put('/:id', auth, upload.single('image'), eventController.updateEvent);

// Delete event
router.delete('/:id', auth, eventController.deleteEvent);

// Publish/Unpublish event
router.put('/:id/publish', auth, eventController.publishEvent);
router.put('/:id/unpublish', auth, eventController.unpublishEvent);

module.exports = router;