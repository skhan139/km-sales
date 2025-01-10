// src/components/Footer.js

import React from 'react';
import '../assets/styles/Footer.css'; // Ensure this path is correct

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text">Copyright K&M Sales 2025 All Rights Reserved</p>
      <div className="footer-images">
        <p>Proudly Partnered With:</p>
        <img src='/assets/images/bonanza.avif' alt='Bonanza' />
        <img src='/assets/images/paramount.avif' alt='Paramount' />
        <img src='/assets/images/muncie.avif' alt='Muncie' />
      </div>
    </footer>
  );
};

export default Footer;