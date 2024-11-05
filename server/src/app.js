const express = require('express');
const mongoose = require("mongoose"); // Corrected import
const bodyParser = require('body-parser');


require('dotenv').config(); // Load environment variables
console.log("Email User:", process.env.EMAIL_USER);
console.log("Email Pass:", process.env.EMAIL_PASS);
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies in POST requests
app.use(bodyParser.json());


const URI = "mongodb://localhost:27017/data";
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.error("MongoDB connection error:", error));

// Import models
const User = require('./models/User');
const CreateEvent = require('./models/CreateEvent');
const Booking = require('./models/Booking');


// IMport route
const eventRoutes = require('./routes/Event');
const bookRoutes = require('./routes/Booking');
const authRoutes = require('./routes/auth')

app.use((req,res,next) => {
    console.log(`${req.method}`);
    next();
});

app.use('/api/event', eventRoutes);
app.use('/api/bookings', bookRoutes);
app.use('/api/auth', authRoutes);


module.exports = app;
