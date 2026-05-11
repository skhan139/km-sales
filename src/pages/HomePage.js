import React, { useState } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HomePage.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const HomePage = () => {
  const [showPopup1, setShowPopup1] = useState(true);
  const [user] = useAuthState(auth);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: 'linear',
  };

  const stats = [
    { value: '40+', label: 'Years in Business' },
    { value: '2', label: 'States Served' },
    { value: '500+', label: 'Products Available' },
    { value: '10%', label: 'New Club Discount' },
  ];

  return (
    <div className="home-page-container">
      {/* Announcement Banner */}
      {showPopup1 && (
        <div className="announcement-banner">
          <span className="banner-badge">🎉 New Club Offer</span>
          <p>New clubs are eligible for <strong>10% off</strong> their first three orders!</p>
          <button className="banner-close" onClick={() => setShowPopup1(false)}>×</button>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-eyebrow">West Virginia & Maryland's #1 Gaming Supplier</span>
          <h1 className="hero-title">
            Welcome to <span className="hero-highlight">K&amp;M Sales</span>
          </h1>
          <p className="hero-subtitle">
            Proudly supplying bingo and gaming products for over 40 years across West Virginia and Maryland.
            Pull tabs, tip jars, bingo games, tickets &amp; more — everything your club or organization needs.
            Browse our catalog, build your cart, and our team will follow up with a personalized price quote.
            New to K&amp;M? First-time clubs enjoy 10% off their first three orders.
          </p>
          <div className="hero-actions">
            <Link to={user ? '/members' : '/login'} className="btn-primary">
              {user ? 'Shop Products' : 'Login to Shop'}
            </Link>
            <Link to="/custom-game" className="btn-secondary">
              Custom Game Creator
            </Link>
          </div>
        </div>
        <div className="hero-glow" />
      </section>

      {/* Stats Bar */}
      <section className="stats-bar">
        {stats.map((stat, i) => (
          <div className="stat-item" key={i}>
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* Regional Contacts */}
      <section className="section-block">
        <h2 className="section-title">Our Regions</h2>
        <p className="section-subtitle">Click a region to reach your local representative</p>
        <div className="image-row">
          <div className="image-card">
            <a href="mailto:everettr627@gmail.com?subject=Contact%20Maryland%20Offices">
              <img src={`${process.env.PUBLIC_URL}/assets/images/baltimore.jpg`} alt="Baltimore" />
              <div className="card-overlay">
                <span className="card-icon">✉️</span>
                <h3>Maryland</h3>
                <p>Allegany County Office</p>
              </div>
            </a>
          </div>
          <div className="image-card">
            <a href="mailto:skhan139@icloud.com?subject=Contact%20West%20Virginia%20Offices">
              <img src={`${process.env.PUBLIC_URL}/assets/images/queenspoint.jpg`} alt="Keyser" />
              <div className="card-overlay">
                <span className="card-icon">✉️</span>
                <h3>West Virginia</h3>
                <p>Regional Office</p>
              </div>
            </a>
          </div>
          <div className="image-card">
            <a href="mailto:jeff.haines@comcast.net?subject=Contact%20Garrett/Allegany%20Offices">
              <img src={`${process.env.PUBLIC_URL}/assets/images/garrett.jpg`} alt="Garrett" />
              <div className="card-overlay">
                <span className="card-icon">✉️</span>
                <h3>Maryland</h3>
                <p>Garrett / Allegany County</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Product Sliders */}
      <section className="section-block">
        <h2 className="section-title">Browse Our Products</h2>
        <p className="section-subtitle">Click any product to view the full catalog</p>
        <div className="sliders-row">
          <div className="slider-section">
            <div className="slider-badge">🎰 Pull Tabs</div>
            <div className="slider-container">
              <Slider {...sliderSettings}>
                {['bigrig','oneflag','bankvault','brewskis','1kfreedomrings','snowblowin','FAF'].map((img, i) => (
                  <div key={i}>
                    <Link to={user ? '/members' : '/login'}>
                      <img src={`${process.env.PUBLIC_URL}/assets/images/${img}.jpg`} alt={img} className="slider-image" />
                    </Link>
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          <div className="slider-section">
            <div className="slider-badge">⚡ Best Sellers</div>
            <div className="slider-container">
              <Slider {...sliderSettings}>
                {['doublejugs','redwhiteandblue','33kmsuperjar','barkingbetty','696doubledeal'].map((img, i) => (
                  <div key={i}>
                    <Link to={user ? '/members' : '/login'}>
                      <img src={`${process.env.PUBLIC_URL}/assets/images/${img}.jpg`} alt={img} className="slider-image" />
                    </Link>
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          <div className="slider-section">
            <div className="slider-badge">🎟️ Tickets</div>
            <div className="slider-container">
              <Slider {...sliderSettings}>
                {['captainjacks','bigfoots','buzzbucks','gangstersgold','thetourists','cashville'].map((img, i) => (
                  <div key={i}>
                    <Link to={user ? '/members' : '/login'}>
                      <img src={`/assets/images/${img}.jpg`} alt={img} className="slider-image" />
                    </Link>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;