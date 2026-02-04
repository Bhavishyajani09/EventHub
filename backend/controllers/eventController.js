const Event = require('../models/Event');
const Booking = require('../models/Booking');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');

// Get organizer's events
exports.getOrganizerEvents = async (req, res) => {
  try {
    const organizerId = req.user.id;
    const events = await Event.find({ organizer: organizerId })
      .sort({ createdAt: -1 })
      .populate('organizer', 'name email');
    
    res.json({
      success: true,
      events
    });
  } catch (error) {
    console.error('Get organizer events error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events'
    });
  }
};

// Get event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findOne({ 
      _id: req.params.id, 
      organizer: req.user.id 
    }).populate('organizer', 'name email');
    
    if (!event) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found' 
      });
    }
    
    res.json({
      success: true,
      event
    });
  } catch (error) {
    console.error('Get event by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch event'
    });
  }
};

// Create event
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location, capacity, price, category, isPublished, seatTypes } = req.body;
    
    let imageUrl = '';
    if (req.file) {
      // Upload buffer to Cloudinary
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: 'eventhub/events',
            transformation: [
              { width: 800, height: 600, crop: 'fill' },
              { quality: 'auto' }
            ]
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(req.file.buffer);
      });
      imageUrl = result.secure_url;
    }
    
    // Parse seat types if provided
    let parsedSeatTypes = [];
    if (seatTypes) {
      try {
        parsedSeatTypes = JSON.parse(seatTypes).map(seat => ({
          ...seat,
          price: parseFloat(seat.price),
          quantity: parseInt(seat.quantity),
          available: parseInt(seat.quantity) // Initially all seats are available
        }));
      } catch (e) {
        console.error('Error parsing seat types:', e);
      }
    }
    
    const event = new Event({
      title,
      description,
      date: new Date(`${date}T${time}`),
      location,
      capacity: parseInt(capacity),
      price: parseFloat(price),
      category,
      isPublished: isPublished === 'true',
      image: imageUrl,
      seatTypes: parsedSeatTypes,
      organizer: req.user.id
    });

    await event.save();
    res.status(201).json({ success: true, event });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update event
exports.updateEvent = async (req, res) => {
  try {
    const { title, description, date, time, location, capacity, price, category, isPublished } = req.body;
    
    let updateData = {};
    
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (location !== undefined) updateData.location = location;
    if (category !== undefined) updateData.category = category;
    if (capacity !== undefined && capacity !== '') updateData.capacity = parseInt(capacity);
    if (price !== undefined && price !== '') updateData.price = parseFloat(price);
    if (isPublished !== undefined) updateData.isPublished = isPublished === 'true' || isPublished === true;
    
    if (date) {
      if (time) {
        updateData.date = new Date(`${date}T${time}`);
      } else {
        const existingEvent = await Event.findById(req.params.id);
        if (existingEvent && existingEvent.date) {
          const existingTime = existingEvent.date.toTimeString().split(' ')[0];
          updateData.date = new Date(`${date}T${existingTime}`);
        } else {
          updateData.date = new Date(`${date}T00:00:00`);
        }
      }
    }

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: 'eventhub/events',
            transformation: [
              { width: 800, height: 600, crop: 'fill' },
              { quality: 'auto' }
            ]
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(req.file.buffer);
      });
      updateData.image = result.secure_url;
    }
    
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, organizer: req.user.id },
      updateData,
      { new: true }
    );
    
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    
    res.json({ success: true, event });
  } catch (error) {
    console.error('Update event error:', error);
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

// Publish event (only if approved)
exports.publishEvent = async (req, res) => {
  try {
    const event = await Event.findOne({ 
      _id: req.params.id, 
      organizer: req.user.id 
    });

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.approvalStatus !== 'approved') {
      return res.status(400).json({ 
        success: false, 
        message: 'Event must be approved before publishing' 
      });
    }

    event.isPublished = true;
    await event.save();

    res.json({ success: true, message: 'Event published successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Unpublish event
exports.unpublishEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, organizer: req.user.id },
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
    const event = await Event.findOneAndDelete({ _id: req.params.id, organizer: req.user.id });

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};