require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Log the environment variables to verify they are loaded correctly
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS);

app.use(bodyParser.json());
app.use(cors());

app.post('/submit-order', async (req, res) => {
  const { firstName, lastName, companyName, email, phoneNumber, businessAddress, city, zipCode, organizationRole, orderDetails } = req.body;

  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Use environment variable for email
      pass: process.env.EMAIL_PASS  // Use environment variable for email password
    }
  });

  // Setup email data
  let mailOptions = {
    from: process.env.EMAIL_USER, // Use environment variable for email
    to: email,                    // Send to the user's email entered in the form
    subject: 'New Order Received',
    text: `
      New order received:
      First Name: ${firstName}
      Last Name: ${lastName}
      Company Name: ${companyName}
      Email: ${email}
      Phone Number: ${phoneNumber}
      Business Address: ${businessAddress}
      City: ${city}
      Zip Code: ${zipCode}
      Organization Role: ${organizationRole}
      Order Details: ${orderDetails}
    `
  };

  try {
    // Send mail with defined transport object
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).send('Order submitted successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error submitting order');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});