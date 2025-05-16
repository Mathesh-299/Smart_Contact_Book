const Contact = require('../models/ContactSchema');
const User = require("../models/userSchema")

exports.addContact = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, location, userId } = req.body;
        if (!fullName || !email || !phoneNumber || !location) {
            return res.status(404).json({ message: "Please fill all the fields" });
        }
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "Invalid User" })
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
        res.status(500).json({ message: "Can not get" });
    }
}


exports.deleteContact = async (req, res) => {
    const contactId = req.params.id;
    try {
        const contact = await Contact.findByIdAndDelete(contactId);
        if (!contact) return res.status(404).json({ message: "Contact if not found" });
        res.status(200).json({ message: "Contact successfully Delete" });
    } catch (error) {
        res.status(500).json({ message: "Error to delete" });
    }

}

exports.editContact = async (req, res) => {
    const { fullName, email, phoneNumber, location } = req.body;
    const contactId = req.params.id;
    try {
        const contactEdit = await Contact.findById(contactId);
        if (!contactEdit) return res.status(404).json({ message: "Not found" });
        contactEdit.fullName = fullName || contactEdit.fullName;
        contactEdit.email = email || contactEdit.email;
        contactEdit.phoneNumber = phoneNumber || contactEdit.phoneNumber;
        contactEdit.location = location || contactEdit.location;

        await contactEdit.save();
        res.status(200).json({ message: "Updated Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Can not editable" });
    }
}