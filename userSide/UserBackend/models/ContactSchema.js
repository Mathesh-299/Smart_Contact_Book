const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phoneNumber: String,
    location:String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Contact', ContactSchema);
