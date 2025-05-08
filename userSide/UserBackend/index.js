require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const http = require("http");
const db = require("./db"); // Ensure the file connects to MongoDB
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/Admin");
const Booking = require("./models/bookingschema");

// Initialize Express App
const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Database connection
db(); // Ensure this function connects to MongoDB

// Create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust this for your production environment
    methods: ["GET", "POST"],
  },
});

// Listen for Socket.IO connections
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Routes
app.use("/api/users", userRoutes); // User-related routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// API to fetch available ground bookings
app.get("/api/ground/available", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// API to handle ground bookings
app.post("/api/ground/book", async (req, res) => {
  const { date, session } = req.body;

  console.log("Received booking request:", req.body); // Log the incoming data

  try {
    // Validate the request body
    if (!date || !session) {
      return res.status(400).json({ error: "Date and session are required." });
    }

    // Check if the booking for the specified date already exists
    let booking = await Booking.findOne({ date });

    if (booking && booking[session]) {
      return res.status(400).json({ error: `${session} slot is already booked.` });
    }

    // If no booking exists for this date, create a new one
    if (!booking) {
      booking = new Booking({ date });
    }

    // Book the session
    booking[session] = true;
    await booking.save();

    // Emit real-time update
    io.emit("new-booking", { date, session });

    res.json({ message: `${session} slot booked successfully.` });
  } catch (error) {
    console.error("Error during booking:", error); // Log the error
    res.status(500).json({ error: "Failed to book session" });
  }
});

// Start server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
