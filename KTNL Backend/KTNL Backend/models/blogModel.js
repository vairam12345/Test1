const mongoose = require('mongoose');

// Define the schema for blog images
const blogImageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the BlogImage model from the schema
const BlogImage = mongoose.model('BlogImage', blogImageSchema);

module.exports = BlogImage;
