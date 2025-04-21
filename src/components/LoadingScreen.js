import React from 'react';
import './LoadingScreen.css'; // Import the CSS file for styling

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <img 
        src="/assets/images/km.jpeg" // Replace with the path to your loading image
        alt="Loading..." 
        className="loading-image" 
      />
      <p>Loading...</p>
    </div>
  );
};

export default LoadingScreen;