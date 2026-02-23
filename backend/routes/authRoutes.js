const express = require('express');
const router = express.Router();
const { forgotPassword, resetPassword } = require('../controllers/authController');

// Email Config Check (for debugging)
router.get('/check-email-config', (req, res) => {
  const config = {
    EMAIL_USER: process.env.EMAIL_USER ? '✅ Set' : '❌ Missing',
    EMAIL_PASS: process.env.EMAIL_PASS ? '✅ Set (***' + process.env.EMAIL_PASS.slice(-4) + ')' : '❌ Missing',
    EMAIL_USER_VALUE: process.env.EMAIL_USER || 'NOT SET'
  };
  res.json(config);
});

// Forgot Password Route
router.post('/forgot-password', forgotPassword);

// Reset Password Route
router.post('/reset-password', resetPassword);

module.exports = router;
