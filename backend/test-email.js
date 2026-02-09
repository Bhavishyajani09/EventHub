// Test script for email functionality
require('dotenv').config();
const sendEmail = require('./utils/email');

async function testEmail() {
    console.log('\n========================================');
    console.log('Testing Email Configuration');
    console.log('========================================\n');

    console.log('Environment Variables Check:');
    console.log('EMAIL_HOST:', process.env.EMAIL_HOST || '❌ NOT SET');
    console.log('EMAIL_PORT:', process.env.EMAIL_PORT || '❌ NOT SET');
    console.log('EMAIL_USER:', process.env.EMAIL_USER || '❌ NOT SET');
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ SET (hidden)' : '❌ NOT SET');
    console.log('FROM_NAME:', process.env.FROM_NAME || '❌ NOT SET');
    console.log('\n========================================\n');

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('❌ FAILED: Email credentials not configured in .env file');
        console.log('\nPlease ensure your .env file contains:');
        console.log('EMAIL_HOST=smtp.gmail.com');
        console.log('EMAIL_PORT=587');
        console.log('EMAIL_USER=your-email@gmail.com');
        console.log('EMAIL_PASS=your-app-password');
        process.exit(1);
    }

    try {
        console.log('Attempting to send test email...\n');

        await sendEmail({
            email: process.env.EMAIL_USER, // Send to yourself for testing
            subject: 'EventHub - Email Test',
            message: 'This is a test email from EventHub. If you receive this, nodemailer is working correctly!',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
                    <h2 style="color: #007bff;">✅ Email Test Successful!</h2>
                    <p>This is a test email from EventHub.</p>
                    <p>If you're reading this, your nodemailer configuration is working correctly!</p>
                    <hr>
                    <p style="color: #666; font-size: 12px;">Sent at: ${new Date().toLocaleString()}</p>
                </div>
            `
        });

        console.log('\n========================================');
        console.log('✅ SUCCESS! Email sent successfully!');
        console.log('========================================');
        console.log('\nCheck your inbox:', process.env.EMAIL_USER);
        console.log('(Also check spam folder if not in inbox)\n');

    } catch (error) {
        console.log('\n========================================');
        console.error('❌ FAILED! Email could not be sent');
        console.log('========================================');
        console.error('\nError:', error.message);
        console.error('\nFull error details:', error);
        console.log('\n📋 Troubleshooting tips:');
        console.log('1. Verify EMAIL_PASS is a Gmail App Password (not regular password)');
        console.log('2. Check if 2-Step Verification is enabled on your Google account');
        console.log('3. Generate a new App Password at: https://myaccount.google.com/apppasswords');
        console.log('4. Ensure your internet connection is stable\n');
        process.exit(1);
    }
}

testEmail();
