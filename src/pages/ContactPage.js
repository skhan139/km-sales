// src/pages/ContactPage.js

import React from 'react';
import { Link } from 'react-router-dom';
import './ContactPage.css'; // Import the CSS file for styling

const ContactPage = () => {
  return (
    <div className="page-container">
      <h1 className='contact'>For All Your Custom Order Needs, Questions, Or Concerns</h1>
    <div className="contact-page">
      <h1 className='contact'>Contact Us</h1>
      <div className="flex-container">
        <div className="flex-item">
          <h3>K&M Keyser Office</h3>
          <p>365 Sunset Place, Keyser, WV 26726 <br /> <br />(304)-788-5310</p>
        </div>
        <div className="flex-item">
          <h3>Rich Everett (Allegany/Garrett County Representive) </h3>
          <p>Cell: (301)-876-0862 <br /> <br />Email: Everettr627@gmail.com</p>
        </div>
        <div className="flex-item">
          <h3>Sami Khan (West Virginia Representive)</h3>
          <p>Cell: (443)-789-6803 <br /> <br />Email: Skhan139@icloud.com</p>
        </div>
        <div className="flex-item">
          <h3>Craig Rotruck (West Virginia Representive)</h3>
          <p>Cell: (304)-813-1078 <br /> <br /> Email: Kandmsales17@gmail.com</p>
        </div>
        <div className="flex-item">
          <h3>Jeff Haines (Garrett/Allegany County Representive)</h3>
          <p>Cell:: (301)-268-0634 <br /> <br /> Email: Jeff.Haines@comcast.net</p>
        </div>
        <div className="flex-item">
          <h3>Product Gallery</h3>
          <p>To browse our product gallery and place an order, login <Link to="/login">here</Link>.</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ContactPage;