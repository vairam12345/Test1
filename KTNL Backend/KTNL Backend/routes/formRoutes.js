const express = require("express");
const router = express.Router();
const formController = require("../controllers/formController");

// POST API 
router.post("/submit", formController.submitForm);

// GET API
router.get("/data", formController.getFormData);

// GET BY ID API
router.get('/:id', formController.getFormDataById);


module.exports = router;
