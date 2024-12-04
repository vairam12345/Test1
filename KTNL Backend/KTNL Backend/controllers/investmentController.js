const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Image = require('../models/investmentModel'); // Import the Image model

// Set storage engine for multer with dynamic destination
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = req.body.uploadDir || 'investmentFolder'; // Fallback to 'uploads' if no directory is specified
    const fullPath = path.join(__dirname, '..', uploadDir);

    // Ensure the directory exists
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true }); // Create directory recursively if it doesn't exist
    }

    cb(null, fullPath); // Set the destination directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  },
});

// Initialize multer with storage settings
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Max file size: 10 MB
}).single('image'); // Handle one file under 'image' field

// Upload image and store metadata in database
exports.uploadinvesterImage = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send(err.message); // Send error message
    }

    try {
      const uploadDir = req.body.uploadDir || 'investmentFolder'; // Directory used for this upload

      // Create a new image document with metadata
      const newImage = new Image({
        title: req.body.title,
        nameandrole: req.body.nameandrole,

        description: req.body.description,
        imagePath: `/${uploadDir}/${req.file.filename}`, // Store the image path dynamically
      });

      // Save the image document to the database
      await newImage.save();

      // Respond with success message and image details
      res.status(200).json({
        message: 'Image uploaded successfully',
        imageUrl: `/${uploadDir}/${req.file.filename}`,
        title: req.body.title,
        nameandrole: req.body.nameandrole,

        description: req.body.description,
      });
    } catch (error) {
      res.status(500).send('Error saving image to database');
    }
  });
};



// Fetch all uploaded images from the database
exports.getImagesinvester = async (req, res) => {
    try {
      const images = await Image.find(); // Fetch all image records
      res.status(200).json(images); // Respond with the images
    } catch (error) {
      res.status(500).send('Error fetching images from database');
    }
  };
  




  // Fetch a single image by its ID
exports.getImageByIdinvester = async (req, res) => {
    try {
      const imageId = req.params.id; // Extract the ID from the route parameter
      const image = await Image.findById(imageId); // Find the image in the database
  
      if (!image) {
        return res.status(404).json({ message: 'Image not found' }); // Handle image not found
      }
  
      res.status(200).json(image); // Respond with the image metadata
    } catch (error) {
      res.status(500).json({ message: 'Error fetching image', error: error.message });
    }
  };
  

  // Delete image by ID
exports.deleteImageinvester = async (req, res) => {
    try {
      const imageId = req.params.id; // Extract the image ID from the request params
      const image = await Image.findById(imageId); // Find the image in the database
  
      if (!image) {
        return res.status(404).json({ message: 'Image not found' }); // If image does not exist
      }
  
      const imagePath = path.join(__dirname, '..', image.imagePath); // Get the full path of the image file
  
      // Delete the image file from the file system
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Remove the file
      } else {
        console.warn(`File not found: ${imagePath}`); // Log a warning if the file doesn't exist
      }
  
      // Delete the image document from the database
      await Image.findByIdAndDelete(imageId);
  
      res.status(200).json({ message: 'Image deleted successfully' }); // Respond with success
    } catch (error) {
      res.status(500).json({ message: 'Error deleting image', error: error.message }); // Handle errors
    }
  };