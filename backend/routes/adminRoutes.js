const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const {
  adminLogin,
  adminLogout,
  getAllUsers,
  toggleUserBlock,
  getAllOrganizers,
  toggleOrganizerApproval,
  getAllEvents,
  getDashboardStats
} = require('../controllers/adminController');

// Admin Authentication Routes
router.post('/auth/admin/login', adminLogin);
router.post('/auth/admin/logout', adminAuth, adminLogout);

// User Management Routes
router.get('/admin/users', adminAuth, getAllUsers);
router.put('/admin/users/:id/block', adminAuth, toggleUserBlock);

// Organizer Management Routes
router.get('/admin/organizers', adminAuth, getAllOrganizers);
router.put('/admin/organizers/:id/approve', adminAuth, toggleOrganizerApproval);

// Event Management Routes
router.get('/admin/events', adminAuth, getAllEvents);

// Dashboard Route
router.get('/admin/dashboard', adminAuth, getDashboardStats);

module.exports = router;