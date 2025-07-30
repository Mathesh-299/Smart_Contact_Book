
const express = require("express");
const router = express.Router();

const { register, login, all, verifyOtp, resendOtp, editProfile, getProfile, userCountValue, editUser, deleteUser, findUser, forgotPassword } = require('../controller/userController');

const { authenticateJWT, requireAdmin } = require("../middleware/userMiddleware");

router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp', verifyOtp);
router.post('/resend-otp', resendOtp);

router.get("/profile", authenticateJWT, getProfile);
router.put('/update', authenticateJWT, editProfile);

router.get('/all', authenticateJWT, requireAdmin, all);
router.get('/count', authenticateJWT, requireAdmin, userCountValue);

router.put('/edit/:id', authenticateJWT, requireAdmin, editUser);
router.delete('/delete/:id', authenticateJWT, deleteUser);

router.post("/findUserName", findUser)

router.post("/reset-password", forgotPassword)

module.exports = router;
