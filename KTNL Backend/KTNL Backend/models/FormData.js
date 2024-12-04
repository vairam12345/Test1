const mongoose = require("mongoose");

const formDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subject: { type: String, required: true },
  service: { type: String, required: true }, // Dropdown selection
  business: { type: String, required: true },  // Dropdown selection
});

module.exports = mongoose.model("FormData", formDataSchema);
