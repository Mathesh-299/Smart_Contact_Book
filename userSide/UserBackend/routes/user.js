const express = require("express");
const router = express.Router();
const { register, login, all, verifyOtp, resendOtp, editProfile } = require('../controller/userController');
const { getProfile } = require("../controller/userController");
const { authenticateJWT } = require("../middleware/userMiddleware");

// Registration and Login Routes
router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp', verifyOtp);   // OTP verification
router.post('/resend-otp', resendOtp);   // Resend OTP
router.get('/all', all);
router.get("/profile", authenticateJWT, getProfile);
router.put('/update',editProfile)


module.exports = router;
