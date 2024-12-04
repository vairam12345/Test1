const FormData = require("../models/FormData");
const nodemailer = require("nodemailer");

// Submit Form API
exports.submitForm = async (req, res) => {
  try {
    const { name, email, phone, subject, service, business } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !subject || !service || !business) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save form data to the database
    const formData = new FormData({
      name,
      email,
      phone,
      subject,
      service,
      business
    });

    await formData.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'contact@ktig.in',  
        pass: 'oizj sgft ritd lmvk'     
      }
    });

    // Set email recipient based on the 'business' field
    let recipientEmail = 'contact@ktig.in';  // Default email

    // If business is "Banking and Finance", send to the specified email
    if (business === 'Banking and Finance') {
      recipientEmail = 'contact@ktig.in';  // Replace with the desired email for banking and finance
    }

    // If business is "Banking and IT/ITES Services,Content Writing,Web design & Developement"
    if (business === 'Course Training and IT/ITES Services,Content Writing,Web design & Developement ') {
      recipientEmail = 'contact@ktig.in';  // Replace with the desired email for banking and finance

    }

    const mailOptions = {
      from: 'contact@ktig.in',    
      to: recipientEmail,
      subject: 'User New Form Submission',
      text: `New form submission:
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Subject: ${subject}
        Service: ${service}
        Business: ${business}
      `
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: "Failed to send email", error: error.message });
      }
      res.status(201).json({ message: "Form submitted successfully", data: formData });
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to submit form", error: error.message });
  }
};

// GET API - Get all form data
exports.getFormData = async (req, res) => {
  try {
    const formDataList = await FormData.find();
    res.status(200).json(formDataList);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve data", error: error.message });
  }
};

// GET API - Get form data by ID
exports.getFormDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const formData = await FormData.findById(id);

    if (!formData) {
      return res.status(404).json({ message: "Form data not found" });
    }

    res.status(200).json(formData);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve data", error: error.message });
  }
};
