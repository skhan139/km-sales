import React from 'react';
import '../assets/styles/Banner.css';

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-content">
        <h1>
          Proudly Partnered With 
          <img src='/public/assets/images/paramount.avif' alt='Partner Logo' />
          <img src='/src/assets/images/bonanza.avif' alt='Partner Logo' />
          <img src='/src/assets/images/bonanza.avif' alt='Partner Logo' />
        </h1>
      </div>
    </div>
  );
};

export default Banner;