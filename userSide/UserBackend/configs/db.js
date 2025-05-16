const mongoose = require("mongoose");
const db = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB Connected");
    } catch (error) {
        console.log("DB error will occur",error);
        // process.exit(1);
    }
}

module.exports = db;


