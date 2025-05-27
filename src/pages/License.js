// src/pages/License.js

import React from 'react';
import './ContactPage.css'; // Reuse the ContactPage CSS for styling

const LicensePage = () => {
  return (
    <div className="page-container">
      <h1 className='contact'>Licensing Information</h1>
      <div className="contact-page">
        <h1 className='contact'>Our Licenses</h1>
        <div className="flex-container">
          <div className="flex-item">
            <h3>West Virginia Gaming Distribution License</h3>
            <p><img src="/assets/images/wvlicense.jpg" alt="Shop Boards" className="category-image" /> <br /> <br /> Valid Until: June 30, 2025</p>
          </div>
          <div className="flex-item">
            <h3>Maryland Gaming Distribution License</h3>
            <p><img src="/assets/images/alleganylicense.jpg" alt="Shop Boards" className="category-image" /> <br /> <br /> Valid Until: June 30, 2025</p>
          </div>
          <div className="flex-item">
            <h3>How To Obtain A WV License To Sell Our Products</h3>
            <p>** NOTE ** West Virginia Licenses are for the entire state of West Virginia. If you have obtained a WV License to sell gaming prodcts it's legal to do so anywhere within the state.<br /> <br />https://tax.wv.gov/Documents/TSD/tsd446.pdf <br /> <br /> https://tax.wv.gov/Business/BusinessRegistration/BingoAndRaffle/Pages/BusinessRegistrationBingoAndRaffle.aspx</p>
          </div>
          <div className="flex-item">
            <h3>How To Obtain A MD License To Sell Our Products</h3>
            <p>** NOTE ** Maryland Licenses are distributed by county and not state. In order to sell our products you must obtain a license for your respective county. <br /> <br /> Allegany County: https://www.alleganygov.org/202/Gaming-Office <br /> <br />Garrett County: No License Is Required</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LicensePage;