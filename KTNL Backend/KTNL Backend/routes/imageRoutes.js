const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

// Route to upload an image with title and description
router.post('/upload', imageController.uploadImage);
router.get('/images', imageController.getImages);


// Route to fetch a single image by its ID
router.get('/image/:id', imageController.getImageById);

router.delete('/images/:id', imageController.deleteImage);

module.exports = router;




//////post APi fro image
// http://localhost:8081/api/images/upload


///////Get ALL api

// http://localhost:8081/api/images/images



///////Get By Id Api
// http://localhost:8081/api/images/image/67455db93fa89e3a6ad68486


////////Delete Api
// http://localhost:8081/api/images/images/67455db93fa89e3a6ad68486