const transporter = require('../config/nodemailer');

const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"EventHub" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error: error.message };
  }
};

const sendBookingConfirmation = async (userEmail, bookingDetails) => {
  const html = `
    <h2>Booking Confirmation</h2>
    <p>Thank you for booking with EventHub!</p>
    <h3>Booking Details:</h3>
    <ul>
      <li><strong>Event:</strong> ${bookingDetails.eventName}</li>
      <li><strong>Date:</strong> ${bookingDetails.eventDate}</li>
      <li><strong>Tickets:</strong> ${bookingDetails.ticketCount}</li>
      <li><strong>Total:</strong> $${bookingDetails.totalAmount}</li>
    </ul>
    <p>Your booking ID: <strong>${bookingDetails.bookingId}</strong></p>
  `;
  
  // Send async without waiting
  sendEmail({
    to: userEmail,
    subject: 'Booking Confirmation - EventHub',
    html
  }).catch(err => console.error('Background email error:', err));
  
  return { success: true };
};

module.exports = { sendEmail, sendBookingConfirmation };
