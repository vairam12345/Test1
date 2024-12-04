const multer = require('multer');
const path = require('path');
const fs = require('fs');
const BlogImage = require('../models/blogModel');

// Set storage engine for multer with dynamic destination
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = req.body.uploadDir || 'blogDynamicFolder'; 
    const fullPath = path.join(__dirname, '..', uploadDir);

    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }

    cb(null, fullPath);
  },
  filename: (req, file, cb) => {    
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer with storage settings
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Max file size: 10 MB
  }).single('image'); // Handle one file under 'image' field
  
// Upload blog image and store metadata in database
exports.uploadBlogImage = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send(err.message);
    }

    try {
      const uploadDir = req.body.uploadDir || 'blogDynamicFolder';

      const newBlogImage = new BlogImage({
        title: req.body.title,
        description: req.body.description,
        imagePath: `/${uploadDir}/${req.file.filename}`,
      });

      await newBlogImage.save();

      res.status(200).json({
        message: 'Blog image uploaded successfully',
        imageUrl: `/${uploadDir}/${req.file.filename}`,
        title: req.body.title,
        description: req.body.description,
      });
    } catch (error) {
      res.status(500).send('Error saving blog image to database');
    }
  });
};

// Fetch all uploaded blog images
exports.getBlogImages = async (req, res) => {
  try {
    const blogImages = await BlogImage.find();
    res.status(200).json(blogImages);
  } catch (error) {
    res.status(500).send('Error fetching blog images from database');
  }
};

// Fetch a single blog image by ID
exports.getBlogImageById = async (req, res) => {
  try {
    const blogImageId = req.params.id;
    const blogImage = await BlogImage.findById(blogImageId);

    if (!blogImage) {
      return res.status(404).json({ message: 'Blog image not found' });
    }

    res.status(200).json(blogImage);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog image', error: error.message });
  }
};

// Delete blog image by ID
exports.deleteBlogImage = async (req, res) => {
  try {
    const blogImageId = req.params.id;
    const blogImage = await BlogImage.findById(blogImageId);

    if (!blogImage) {
      return res.status(404).json({ message: 'Blog image not found' });
    }

    const imagePath = path.join(__dirname, '..', blogImage.imagePath);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    } else {
      console.warn(`File not found: ${imagePath}`);
    }

    await BlogImage.findByIdAndDelete(blogImageId);

    res.status(200).json({ message: 'Blog image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog image', error: error.message });
  }
};
