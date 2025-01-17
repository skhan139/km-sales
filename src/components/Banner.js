import React from 'react';
import '../assets/styles/Banner.css';

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-content">
        <h3>
          Interested in creating a custom game? 
          <a href="mailto:skhan139@icloud.com?subject=Custom%20Game%20Inquiry"> Message us here!</a>
        </h3>
      </div>
    </div>
  );
};

export default Banner;