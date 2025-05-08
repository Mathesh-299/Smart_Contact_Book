const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    address:{
        type:String,
        required:true,
        trim:true
    }
})

module.exports = mongoose.model("Contact",contactSchema);