const express = require('express');
const routes = express.Router();
const { addContact, getContact } = require("../controller/contactController");
const { authenticateJWT } = require("../middleware/userMiddleware")

routes.post('/addContact', addContact, authenticateJWT);
routes.get('/getContact/:id', getContact, authenticateJWT);

module.exports=routes;