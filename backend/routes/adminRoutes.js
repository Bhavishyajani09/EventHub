const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const {
  adminLogin,
  adminLogout,
  getAllUsers,
  toggleUserBlock,
  getAllOrganizers,
  toggleOrganizerBlock,
  getAllEvents,
  getDashboardStats,
  getAdminProfile,
  updateAdminProfile,
  changeAdminPassword,
  getPlatformSettings,
  updatePlatformSettings,
  getAllBookings
} = require('../controllers/adminController');

// Admin Authentication Routes
router.post('/auth/admin/login', adminLogin);
router.post('/auth/admin/logout', adminAuth, adminLogout);

// User Management Routes
router.get('/admin/users', adminAuth, getAllUsers);
router.put('/admin/users/:id/block', adminAuth, toggleUserBlock);

// Organizer Management Routes
router.get('/admin/organizers', adminAuth, getAllOrganizers);
router.put('/admin/organizers/:id/block', adminAuth, toggleOrganizerBlock);

// Event Management Routes
router.get('/admin/events', adminAuth, getAllEvents);

// Booking Management Routes
router.get('/admin/bookings', adminAuth, getAllBookings);

// Dashboard Route
router.get('/admin/dashboard', adminAuth, getDashboardStats);

// Profile Management
router.get('/admin/profile', adminAuth, getAdminProfile);
router.put('/admin/profile', adminAuth, updateAdminProfile);
router.put('/admin/change-password', adminAuth, changeAdminPassword);

// Platform Settings
router.get('/admin/settings', adminAuth, getPlatformSettings);
router.put('/admin/settings', adminAuth, updatePlatformSettings);

module.exports = router;