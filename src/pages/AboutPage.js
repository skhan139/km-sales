// src/pages/AboutPage.js

import React from 'react';
import './AboutPage.css'; // Import the CSS file for styling

const AboutPage = () => {
  return (
    <div className="about-page">
      <h2>About Us</h2>
      <p>K&M Sales has been the leading distributor in bingo and gaming supplies for Western Maryland and West Virginia for over 40 years!</p>
      <div className="flex-container">
        <div className="flex-item">
          <h3>Our History</h3>
          <p>Founded in 1977, K&M Sales has a rich history of providing quality products and services.</p>
        </div>
        <div className="flex-item">
          <h3>Our Mission</h3>
          <p>We aim to supply the best bingo and gaming supplies to our customers with unmatched service.</p>
        </div>
        <div className="flex-item">
          <h3>Our Values</h3>
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
  );
};

export default AboutPage;