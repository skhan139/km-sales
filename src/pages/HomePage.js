import React, { useState } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HomePage.css'; // Import the CSS file for styling
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase'; // Import Firebase configuration

const HomePage = () => {
  const [showPopup1, setShowPopup1] = useState(true); // State for the first popup

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
  };

  const handleClosePopup1 = () => setShowPopup1(false); // Close the first popup

  const [user] = useAuthState(auth); // Get the authenticated user

  return (
    <div className="homepage-container">
      {showPopup1 && (
        <div className="popup popup-1">
          <p>New clubs are eligible for 10% off for their first three orders!</p>
          <button className="popup-close-button" onClick={handleClosePopup1}>×</button>
        </div>
      )}

<div className="info-box-container">
  <div className="info-box">
    <h1 className='welcome'>Welcome to K&M Sales.</h1>
    <h2 className='produly'>Proudly supplying bingo and gaming products to West Virginia and Maryland for over 40 years!</h2>
    <p className='intro'>
      We sell a variety of pull tabs/tip jars, tickets, bingo games, and more! <br/>
      Want to buy our products?
      Add your products to cart and register with us to checkout. Once you checkout, our team will soon get back to you with a price quote.<br /> <br />
      Please Signup/Login to view our products and place an order <a href={`${process.env.PUBLIC_URL}/login`} style={{ color: 'white' }}>here</a>.
      Interested in creating a custom game? 
      <a href="/custom-game"> Visit our Custom Game Page</a> <br/> Are you a new customer and unsure of where to start? Read our <a href="/blog"> Blog</a> that goes over what certain games will suit your needs best and find out how to generate as much revenue for your club/event as possible!
    </p>
  </div>
</div>

      <div className="image-row">
        <div className="image-container">
          <a href="mailto:everettr627@gmail.com?subject=Contact%20Maryland%20Offices">
            <img src={`${process.env.PUBLIC_URL}/assets/images/baltimore.jpg`} alt="Baltimore" className="row-image" />
            <h3 className="image-overlay">Contact Maryland (Allegany County) Offices</h3>
          </a>
        </div>
        <div className="image-container">
          <a href="mailto:skhan139@icloud.com.com?subject=Contact%20West%20Virginia%20Offices">
            <img src={`${process.env.PUBLIC_URL}/assets/images/queenspoint.jpg`} alt="Keyser" className="row-image" />
            <h3 className="image-overlay">Contact West Virginia Offices</h3>
          </a>
        </div>
        <div className="image-container">
          <a href="mailto:jeff.haines@comcast.net?subject=Contact%20Garrett/Allegany%20Offices">
            <img src={`${process.env.PUBLIC_URL}/assets/images/garrett.jpg`} alt="Keyser" className="row-image" />
            <h3 className="image-overlay">Contact Maryland (Garrett/Allegany County) Offices</h3>
          </a>
        </div>
      </div>

      <div className="sliders-row">
        {/* Newest Arrivals Slider */}
        <div className="slider-section">
          <h2 className='sliderHead'>Pull Tabs</h2>
          <div className="slider-container">
            <Slider {...sliderSettings}>
              <div>
              <Link to={user ? "/members" : "/login"}>
                  <img src={`${process.env.PUBLIC_URL}/assets/images/bigrig.jpg`} alt="Newest arrival 1" className="slider-image" />
                </Link>
              </div>
              <div>
              <Link to={user ? "/members" : "/login"}>
                  <img src={`${process.env.PUBLIC_URL}/assets/images/colorofmoney.jpg`} alt="Newest arrival 2" className="slider-image" />
                </Link>
              </div>
              <div>
              <Link to={user ? "/members" : "/login"}>
                  <img src={`${process.env.PUBLIC_URL}/assets/images/sparkles.jpg`} alt="Newest arrival 3" className="slider-image" />
                </Link>
              </div>
              <div>
              <Link to={user ? "/members" : "/login"}>
                  <img src={`${process.env.PUBLIC_URL}/assets/images/brewskis.jpg`} alt="Newest arrival 4" className="slider-image" />
                </Link>
              </div>
              <div>
              <Link to={user ? "/members" : "/login"}>
                  <img src={`${process.env.PUBLIC_URL}/assets/images/applepicking.jpg`} alt="Newest arrival 4" className="slider-image" />
                </Link>
              </div>
              <div>
              <Link to={user ? "/members" : "/login"}>
                  <img src={`${process.env.PUBLIC_URL}/assets/images/snowblowin.jpg`} alt="Newest arrival 4" className="slider-image" />
                </Link>
              </div>
              <div>
              <Link to={user ? "/members" : "/login"}>
                  <img src={`${process.env.PUBLIC_URL}/assets/images/gofish.jpg`} alt="Newest arrival 4" className="slider-image" />
                </Link>
              </div>
            </Slider>
          </div>
        </div>

        {/* Best Sellers Slider */}
        <div className="slider-section">
          <h2 className='sliderHead'>Our Best Sellers</h2>
          <div className="slider-container">
            <Slider {...sliderSettings}>
              <div>
              <Link to={user ? "/members" : "/login"}>
                  <img src={`${process.env.PUBLIC_URL}/assets/images/doublejugs.jpg`} alt="Best seller 1" className="slider-image" />
                </Link>
              </div>
              <div>
              <Link to={user ? "/members" : "/login"}>
                  <img src={`${process.env.PUBLIC_URL}/assets/images/redwhiteandblue.jpg`} alt="Best seller 2" className="slider-image" />
                </Link>
              </div>
              <div>
              <Link to={user ? "/members" : "/login"}>
                  <img src={`${process.env.PUBLIC_URL}/assets/images/33kmsuperjar.jpg`} alt="Best seller 3" className="slider-image" />
                </Link>
              </div>
              <div>
              <Link to={user ? "/members" : "/login"}>
                  <img src={`${process.env.PUBLIC_URL}/assets/images/barkingbetty.jpg`} alt="Best seller 1" className="slider-image" />
                </Link>
              </div>
              <div>
              <Link to={user ? "/members" : "/login"}>
                  <img src={`${process.env.PUBLIC_URL}/assets/images/696doubledeal.jpg`} alt="Best seller 2" className="slider-image" />
                </Link>
              </div>
              {/* Add more images as needed */}
            </Slider>
          </div>
        </div>

        {/* Hot This Month Slider */}
        <div className="slider-section">
          <h2 className='sliderHead'>Tickets</h2>
          <div className="slider-container">
            <Slider {...sliderSettings}>
              <div>
              <Link to={user ? "/members" : "/login"}>
                  <img src="/assets/images/captainjacks.jpg" alt="Hot this month 1" className="slider-image" />
                </Link>
              </div>
              <div>
              <Link to={user ? "/members" : "/login"}>
                  <img src="/assets/images/bigfoots.jpg" alt="Hot this month 2" className="slider-image" />
                </Link>
              </div>
              <div>
              <Link to={user ? "/members" : "/login"}>
                  <img src="/assets/images/buzzbucks.jpg" alt="Hot this month 3" className="slider-image" />
                </Link>
              </div>
              <div>
              <Link to={user ? "/members" : "/login"}>
                  <img src="/assets/images/gangstersgold.jpg" alt="Hot this month 1" className="slider-image" />
                </Link>
              </div>
              <div>
              <Link to={user ? "/members" : "/login"}>
                  <img src="/assets/images/thetourists.jpg" alt="Hot this month 2" className="slider-image" />
                </Link>
              </div>
              <div>
              <Link to={user ? "/members" : "/login"}>
                  <img src="/assets/images/cashville.jpg" alt="Hot this month 3" className="slider-image" />
                </Link>
              </div>
              {/* Add more images as needed */}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;