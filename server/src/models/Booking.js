const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    event: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Event', // Reference to the Event model
        required: true 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Reference to the User model
        required: true 
    },
    paymentStatus: { 
        type: String, 
        default: 'pending' // Options could be 'pending', 'confirmed', 'failed'
    },
    bookingDate: { 
        type: Date, 
        default: Date.now // Automatically set to the current date
    }
});

module.exports = mongoose.model('Booking', bookingSchema);
