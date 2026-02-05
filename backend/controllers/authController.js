const User = require('../models/User');
const sendEmail = require('../utils/email');
const bcrypt = require('bcryptjs');

/**
 * @desc    Forgot Password - Send OTP via email
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: 'Please provide an email' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'This email is not registered. Please check and try again.'
            });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Set OTP and Expiry (10 minutes)
        user.resetOtp = otp;
        user.resetOtpExpire = Date.now() + 10 * 60 * 1000;

        await user.save();

        // Send Email
        const message = `Your password reset OTP is: ${otp}. It is valid for 10 minutes.`;
        const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>You requested a password reset for your EventHub account.</p>
        <p>Your 6-digit OTP is:</p>
        <h1 style="color: #007bff; letter-spacing: 5px;">${otp}</h1>
        <p>This OTP is valid for <strong>10 minutes</strong>.</p>
        <p>If you did not request this, please ignore this email.</p>
      </div>
    `;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Password Reset OTP',
                message,
                html,
            });

            res.status(200).json({
                success: true,
                message: 'OTP has been sent to your email.'
            });
        } catch (error) {
            console.error('Email Sending Error:', error.message);

            // Still log to console for development convenience
            console.log('--- OTP (Fallback) ---');
            console.log(`Email: ${user.email}`);
            console.log(`OTP: ${otp}`);
            console.log('----------------------');

            res.status(500).json({
                success: false,
                message: 'Error sending email. Please try again later or check server logs.'
            });
        }
    } catch (error) {
        console.error('Forgot Password Error:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

/**
 * @desc    Reset Password using OTP
 * @route   POST /api/auth/reset-password
 * @access  Public
 */
exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email, OTP and new password'
            });
        }

        const user = await User.findOne({
            email,
            resetOtp: otp,
            resetOtpExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP or OTP has expired'
            });
        }

        // Update password (hashing is handled by User model pre-save hook)
        user.password = newPassword;
        user.resetOtp = undefined;
        user.resetOtpExpire = undefined;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password reset successful. You can now login with your new password.'
        });
    } catch (error) {
        console.error('Reset Password Error:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
