require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('Testing Email Configuration...\n');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '***' + process.env.EMAIL_PASS.slice(-4) : 'NOT SET');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify connection
transporter.verify(function (error, success) {
  if (error) {
    console.error('\n❌ Email Configuration Error:');
    console.error('Error:', error.message);
    console.error('\nPossible Solutions:');
    console.error('1. Generate new Gmail App Password: https://myaccount.google.com/apppasswords');
    console.error('2. Enable 2-Step Verification on Gmail');
    console.error('3. Update .env file with correct EMAIL_USER and EMAIL_PASS');
    console.error('4. Make sure EMAIL_PASS is 16-digit App Password (not regular password)');
  } else {
    console.log('\n✅ Email server is ready!');
    console.log('Sending test email...\n');
    
    // Send test email
    transporter.sendMail({
      from: `"EventHub Test" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: 'Test Email from EventHub',
      html: '<h1>Success!</h1><p>Your email configuration is working correctly.</p>'
    }, (err, info) => {
      if (err) {
        console.error('❌ Failed to send test email:', err.message);
      } else {
        console.log('✅ Test email sent successfully!');
        console.log('Message ID:', info.messageId);
        console.log('\nCheck your inbox:', process.env.EMAIL_USER);
      }
      process.exit();
    });
  }
});
