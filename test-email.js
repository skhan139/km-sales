require('dotenv').config();
const nodemailer = require('nodemailer');

async function sendTestEmail() {
    let transporter = nodemailer.createTransport({
        host: 'smtp.mail.me.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER, // Use environment variable for email
            pass: process.env.EMAIL_PASS  // Use environment variable for email password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_USER, // Use environment variable for email
        to: 'skhan139@icloud.com',    // Send to your email for admin notification
        subject: 'Test Email',
        text: 'This is a test email to verify the email sending functionality.'
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Test email sent successfully');
    } catch (error) {
        console.error('Error sending test email:', error);
    }
}

sendTestEmail();