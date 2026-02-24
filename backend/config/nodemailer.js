const nodemailer = require('nodemailer');

console.log('Email Config Check:');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Set ✓' : 'Missing ✗');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set ✓' : 'Missing ✗');
console.log('EMAIL_HOST:', process.env.EMAIL_HOST || 'smtp.gmail.com');
console.log('EMAIL_PORT:', process.env.EMAIL_PORT || 587);

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify transporter configuration
transporter.verify(function (error, success) {
  if (error) {
    console.error('❌ Email configuration error:', error);
    console.error('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'Not Set');
    console.error('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'Not Set');
  } else {
    console.log('✅ Email server is ready to send messages');
    console.log('Using email:', process.env.EMAIL_USER);
  }
});

module.exports = transporter;
