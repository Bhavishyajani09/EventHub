const mongoose = require('mongoose');
const Event = require('../models/Event');
require('dotenv').config();

const updateEventApprovalStatus = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Update all existing events to have pending approval status
    const result = await Event.updateMany(
      { approvalStatus: { $exists: false } },
      { 
        $set: { 
          approvalStatus: 'pending',
          rejectionReason: ''
        }
      }
    );

    console.log(`Updated ${result.modifiedCount} events with approval status`);
    
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error updating events:', error);
    process.exit(1);
  }
};

updateEventApprovalStatus();