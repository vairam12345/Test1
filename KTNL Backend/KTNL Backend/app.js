// const express = require("express");
// const mongoose = require("mongoose");
// const formRoutes = require("./routes/formRoutes");

// const app = express();

// // Middleware
// app.use(express.json());

// // Database connection
// mongoose.connect("mongodb+srv://Cogniitec:gNKSV8PrFSITlkIo@cluster0.vxokorw.mongodb.net/sakthiverl")
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch(error => {
//     console.error("Database connection error:", error);
//   });

// // Routes
// app.use("/api/form", formRoutes);

// // server runnning port
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });














const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");  // Import cors
const path = require('path');
const imageRoutes = require("./routes/imageRoutes");
const blogImageRoutes = require('./routes/blogRoutes');
const forms = require('./routes/formRoutes')
const Investors = require('./routes/investmentpage')
const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Database connection
mongoose.connect("mongodb+srv://Cogniitec:gNKSV8PrFSITlkIo@cluster0.vxokorw.mongodb.net/sakthiverl")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(error => {
    console.error("Database connection error:", error);
  });


  app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      // Multer-specific error
      return res.status(400).send(err.message);
    } else if (err) {
      // General errors
      return res.status(500).send('Internal Server Error');
    }
    next();
  });
  


// Image Upload api routes

app.use('/api/form', forms);
// Image Upload api routes




// Image Upload api routes
app.use('/api/images', imageRoutes);
// Image Upload api routes

/////Blog api routes
app.use('/api/blogimages', blogImageRoutes);
app.use('/blogDynamicFolder', express.static(path.join(__dirname, 'blogDynamicFolder')));
/////Blog api routes


/////Investment  api routes
app.use('/api/investmentpage', Investors);
app.use('/investmentFolder', express.static(path.join(__dirname, 'investmentFolder')));
/////Investment  api routes



////Directory path
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

////Directory path
app.use('/dynamicFolder', express.static(path.join(__dirname, 'dynamicFolder')));




////Blog Directory path
app.use('/blogFolder', express.static(path.join(__dirname, 'blogFolder')));
////Blog Directory path



// Server running port
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
	