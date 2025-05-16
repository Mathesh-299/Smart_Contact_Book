// configs/mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

transporter.verify(function (error, success) {
    if (error) {
        console.error("Mail transporter config error:", error);
    } else {
        console.log("Mail server is ready to send messages",success);
    }
});

module.exports = transporter;
