const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false } // New field for OTP verification status
});

module.exports = mongoose.model('User', userSchema);
