import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Footer.css'; // Ensure this path is correct

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <p className="footer-text">©, K&M Sales, 2025, All Rights Reserved</p>
          <div className="footer-images">
            <p>Proudly Partnered With:</p>
            <img src='/assets/images/bonanza.avif' alt='Bonanza' />
            <img src='/assets/images/paramount.avif' alt='Paramount' />
            <img src='/assets/images/muncie.avif' alt='Muncie' />
          </div>
        </div>
        <div className="footer-section">
          <h3>Information</h3>
          <ul>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/return-policy">Return Policy</Link></li>
            <li><Link to="/shipping-policy">Shipping Policy</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <p>
            <a href="https://www.facebook.com/p/KM-Sales-61572474146089/?mibextid=wwXIfr&rdid=GS4xboY7Uta0SA42&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1MdR6EfBFd%2F%3Fmibextid%3DwwXIfr#" target="_blank" rel="noopener noreferrer">Facebook</a>
          </p>
          <p>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          </p>
          <p>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;