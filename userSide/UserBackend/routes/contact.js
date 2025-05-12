const express = require('express');
const routes = express.Router();
const { addContact, getContact, deleteContact, editContact } = require("../controller/contactController");
const { authenticateJWT } = require("../middleware/userMiddleware")

routes.post('/addContact', addContact, authenticateJWT);
routes.get('/getContact/:id', getContact, authenticateJWT);
routes.delete("/deleteContact/:id", deleteContact, authenticateJWT);
routes.put("/updateContact/:id", editContact, authenticateJWT)
module.exports = routes;