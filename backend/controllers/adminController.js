const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User');
const Organizer = require('../models/Organizer');
const Event = require('../models/Event');
const Booking = require('../models/Booking');
const Settings = require('../models/Settings');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(admin._id);
    res.json({
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin logout
const adminLogout = async (req, res) => {
  try {
    res.json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Block/unblock user
const toggleUserBlock = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.json({
      success: true,
      message: `User ${user.isBlocked ? 'blocked' : 'unblocked'} successfully`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isBlocked: user.isBlocked
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View organizers
const getAllOrganizers = async (req, res) => {
  try {
    const organizers = await Organizer.find({}).select('-password').sort({ createdAt: -1 });
    res.json({
      success: true,
      count: organizers.length,
      organizers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve/reject organizer
const toggleOrganizerApproval = async (req, res) => {
  try {
    const { id } = req.params;
    const organizer = await Organizer.findById(id);
    
    if (!organizer) {
      return res.status(404).json({ message: 'Organizer not found' });
    }

    organizer.isApproved = !organizer.isApproved;
    await organizer.save();

    res.json({
      success: true,
      message: `Organizer ${organizer.isApproved ? 'approved' : 'rejected'} successfully`,
      organizer: {
        id: organizer._id,
        name: organizer.name,
        email: organizer.email,
        isApproved: organizer.isApproved
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({})
      .populate('organizer', 'name email')
      .sort({ createdAt: -1 });
      
    res.json({
      success: true,
      count: events.length,
      events
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalOrganizers,
      totalEvents,
      totalBookings,
      pendingOrganizers,
      blockedUsers,
      recentEvents
    ] = await Promise.all([
      User.countDocuments(),
      Organizer.countDocuments(),
      Event.countDocuments(),
      Booking.countDocuments(),
      Organizer.countDocuments({ isApproved: false }),
      User.countDocuments({ isBlocked: true }),
      Event.find({}).populate('organizer', 'name email').sort({ createdAt: -1 }).limit(5)
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalOrganizers,
        totalEvents,
        totalBookings,
        pendingOrganizers,
        blockedUsers
      },
      recentEvents
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Admin Profile
const getAdminProfile = async (req, res) => {
  try {
    console.log('Fetching admin profile for ID:', req.admin.id);
    const admin = await Admin.findById(req.admin.id).select('-password');
    if (!admin) {
        console.log('Admin not found for ID:', req.admin.id);
        return res.status(404).json({ message: 'Admin not found' });
    }
    res.json({
      success: true,
      admin
    });
  } catch (error) {
    console.error('Error in getAdminProfile:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update Admin Profile
const updateAdminProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const admin = await Admin.findById(req.admin.id);

    if (name) admin.name = name;
    if (email) admin.email = email;
    if (phone) admin.phone = phone;

    await admin.save();
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Change Admin Password
const changeAdminPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.admin.id);

    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect current password' });
    }

    admin.password = newPassword;
    await admin.save();

    res.json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Platform Settings
const getPlatformSettings = async (req, res) => {
  try {
    console.log('Fetching platform settings...');
    let settings = await Settings.findOne();
    if (!settings) {
      console.log('No settings found, creating default...');
      settings = await Settings.create({});
    }
    console.log('Settings fetched successfully');
    res.json({
      success: true,
      settings
    });
  } catch (error) {
    console.error('Error in getPlatformSettings:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update Platform Settings
const updatePlatformSettings = async (req, res) => {
  try {
    const { commission, taxPercentage, convenienceFee } = req.body;
    
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({});
    }

    if (commission !== undefined) settings.commission = commission;
    if (taxPercentage !== undefined) settings.taxPercentage = taxPercentage;
    if (convenienceFee !== undefined) settings.convenienceFee = convenienceFee;

    await settings.save();

    res.json({
      success: true,
      message: 'Settings updated successfully',
      settings
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  adminLogin,
  adminLogout,
  getAllUsers,
  toggleUserBlock,
  getAllOrganizers,
  toggleOrganizerApproval,
  getAllEvents,
  getDashboardStats,
  getAdminProfile,
  updateAdminProfile,
  changeAdminPassword,
  getPlatformSettings,
  updatePlatformSettings
};