const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const DB = require("./configs/db");
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8000;
DB()
    .then(() => {
        // console.log("DB connects successfull");
        app.listen(port, () => {
            console.log(`Server starting at ${port}`)
        })
    })
    .catch((err) => {
        console.log("DB error");
    });

app.use('/api/user', require('./routes/user'));
app.use('/api/contact', require("./routes/contact"));
app.use('/api/query', require('./routes/query'));