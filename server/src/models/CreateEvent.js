const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: String,
  eventType: String,
  eventPattern: String,
  description: String,
  image: String, 
  organizer: String,
  organizerEmail: String,
  startDate: Date,
  endDate: Date,
  location: String,
  price: Number,
  time: Number,
  url: String,
  linkedinUrl: String,
  twitterUrl: String,
  instagramUrl: String,
  facebookUrl: String,
  seatNo: String,  
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('CreateEvent', eventSchema);
