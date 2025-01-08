// src/pages/AboutPage.js

import React from 'react';
import './AboutPage.css'; // Import the CSS file for styling

const AboutPage = () => {
  return (
    <div className="page-container">
    <div className="about-page">
      <h2>About Us</h2>
      <p>K&M Sales has been the leading distributor in bingo and gaming supplies for Western Maryland and West Virginia for over 40 years!</p>
      <div className="flex-container">
        <div className="flex-item">
          <h3>Custom Printing</h3>
          <p>We produce all types of printing like Political Posters, Drawing Tickets, Envelopes, Glass and Plastic Mugs, Pens, Pencils, Note Pads, Invoices, Brochures, Bingo Paper, Pull Tabs, Jar Tickets, Bingo Event Games, Seal Cards, Bonus Boards. In other words we have the ability to produce just about anything you could need.</p>
        </div>
        <div className="flex-item">
          <h3>Coin Boards</h3>
          <p>We are also the Manufacturer of Custom Coin Boards & Merchandise Games with over 500 different boards and games available.</p>
        </div>
        <div className="flex-item">
          <h3>Tip Jars</h3>
          <p>Integrity, commitment, and customer satisfaction are at the core of our business.</p>
        </div>
        <div className="flex-item">
          <h3>Our Team</h3>
          <p>Our dedicated team works tirelessly to meet and exceed our customers' expectations.</p>
        </div>
        <div className="flex-item">
          <h3>Our Products</h3>
          <p>We offer a wide range of bingo and gaming supplies to cater to all needs.</p>
        </div>
        <div className="flex-item">
          <h3>Contact Us</h3>
          <p>Reach out to us for any inquiries or support. We're here to help!</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AboutPage;