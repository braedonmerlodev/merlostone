const express = require('express');
const cors = require('cors');
const axios = require('axios');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// reCAPTCHA verification function
async function verifyRecaptcha(token) {
  if (!token) {
    return { success: false, error: 'reCAPTCHA token is missing' };
  }

  // Special handling for development environment tokens
  if (token.startsWith('localhost-development-token') || token.startsWith('development-environment-token')) {
    console.log('Using mock reCAPTCHA token for development environment');
    return { 
      success: true, 
      score: 0.9,
      action: 'dev_environment',
      hostname: 'development'
    };
  }

  try {
    // Replace with your actual reCAPTCHA secret key
    const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY || 'YOUR_RECAPTCHA_SECRET_KEY';
    
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: RECAPTCHA_SECRET_KEY,
          response: token
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return { success: false, error: 'Failed to verify reCAPTCHA' };
  }
}

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message, recaptchaToken } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }

    // Verify reCAPTCHA
    const recaptchaResult = await verifyRecaptcha(recaptchaToken);
    
    if (!recaptchaResult.success) {
      return res.status(400).json({
        success: false,
        message: 'reCAPTCHA verification failed',
        error: recaptchaResult.error
      });
    }

    // Check reCAPTCHA score (0.0 to 1.0, 1.0 is very likely a good interaction)
    if (recaptchaResult.score && recaptchaResult.score < 0.5) {
      return res.status(400).json({
        success: false,
        message: 'Suspicious activity detected'
      });
    }

    // Configure email transporter (replace with your email service credentials)
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'your-email-password'
      }
    });

    const mailOptions = {
      from: `"Merlo Stone Website" <${process.env.EMAIL_USER || 'your-email@gmail.com'}>`,
      to: process.env.EMAIL_RECIPIENT || 'davemerlo@comcast.net',
      replyTo: email,
      subject: `New Contact Form Submission: ${subject || 'Website Inquiry'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject || 'Not provided'}</p>
        <h3>Message:</h3>
        <p>${message}</p>
        <hr>
        <p>This email was sent from the Merlo Stone website contact form.</p>
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.messageId);

    res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.'
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing your request. Please try again later.'
    });
  }
});

// Catch-all handler for any requests to unknown API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// For any other requests, serve the React app in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 