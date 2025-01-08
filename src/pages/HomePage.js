// src/pages/HomePage.js

import React from 'react';
import Banner from '../components/Banner';
import './HomePage.css'; // Import the CSS file for styling

const HomePage = () => {
  return (
    <div className="homepage-container">
      <Banner />
      <h2>The leading distributor in bingo and gaming supplies for Western Maryland and West Virginia for over 40 years!</h2>
    </div>
  );
};

export default HomePage;