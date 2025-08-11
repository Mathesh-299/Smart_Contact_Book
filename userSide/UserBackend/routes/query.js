const express = require("express");
const { addQuery } = require("../controller/queryController");
const { authenticateJWT } = require("../middleware/userMiddleware");
const router = express.Router();

router.post("/addQuery/:id", addQuery, authenticateJWT)


module.exports = router