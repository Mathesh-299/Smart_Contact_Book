const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    user_name: {
        type: String,
        required: true,
    },
    user_email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
})


const Query = mongoose.model("Query", querySchema);
module.exports = Query