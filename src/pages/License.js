// src/pages/License.js

import React from 'react';
import './License.css';

const LicensePage = () => {
  return (
    <div className="license-page-shell">
      <div className="license-page">
        <h1 className="license-hero-title">Licensing Information</h1>
        <h2 className="license-subtitle">Our Licenses</h2>
        <div className="license-grid">
          <div className="license-card">
            <h3>West Virginia Gaming Distribution License</h3>
            <img src="/assets/images/wvlicense.jpg" alt="West Virginia License" className="license-image" />
            <p>Valid Until: June 30, 2025</p>
          </div>
          <div className="license-card">
            <h3>Maryland Gaming Distribution License</h3>
            <img src="/assets/images/alleganylicense.jpg" alt="Maryland License" className="license-image" />
            <p>Valid Until: June 30, 2025</p>
          </div>
          <div className="license-card">
            <h3>How To Obtain A WV License To Sell Our Products</h3>
            <p className="license-note">West Virginia Licenses are for the entire state of West Virginia. If you have obtained a WV License to sell gaming products, it's legal to do so anywhere within the state.</p>
            <div className="license-links">
              <a href="https://tax.wv.gov/Documents/TSD/tsd446.pdf" target="_blank" rel="noopener noreferrer">Official Form</a>
              <a href="https://tax.wv.gov/Business/BusinessRegistration/BingoAndRaffle/Pages/BusinessRegistrationBingoAndRaffle.aspx" target="_blank" rel="noopener noreferrer">Registration Portal</a>
            </div>
          </div>
          <div className="license-card">
            <h3>How To Obtain A MD License To Sell Our Products</h3>
            <p className="license-note">Maryland Licenses are distributed by county, not state. You must obtain a license for your respective county.</p>
            <div className="license-links">
              <a href="https://www.alleganygov.org/202/Gaming-Office" target="_blank" rel="noopener noreferrer">Allegany County</a>
              <span className="license-info">Garrett County: No License Required</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LicensePage;