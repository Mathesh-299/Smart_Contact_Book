// routes/user.js

const express = require("express");
const router = express.Router();

// Import controller functions
const { register, login, all, verifyOtp, resendOtp, editProfile, getProfile, userCountValue, editUser, deleteUser } = require('../controller/userController');

// Import middleware
const { authenticateJWT, requireAdmin } = require("../middleware/userMiddleware");

// Public Routes
router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp', verifyOtp);     // OTP verification
router.post('/resend-otp', resendOtp);     // Resend OTP

// Protected Routes
router.get("/profile", authenticateJWT, getProfile);  // Authenticated user profile
router.put('/update', authenticateJWT, editProfile);  // Authenticated profile update

// Admin-only Route
router.get('/all', authenticateJWT, requireAdmin, all);  // Only admin can view all users
router.get('/count', authenticateJWT, requireAdmin, userCountValue);

// Admin-only Routes for Edit and Delete User
router.put('/edit/:id', authenticateJWT, requireAdmin, editUser);  // Admin can edit users
router.delete('/delete/:id', authenticateJWT, deleteUser);  // Admin can delete users

module.exports = router;
