// filepath: d:\Projects\PortfolioWebsite\server.js
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'joshuarivas19990820@gmail.com',
        pass: 'wuqc wict hkhl ttli'
    }
});

// Endpoint to handle form submissions
app.post('/send-email', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Email options
    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: 'joshuarivas19990820@gmail.com',
        subject: `Portfolio Contact Form: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Failed to send email. Please try again later.' });
        } else {
            console.log('Email sent:', info.response);
            res.json({ message: 'Email sent successfully!' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://192.168.1.37:${PORT}`);
});