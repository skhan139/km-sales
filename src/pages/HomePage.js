import React from 'react';
import Banner from '../components/Banner';
import './HomePage.css'; // Import the CSS file for styling

const HomePage = () => {
  return (
    <div className="homepage-container">
      <Banner />
      <div className="info-box">
        <h2>Welcome to the Home Page!</h2>
        <p>
          This is your information box. Add your content here, whether it’s an
          introduction, announcements, or anything else you’d like to display.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
