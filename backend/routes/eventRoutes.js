const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const eventController = require('../controllers/eventController');

// Event management routes
router.post('/organizer/events', auth, eventController.createEvent);
router.put('/organizer/events/:id', auth, eventController.updateEvent);
router.post('/organizer/events/:id/poster', auth, upload.single('poster'), eventController.uploadPoster);
router.post('/organizer/events/:id/tickets', auth, eventController.addTicketTypes);
router.put('/organizer/events/:id/publish', auth, eventController.publishEvent);
router.put('/organizer/events/:id/unpublish', auth, eventController.unpublishEvent);
router.delete('/organizer/events/:id', auth, eventController.deleteEvent);

module.exports = router;