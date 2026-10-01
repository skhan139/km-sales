import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Footer.css';

const manufacturers = [
  {
    name: 'Bonanza Press',
    website: 'https://www.bonanzapress.com/index.php',
    image: '/assets/images/bonanza.avif',
  },
  {
    name: 'Paramount',
    website: 'https://pginventory.com/',
    image: '/assets/images/paramount.avif',
  },
  {
    name: 'Muncie Novelty',
    website: 'https://www.muncienovelty.com/cms/',
    image: '/assets/images/muncie.avif',
  },
  {
    name: 'Loyal Gaming Rewards',
    website: 'https://www.goloyalpa.com/',
    image: '/assets/images/loyal.jpg',
  },
];

const companyLinks = [
  {
    label: 'About K&M',
    route: '/about',
  },
  {
    label: 'Contact Us',
    route: '/contact',
  },
  {
    label: 'Our Mission',
    route: '/legacy',
  },
  {
    label: 'Why K&M?',
    route: '/testimonial',
  },
];

const policyLinks = [
  {
    label: 'Privacy Policy',
    route: '/privacy-policy',
  },
  {
    label: 'Return Policy',
    route: '/return-policy',
  },
  {
    label: 'Shipping Policy',
    route: '/shipping-policy',
  },
  {
    label: 'Licensing Information',
    route: '/license',
  },
];

const socialLinks = [
  {
    name: 'Facebook',
    abbreviation: 'f',
    url: 'https://www.facebook.com/p/KM-Sales-61572474146089/',
  },
  {
    name: 'YouTube',
    abbreviation: '▶',
    url: 'https://www.youtube.com/channel/UC5kiejHk9_Jh_YkzCeeVDWA',
  },
  {
    name: 'Instagram',
    abbreviation: '◎',
    url: 'https://www.instagram.com/kandmsalesbingosupply/',
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-glow" />

      <div className="site-footer-container">
        <div className="site-footer-main">
          <section className="footer-brand-section">
            <Link
              to="/"
              className="footer-brand"
              aria-label="K and M Sales home"
            >
              <img
                src="/assets/images/kmicologo.png"
                alt=""
                className="footer-logo"
              />

              <span>
                <strong>K&amp;M Sales</strong>
                <small>Gaming supplies</small>
              </span>
            </Link>

            <p className="footer-brand-description">
              Proudly supplying bingo and gaming products to
              clubs and organizations throughout West
              Virginia and Maryland for over 40 years.
            </p>

            <div className="footer-service-area">
              <span className="footer-status-dot" />
              Serving West Virginia and Maryland
            </div>
          </section>

          <nav
            className="footer-navigation"
            aria-label="Footer navigation"
          >
            <div className="footer-link-column">
              <p className="footer-column-label">
                Company
              </p>

              <ul>
                {companyLinks.map((link) => (
                  <li key={link.route}>
                    <Link to={link.route}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-link-column">
              <p className="footer-column-label">
                Information
              </p>

              <ul>
                {policyLinks.map((link) => (
                  <li key={link.route}>
                    <Link to={link.route}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-link-column">
              <p className="footer-column-label">
                Customer Resources
              </p>

              <ul>
                <li>
                  <Link to="/members">
                    Product Catalog
                  </Link>
                </li>

                <li>
                  <Link to="/custom-game">
                    Custom Game Creator
                  </Link>
                </li>

                <li>
                  <Link to="/rewards">
                    Member Rewards
                  </Link>
                </li>

                <li>
                  <a
                    href="https://www.kandmbuzzboard.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Buzz Board
                    <span
                      className="external-arrow"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <section
          className="footer-partners"
          aria-labelledby="footer-partners-title"
        >
          <div className="footer-partners-heading">
            <div>
              <p className="footer-column-label">
                Trusted relationships
              </p>

              <h2 id="footer-partners-title">
                Proudly partnered with
              </h2>
            </div>

            <p>
              Working with established manufacturers to bring
              dependable products to our customers.
            </p>
          </div>

          <div className="footer-partner-grid">
            {manufacturers.map((manufacturer) => (
              <a
                key={manufacturer.name}
                href={manufacturer.website}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-partner"
                aria-label={`Visit ${manufacturer.name}`}
              >
                <div className="footer-partner-image">
                  <img
                    src={manufacturer.image}
                    alt={`${manufacturer.name} logo`}
                    loading="lazy"
                  />
                </div>

                <span>
                  <strong>{manufacturer.name}</strong>
                  <small>
                    Visit website
                    <span aria-hidden="true">↗</span>
                  </small>
                </span>
              </a>
            ))}
          </div>
        </section>

        <div className="footer-bottom">
          <p>
            © {currentYear} K&amp;M Sales. All rights
            reserved.
          </p>

          <div
            className="footer-social-links"
            aria-label="K and M Sales social media"
          >
            <span>Follow us</span>

            {socialLinks.map((socialLink) => (
              <a
                key={socialLink.name}
                href={socialLink.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow K and M Sales on ${socialLink.name}`}
                title={socialLink.name}
              >
                <span aria-hidden="true">
                  {socialLink.abbreviation}
                </span>
              </a>
            ))}
          </div>

          <a
            href="mailto:skhan139@icloud.com?subject=K%26M%20Sales%20Inquiry"
            className="footer-contact-link"
          >
            Contact our team
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;