const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Validate environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('❌ EMAIL CONFIGURATION ERROR: EMAIL_USER or EMAIL_PASS not set in environment variables');
        throw new Error('Email configuration is incomplete. Please check server environment variables.');
    }

    console.log('📧 Attempting to send email...');
    console.log('From:', process.env.EMAIL_USER);
    console.log('To:', options.email);
    console.log('Subject:', options.subject);

    // Create transporter with explicit TLS configuration
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT) || 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            // Do not fail on invalid certs (useful for some hosting providers)
            rejectUnauthorized: false
        },
        // Enable debug output
        debug: process.env.NODE_ENV !== 'production',
        logger: process.env.NODE_ENV !== 'production'
    });

    // Verify transporter configuration
    try {
        await transporter.verify();
        console.log('✅ Email transporter verified successfully');
    } catch (verifyError) {
        console.error('❌ Email transporter verification failed:', verifyError.message);
        throw new Error(`Email server connection failed: ${verifyError.message}`);
    }

    const mailOptions = {
        from: `${process.env.FROM_NAME || 'EventHub'} <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully:', info.messageId);
        console.log('Response:', info.response);
        return info;
    } catch (sendError) {
        console.error('❌ Email sending failed:', sendError.message);
        console.error('Error details:', sendError);
        throw new Error(`Failed to send email: ${sendError.message}`);
    }
};

module.exports = sendEmail;
