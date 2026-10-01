import React, { useState } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HomePage.css';

import { auth } from '../firebase';

const stats = [
  { value: '40+', label: 'Years in Business' },
  { value: '2', label: 'States Served' },
  { value: '500+', label: 'Products Available' },
  { value: '10%', label: 'New Club Discount' },
];

const regions = [
  {
    name: 'Maryland',
    office: 'Allegany County Office',
    image: 'baltimore.jpg',
    email: 'everettr627@gmail.com',
    subject: 'Contact Maryland Offices',
  },
  {
    name: 'West Virginia',
    office: 'Regional Office',
    image: 'queenspoint.jpg',
    email: 'skhan139@icloud.com',
    subject: 'Contact West Virginia Offices',
  },
  {
    name: 'Maryland',
    office: 'Garrett / Allegany County',
    image: 'garrett.jpg',
    email: 'jeff.haines@comcast.net',
    subject: 'Contact Garrett/Allegany Offices',
  },
];

const productCategories = [
  {
    name: 'Pull Tabs',
    icon: '01',
    description: 'Browse our newest pull-tab games.',
    images: [
      'bigrig',
      'oneflag',
      'bankvault',
      'brewskis',
      '1kfreedomrings',
      'snowblowin',
      'FAF',
    ],
  },
  {
    name: 'Best Sellers',
    icon: '02',
    description: 'Customer favorites and proven performers.',
    images: [
      'doublejugs',
      'redwhiteandblue',
      '33kmsuperjar',
      'barkingbetty',
      '696doubledeal',
    ],
  },
  {
    name: 'Tickets',
    icon: '03',
    description: 'Popular tickets for clubs and organizations.',
    images: [
      'captainjacks',
      'bigfoots',
      'buzzbucks',
      'gangstersgold',
      'thetourists',
      'cashville',
    ],
  },
];

const formatImageName = (imageName) => {
  return imageName
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const HomePage = () => {
  const [showAnnouncement, setShowAnnouncement] =
    useState(true);
  const [user] = useAuthState(auth);

  const catalogDestination = user ? '/members' : '/login';

  const sliderSettings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    pauseOnFocus: true,
    fade: true,
    cssEase: 'ease-in-out',
    accessibility: true,
  };

  return (
    <main className="home-page-container">
      {showAnnouncement && (
        <aside
          className="announcement-banner"
          aria-label="New club promotion"
        >
          <span
            className="announcement-icon"
            aria-hidden="true"
          >
            %
          </span>

          <div className="announcement-copy">
            <span className="banner-badge">
              New club offer
            </span>

            <p>
              New clubs receive <strong>10% off</strong>{' '}
              their first three orders.
            </p>
          </div>

          <button
            type="button"
            className="banner-close"
            aria-label="Dismiss promotion"
            onClick={() => setShowAnnouncement(false)}
          >
            ×
          </button>
        </aside>
      )}

      <section className="hero-section">
        <div className="hero-background-grid" />
        <div className="hero-orb hero-orb--one" />
        <div className="hero-orb hero-orb--two" />

        <div className="hero-layout">
          <div className="hero-content">
            <span className="hero-eyebrow">
              Serving West Virginia and Maryland
            </span>

            <h1 className="hero-title">
              Your trusted partner for
              <span className="hero-highlight">
                {' '}
                bingo and gaming supplies.
              </span>
            </h1>

            <p className="hero-subtitle">
              For more than four decades, K&amp;M Sales has
              helped clubs and organizations find the games,
              tickets, and supplies they need—all backed by
              personal, local service.
            </p>

            <div className="hero-actions">
              <Link
                to={catalogDestination}
                className="btn-primary"
              >
                <span>
                  {user
                    ? 'Browse Products'
                    : 'Sign In to Shop'}
                </span>
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                to="/custom-game"
                className="btn-secondary"
              >
                Create a Custom Game
              </Link>
            </div>

            <div className="hero-trust-row">
              <span className="hero-trust-mark">
                <span aria-hidden="true">✓</span>
                Personalized quotes
              </span>

              <span className="hero-trust-mark">
                <span aria-hidden="true">✓</span>
                Regional support
              </span>

              <span className="hero-trust-mark">
                <span aria-hidden="true">✓</span>
                Established 40+ years
              </span>
            </div>
          </div>

          <div
            className="hero-showcase"
            aria-label="K and M Sales services"
          >
            <div className="hero-showcase__top">
              <span className="showcase-label">
                K&amp;M Sales
              </span>
              <span className="showcase-status">
                <span />
                Taking orders
              </span>
            </div>

            <div className="showcase-main">
              <p>Your local gaming supply partner</p>
              <strong>Everything your club needs.</strong>
            </div>

            <div className="showcase-services">
              <div className="showcase-service">
                <span>01</span>
                <div>
                  <strong>Browse</strong>
                  <p>Explore hundreds of available products.</p>
                </div>
              </div>

              <div className="showcase-service">
                <span>02</span>
                <div>
                  <strong>Build</strong>
                  <p>Create an order that fits your club.</p>
                </div>
              </div>

              <div className="showcase-service">
                <span>03</span>
                <div>
                  <strong>Connect</strong>
                  <p>Receive personal service and pricing.</p>
                </div>
              </div>
            </div>

            <div className="showcase-footer">
              <span>WV</span>
              <div />
              <span>MD</span>
            </div>
          </div>
        </div>
      </section>

      <section
        className="stats-section"
        aria-label="Company highlights"
      >
        <div className="stats-bar">
          {stats.map((stat) => (
            <div className="stat-item" key={stat.label}>
              <span className="stat-value">
                {stat.value}
              </span>
              <span className="stat-label">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-block regions-section">
        <div className="section-header">
          <div>
            <span className="section-kicker">
              Local service
            </span>
            <h2 className="section-title">
              Connect with your region
            </h2>
          </div>

          <p className="section-subtitle">
            Our regional representatives are ready to help
            with products, orders, and questions.
          </p>
        </div>

        <div className="image-row">
          {regions.map((region, index) => (
            <article
              className="image-card"
              key={`${region.office}-${region.email}`}
            >
              <a
                href={`mailto:${region.email}?subject=${encodeURIComponent(
                  region.subject
                )}`}
                aria-label={`Email the ${region.office}`}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/${region.image}`}
                  alt={`${region.name} service region`}
                />

                <div className="card-shade" />

                <div className="region-number">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div className="card-overlay">
                  <span className="card-label">
                    Regional contact
                  </span>

                  <h3>{region.name}</h3>
                  <p>{region.office}</p>

                  <span className="card-action">
                    Send an email
                    <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block products-section">
        <div className="section-header">
          <div>
            <span className="section-kicker">
              Product catalog
            </span>
            <h2 className="section-title">
              Find your next customer favorite
            </h2>
          </div>

          <p className="section-subtitle">
            Preview some of our popular products, then visit
            the catalog to explore the full collection.
          </p>
        </div>

        <div className="sliders-row">
          {productCategories.map((category) => (
            <article
              className="slider-section"
              key={category.name}
            >
              <div className="slider-heading">
                <span className="slider-number">
                  {category.icon}
                </span>

                <div>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
              </div>

              <div className="slider-container">
                <Slider {...sliderSettings}>
                  {category.images.map((imageName) => (
                    <div key={imageName}>
                      <Link
                        to={catalogDestination}
                        className="product-slide"
                        aria-label={`View ${formatImageName(
                          imageName
                        )} in the product catalog`}
                      >
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/images/${imageName}.jpg`}
                          alt={formatImageName(imageName)}
                          className="slider-image"
                          loading="lazy"
                        />

                        <span className="product-slide-overlay">
                          View catalog
                          <span aria-hidden="true">→</span>
                        </span>
                      </Link>
                    </div>
                  ))}
                </Slider>
              </div>

              <Link
                to={catalogDestination}
                className="category-link"
              >
                Explore {category.name}
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="home-cta">
        <div className="home-cta-content">
          <span className="section-kicker">
            Ready to get started?
          </span>

          <h2>Find the right products for your club.</h2>

          <p>
            Browse the catalog or contact your regional
            representative for personal assistance.
          </p>
        </div>

        <div className="home-cta-actions">
          <Link
            to={catalogDestination}
            className="btn-primary"
          >
            Browse Products
            <span aria-hidden="true">→</span>
          </Link>

          <a
            href="mailto:skhan139@icloud.com?subject=K%26M%20Sales%20Product%20Inquiry"
            className="btn-secondary"
          >
            Contact Our Team
          </a>
        </div>
      </section>
    </main>
  );
};

export default HomePage;