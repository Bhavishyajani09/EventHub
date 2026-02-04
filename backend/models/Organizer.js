const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * Organizer Schema
 * Defines the structure for organizer accounts in the EventHub application
 * Includes authentication fields and profile information
 */
const organizerSchema = new mongoose.Schema({
  // Basic profile information
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },

  // Authentication fields
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },

  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },

  // Contact information
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
  },

  // Profile Image
  photo: {
    type: String,
    default: null
  },

  // Role-based access control
  role: {
    type: String,
    enum: ['organizer', 'admin', 'super_admin'],
    default: 'organizer'
  },

  // Admin approval status
  isApproved: {
    type: Boolean,
    default: true
  },
  isBlocked: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

/**
 * Pre-save middleware to hash password before saving to database
 * Only hashes if password is modified (new or updated)
 */
organizerSchema.pre('save', async function (next) {
  // Only hash password if it's been modified
  if (!this.isModified('password')) return next();

  try {
    // Hash password with salt rounds of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Instance method to compare entered password with hashed password
 * @param {string} enteredPassword - Plain text password to compare
 * @returns {boolean} - True if passwords match, false otherwise
 */
organizerSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Organizer', organizerSchema);