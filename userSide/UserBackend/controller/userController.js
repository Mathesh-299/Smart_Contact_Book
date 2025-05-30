const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
// Mail transporter for sending OTPs
const transporter = require("../configs/mailer");
const { authenticateJWT } = require("../middleware/userMiddleware");

// Register new user
const tempUsers = {};
const otps = {};

exports.register = async (req, res) => {
    const { username, email, phoneNumber, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        const hashedPassword = await bcrypt.hash(password, 10);

        // Store OTP and temporary user info
        otps[email] = { otp, timestamp: Date.now() };
        tempUsers[email] = { username, email, phoneNumber, password: hashedPassword };

        const mailOptions = {
            from: process.env.EMAIL_USER, // Your email address (should be set in your .env file)
            to: email,
            subject: 'OTP Verification',
            text: `Your OTP is: ${otp}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'OTP sent to your email. Please verify to complete registration!' });

    } catch (error) {
        console.error("Registration Error:", error); // ADD THIS LINE
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};


// Verify OTP for registration
exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    const storedOtp = otps[email];
    const tempUser = tempUsers[email];

    if (!storedOtp || !tempUser) {
        return res.status(400).json({ message: "OTP expired or no registration request found." });
    }

    const isExpired = Date.now() - storedOtp.timestamp > 10 * 60 * 1000; // 10 mins
    if (isExpired) {
        delete otps[email];
        delete tempUsers[email];
        return res.status(400).json({ message: "OTP expired. Please register again." });
    }

    if (parseInt(otp) !== storedOtp.otp) {
        return res.status(400).json({ message: "Invalid OTP." });
    }

    try {
        // Save user now
        const user = new User({
            ...tempUser,
            isVerified: true
        });

        await user.save();

        // Clean up temporary storage
        delete otps[email];
        delete tempUsers[email];

        res.status(201).json({ message: "Email verified and user registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error saving user", error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        let role = "user";
        if (email === "matheshm2909@gmail.com" && password === "Admin@123") {
            role = "admin";
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        if (!user.isVerified) {
            return res.status(403).json({ message: "Please verify your email via OTP" });
        }

        const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        const { username, _id: userId, phoneNumber, gender, dob, address } = user;
        res.status(200).json({
            token,
            user: { username, email, userId, phoneNumber, gender, dob, address, role }
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};


exports.resendOtp = async (req, res) => {
    const { email } = req.body;

    if (!otps[email]) return res.status(400).json({ message: 'No OTP request found for this email' });

    const otp = otps[email].otp;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP is: ${otp}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'OTP resent to your email!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to resend OTP.' });
    }
};

exports.all = async (req, res) => {
    try {
        const response = await User.find();
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};


exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // Get user details from the decoded JWT token
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user: { username: user.username, email: user.email, phoneNumber: user.phoneNumber } });
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile", error: error.message });
    }
};

// Edit profile with JWT authentication
exports.editProfile = async (req, res) => {
    const { username, email, phoneNumber, gender, dob, address } = req.body;
    const userId = req.user.id;  // Use the user ID from the decoded token

    // Validate input fields
    if (!username || !email || !phoneNumber) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Find and update the user in the database
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username, email, phoneNumber, gender, dob, address },
            { new: true }  // Return the updated user
        );

        // If the user was not found
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send a success response
        res.json({ message: 'Profile updated successfully', updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user profile' });
    }
};

exports.userCountValue = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        res.status(200).json({ count: userCount });
    }
    catch {
        res.status(400).json({ message: "Error to fetching user count" });
    }
};


// Edit user (Admin route)
exports.editUser = async (req, res) => {
    const { username, email, phoneNumber, role } = req.body;
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user details
        user.username = username || user.username;
        user.email = email || user.email;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.role = role || user.role;

        await user.save();

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { email } = req.body;
        const userId = req.params.id;

        // Prevent admin from deleting themselves
        if (email === "matheshm2909@gmail.com") {
            return res.status(403).json({ message: "Admin can't delete themselves" });
        }
        const adminUser = await User.findOne({ email }); // ✅ this is correct
        if (!adminUser) return res.status(401).json({ message: "Unauthorized" });
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        await User.findByIdAndDelete(userId);

        res.status(200).json({ message: 'User deleted successfully', user });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting user', error: err.message });
    }
};




