import React from 'react';
import '../assets/styles/Banner.css';

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-content">
        <p>
          Interested in creating a custom game? 
          <a href="mailto:skhan139@icloud.com?subject=Custom%20Game%20Inquiry"> Message us here!</a>
        </p>
      </div>
    </div>
  );
};

export default Banner;