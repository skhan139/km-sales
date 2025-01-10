// src/pages/HomePage.js

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Banner from '../components/Banner';
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
          Please Signup/Login to view our products and place an order <a href="/login" className="link-white">here</a>.
        </p>
      </div>
      <div className="slider-container">
        <h3>Our Best Sellers!</h3>
        <Slider {...sliderSettings}>
          <div>
            <img src="/assets/images/image1.jpg" alt="Image 1" className="slider-image" />
          </div>
          <div>
            <img src="/assets/images/image2.jpg" alt="Image 2" className="slider-image" />
          </div>
          <div>
            <img src="/assets/images/image3.jpg" alt="Image 3" className="slider-image" />
          </div>
          {/* Add more images as needed */}
        </Slider>
      </div>
    </div>
  );
};

export default HomePage;