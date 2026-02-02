const Event = require('../models/Event');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');

// Create event
exports.createEvent = async (req, res) => {
  try {
    const { title, description, artistName, city, venue, date, time, ticketTypes } = req.body;
    
    const event = new Event({
      title,
      description,
      artistName,
      city,
      venue,
      date,
      time,
      ticketTypes,
      organizer: req.organizer._id
    });

    await event.save();
    res.status(201).json({ success: true, event });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update event
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, organizer: req.organizer._id },
      req.body,
      { new: true }
    );
    
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    
    res.json({ success: true, event });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Upload event poster
exports.uploadPoster = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, organizer: req.organizer._id },
      { poster: result.secure_url },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.json({ success: true, posterUrl: result.secure_url });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Add ticket types
exports.addTicketTypes = async (req, res) => {
  try {
    const { ticketTypes } = req.body;
    
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, organizer: req.organizer._id },
      { $push: { ticketTypes: { $each: ticketTypes } } },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.json({ success: true, event });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Publish event
exports.publishEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, organizer: req.organizer._id },
      { isPublished: true },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.json({ success: true, message: 'Event published successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Unpublish event
exports.unpublishEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, organizer: req.organizer._id },
      { isPublished: false },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.json({ success: true, message: 'Event unpublished successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({ _id: req.params.id, organizer: req.organizer._id });

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};