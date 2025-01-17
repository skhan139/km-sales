// server.js
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const port = process.env.PORT || 3000;

console.log('EMAIL_USER:', process.env.EMAIL_USER);

app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.me.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

app.post('/submit-order', async (req, res) => {
    const { firstName, lastName, organization, email, phone, address, city, state, zipCode, license, specialInstructions } = req.body;

    console.log('Received form data:', req.body); // Debug log

    let userMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Order Confirmation',
        text: `
            Thank you for your order, ${firstName}!

            Here are your order details:
            First Name: ${firstName}
            Last Name: ${lastName}
            Organization: ${organization}
            Email: ${email}
            Phone: ${phone}
            Address: ${address}
            City: ${city}
            State: ${state}
            Zip Code: ${zipCode}
            License: ${license}
            Special Instructions: ${specialInstructions}

            Best regards,
            K&M Sales
        `
    };

    let adminMailOptions = {
        from: process.env.EMAIL_USER,
        to: 'skhan139@icloud.com',
        subject: 'New Order Placed',
        text: `
            A new order has been placed:
            First Name: ${firstName}
            Last Name: ${lastName}
            Organization: ${organization}
            Email: ${email}
            Phone: ${phone}
            Address: ${address}
            City: ${city}
            State: ${state}
            Zip Code: ${zipCode}
            License: ${license}
            Special Instructions: ${specialInstructions}
        `
    };

    try {
        await transporter.sendMail(userMailOptions);
        console.log('User email sent successfully'); // Debug log

        await transporter.sendMail(adminMailOptions);
        console.log('Admin email sent successfully'); // Debug log

        res.status(200).send('Order submitted successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error submitting order');
    }
});

// Create an HTTP server
const server = http.createServer(app);

// Create a WebSocket server and attach it to the HTTP server
const wss = new WebSocket.Server({ server, path: '/ws' });

wss.on('connection', (ws) => {
    console.log('A new client connected');

    ws.on('message', (message) => {
        console.log('received: %s', message);
    });

    ws.send('Welcome to the WebSocket server!');
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});