const Event = require('../models/Event');
const Artist = require('../models/Artist');
const Booking = require('../models/Booking');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');

// Get organizer's events
exports.getOrganizerEvents = async (req, res) => {
  try {
    const organizerId = req.user.id;
    const now = new Date();

    // Find and update expired events for this organizer
    await Event.updateMany(
      {
        organizer: organizerId,
        date: { $lt: now },
        isPublished: true
      },
      { isPublished: false }
    );

    const events = await Event.find({ organizer: organizerId })
      .sort({ date: -1 })
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
    const { title, description, date, time, location, capacity, price, category, isPublished, seatTypes, hasArtist, artistName } = req.body;

    // 1. Handle Image Upload First
    let imageUrl = '';
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
      imageUrl = result.secure_url;
    }

    // 2. Parse seat types
    let parsedSeatTypes = [];
    if (seatTypes) {
      try {
        parsedSeatTypes = JSON.parse(seatTypes).map(seat => ({
          ...seat,
          price: parseFloat(seat.price),
          quantity: parseInt(seat.quantity),
          available: parseInt(seat.quantity)
        }));
      } catch (e) {
        console.error('Error parsing seat types:', e);
      }
    }

    // 3. Find or create artist with the event image
    let artistId = null;
    if (hasArtist === 'true' && artistName) {
      let artist = await Artist.findOne({ name: artistName });
      if (!artist) {
        artist = new Artist({
          name: artistName,
          district: location || 'Unknown',
          category: category || 'Other',
          image: imageUrl || '' // Use event image for the new artist
        });
        await artist.save();
      } else if (!artist.image && imageUrl) {
        // If artist exists but has no image, update it with this event's image
        artist.image = imageUrl;
        await artist.save();
      }
      artistId = artist._id;
    }

    // 4. Create Event
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
      organizer: req.user.id,
      hasArtist: hasArtist === 'true',
      artistName: artistName || '',
      artist: artistId
    });

    await event.save();

    // If there's an artist, add this event to their profile
    if (artistId) {
      await Artist.findByIdAndUpdate(artistId, {
        $push: { events: event._id }
      });
    }

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

    // 1. Handle Image Upload First
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

    // 2. Handle metadata fields
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (location !== undefined) updateData.location = location;
    if (category !== undefined) updateData.category = category;
    if (capacity !== undefined && capacity !== '') updateData.capacity = parseInt(capacity);
    if (price !== undefined && price !== '') updateData.price = parseFloat(price);
    if (isPublished !== undefined) updateData.isPublished = isPublished === 'true' || isPublished === true;

    // 3. Handle Artist Logic
    const { hasArtist, artistName } = req.body;
    if (hasArtist !== undefined) {
      updateData.hasArtist = hasArtist === 'true' || hasArtist === true;
      updateData.artistName = artistName || '';

      if (updateData.hasArtist && artistName) {
        let artist = await Artist.findOne({ name: artistName });
        if (!artist) {
          artist = new Artist({
            name: artistName,
            district: location || 'Unknown',
            category: category || 'Other',
            image: updateData.image || '' // Use new image or leave empty if none
          });
          await artist.save();
        } else if (!artist.image && updateData.image) {
          // Update existing artist image if they don't have one
          artist.image = updateData.image;
          await artist.save();
        }
        updateData.artist = artist._id;
      } else {
        updateData.artist = null;
        updateData.artistName = '';
      }
    }

    // 4. Handle Date/Time
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

    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, organizer: req.user.id },
      updateData,
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Update artist's events list if linked
    if (event.artist) {
      await Artist.findByIdAndUpdate(event.artist, {
        $addToSet: { events: event._id }
      });
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