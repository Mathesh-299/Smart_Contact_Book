const Contact = require('../models/ContactSchema');
const User = require("../models/userSchema")

exports.addContact = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, location,userId } = req.body;
        // const userId = req.params.id;
        if(!fullName || !email || !phoneNumber || !location){
            return res.status(404).json({message:"Please fill all the fields"});
        }
        const user= await User.findById(userId);
        if(!user) return res.status(404).json({message:"Invalid User"})
        const contact = new Contact({ fullName, email, phoneNumber, location, userId });
        await contact.save();
        res.status(200).json({ message: "Contact Saved" });
    } catch (error) {
        res.status(500).json({ message: "Can't Saved" });
    }
}

exports.getContact = async (req, res) => {
    try {
        const userId = req.params.id;
        const contacts = await Contact.find({ userId });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: "Can not get" });eetv
    }
}