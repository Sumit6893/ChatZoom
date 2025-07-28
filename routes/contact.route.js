const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.useremail, // replace with your email
    pass: process.env.userpass, // use Gmail app password
  },
});

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: "test@gmail.com", // your admin email
    subject: `New Contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Message sent!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
