const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('Email config missing');
        throw new Error('Email configuration missing');
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: `${process.env.FROM_NAME || 'EventHub'} <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
};

module.exports = sendEmail;
