const mongoose = require('mongoose');

// Define the schema for the image
const imageSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now,  // Automatically set the date when the image is uploaded
  },
});

// Create the Image model from the schema
const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
