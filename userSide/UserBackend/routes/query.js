const express = require("express");
const { addQuery, getReviews } = require("../controller/queryController");
const { authenticateJWT, requireAdmin } = require("../middleware/userMiddleware");
const router = express.Router();

router.post("/addQuery/:id", authenticateJWT, addQuery)
router.get("/getQuery", authenticateJWT, requireAdmin, getReviews);

module.exports = router