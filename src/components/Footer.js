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
            <a href="https://www.bonanzapress.com/index.php" target="_blank" rel="noopener noreferrer">
  <img src="/assets/images/bonanza.avif" alt="Bonanza" />
</a>
<a href="https://pginventory.com/" target="_blank" rel="noopener noreferrer">
  <img src="/assets/images/paramount.avif" alt="Paramount" />
</a>
<a href="https://www.muncienovelty.com/cms/" target="_blank" rel="noopener noreferrer">
  <img src="/assets/images/muncie.avif" alt="Muncie" />
</a>
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
            <a href="https://www.youtube.com/channel/UC5kiejHk9_Jh_YkzCeeVDWA" target="_blank" rel="noopener noreferrer">Youtube</a>
          </p>
          <p>
            <a href="https://www.instagram.com/kandmsalesbingosupply/?igsh=MWg4aTJ0a3UzaWdsMQ%3D%3D&utm_source=qr#" target="_blank" rel="noopener noreferrer">Instagram</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;