const mongoose = require('mongoose');

// Define the schema for the image
const investSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,  // Title is required
  },
  description: {
    type: String,
    required: true,  // Description is required
  },
  imagePath: {
    type: String,
    required: true,  // Path to the image file (stored in the uploads directory)
  },
  nameandrole: {
    type: String,
    required: true,  // Title is required
  },
  createdAt: {
    type: Date,
    default: Date.now,  // Automatically set the date when the image is uploaded
  },
});

// Create the Image model from the schema
const Investors = mongoose.model('Investors', investSchema);

module.exports = Investors;
