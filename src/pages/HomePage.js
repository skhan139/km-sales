// src/pages/HomePage.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HomePage.css'; // Import the CSS file for styling

const HomePage = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="homepage-container">
      <div className="info-box">
        <h1>Welcome to K&M Sales.</h1>
        <h2>Proudly serving West Virginia and Maryland for over 40 years!</h2>
        <p>
          We supply to Bingo Halls, Cash Bashes. Military Organizations, Private Clubs, Bars, and Fire Departments. <br /> <br />
          Please Signup/Login to view our products and place an order <a href={`${process.env.PUBLIC_URL}/login`} style={{ color: 'white' }}>here</a>.
        </p>
      </div>
      <div className="slider-container">
        <Slider {...sliderSettings}>
          <div>
            <img src={`${process.env.PUBLIC_URL}/assets/images/image1.jpg`} alt="Product display 1" className="slider-image" />
          </div>
          <div>
            <img src={`${process.env.PUBLIC_URL}/assets/images/image2.jpg`} alt="Product display 2" className="slider-image" />
          </div>
          <div>
            <img src={`${process.env.PUBLIC_URL}/assets/images/image3.jpg`} alt="Product display 3" className="slider-image" />
          </div>
          {/* Add more images as needed */}
        </Slider>
      </div>
    </div>
  );
};

export default HomePage;