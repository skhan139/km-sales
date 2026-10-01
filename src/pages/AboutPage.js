import React from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

const productCategories = [
  {
    number: '01',
    title: 'Tip Jars',
    description:
      'Take gaming and promotional activities to the next level with vibrant, engaging tip jars. They are ideal for fundraising, giveaways, and special events.',
  },
  {
    number: '02',
    title: 'Instant Winner Tickets',
    description:
      'Keep the excitement alive with quick-play games designed for promotions and giveaways. Our eye-catching options help create an entertaining player experience.',
  },
  {
    number: '03',
    title: 'Bingo Games and Daubers',
    description:
      'Explore quality bingo games and a variety of daubers designed to make game nights more organized, colorful, and enjoyable.',
  },
  {
    number: '04',
    title: 'Specialty Boards',
    description:
      'Our bonus, coin, and scratch-off boards provide clubs and organizations with a diverse selection of fundraising and gaming options.',
  },
  {
    number: '05',
    title: 'Event Supplies',
    description:
      'Raffle tickets, tip boards, and bingo paper help keep fundraising and community events organized, professional, and enjoyable.',
  },
  {
    number: '06',
    title: 'Custom Games',
    description:
      'Looking for something unique? We work with customers to create custom games that bring a personal touch to special events and fundraisers.',
  },
];

const companyValues = [
  {
    value: '40+',
    label: 'Years of Experience',
  },
  {
    value: '2',
    label: 'States Served',
  },
  {
    value: '500+',
    label: 'Available Products',
  },
];

const videos = [
  {
    title: 'Learn More About Our Games',
    url: 'https://www.youtube.com/embed/HQ0Qt3kDewc',
  },
  {
    title: 'Explore K&M Gaming Products',
    url: 'https://www.youtube.com/embed/yikvtkdhx_4',
  },
];

const AboutPage = () => {
  return (
    <main className="about-page-shell">
      <div className="about-background-grid" />
      <div className="about-orb about-orb--one" />
      <div className="about-orb about-orb--two" />

      <div className="about-page">
        <section className="about-hero">
          <div className="about-hero-copy">
            <p className="about-eyebrow">
              Our Company
            </p>

            <h1>
              Built on service.
              <span> Trusted for generations.</span>
            </h1>

            <p className="about-lead">
              K&amp;M Sales has proudly served as a leading
              distributor of bingo and gaming supplies across
              Western Maryland and West Virginia for more than
              40 years.
            </p>

            <div className="about-hero-actions">
              <Link
                to="/members"
                className="about-primary-button"
              >
                Browse Products
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                to="/contact"
                className="about-secondary-button"
              >
                Contact Our Team
              </Link>
            </div>
          </div>

          <aside className="about-founder-card">
            <div className="founder-card-heading">
              <span className="founder-number">40+</span>

              <span className="founder-label">
                Years serving our community
              </span>
            </div>

            <blockquote>
              “A dedication to quality and customer
              satisfaction has made K&amp;M Sales a trusted
              partner in the industry.”
            </blockquote>

            <div className="founder-credit">
              <span className="founder-mark">RM</span>

              <span>
                <strong>Roy “Buzz” Mills</strong>
                <small>Founder, K&amp;M Sales</small>
              </span>
            </div>
          </aside>
        </section>

        <section
          className="about-stats"
          aria-label="Company highlights"
        >
          {companyValues.map((item) => (
            <div key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </section>

        <section className="about-story">
          <div className="about-section-heading">
            <div>
              <p className="about-section-kicker">
                Who we serve
              </p>

              <h2>
                Helping organizations grow through better
                fundraising.
              </h2>
            </div>

            <p>
              We work with licensed charitable, fraternal,
              veteran, restaurant, bar, and other eligible
              organizations throughout the region.
            </p>
          </div>

          <div className="about-story-grid">
            <article className="about-story-card">
              <span aria-hidden="true">01</span>
              <h3>Quality Products</h3>
              <p>
                We offer dependable gaming products at
                competitive prices so organizations can run
                successful events and fundraising programs.
              </p>
            </article>

            <article className="about-story-card">
              <span aria-hidden="true">02</span>
              <h3>Experienced Guidance</h3>
              <p>
                Our knowledgeable sales team helps customers
                choose products suited to their audience,
                goals, and organization.
              </p>
            </article>

            <article className="about-story-card">
              <span aria-hidden="true">03</span>
              <h3>Personal Service</h3>
              <p>
                As a full-service regional company, we
                believe lasting relationships and responsive
                support matter just as much as the products
                we provide.
              </p>
            </article>
          </div>
        </section>

        <section className="about-products">
          <div className="about-section-heading">
            <div>
              <p className="about-section-kicker">
                What we offer
              </p>

              <h2>
                Products for every kind of event.
              </h2>
            </div>

            <p>
              From familiar club favorites to custom-created
              games, our catalog provides organizations with
              flexible options for fundraising and
              entertainment.
            </p>
          </div>

          <div className="about-product-grid">
            {productCategories.map((category) => (
              <article
                className="about-product-card"
                key={category.title}
              >
                <span className="about-product-number">
                  {category.number}
                </span>

                <h3>{category.title}</h3>
                <p>{category.description}</p>

                <Link to="/members">
                  Explore products
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="about-video-section">
          <div className="about-section-heading">
            <div>
              <p className="about-section-kicker">
                Watch and learn
              </p>

              <h2>See our games in action.</h2>
            </div>

            <p>
              Learn more about our products and how they can
              support your organization’s next event.
            </p>
          </div>

          <div className="about-video-grid">
            {videos.map((video, index) => (
              <article
                className="about-video-card"
                key={video.url}
              >
                <div className="video-frame">
                  <iframe
                    src={video.url}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>

                <div className="video-card-footer">
                  <span>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <h3>{video.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-cta">
          <div>
            <p className="about-section-kicker">
              Let’s work together
            </p>

            <h2>
              Find the right products for your organization.
            </h2>

            <p>
              Browse the catalog or contact our team for
              recommendations and personal assistance.
            </p>
          </div>

          <div className="about-cta-actions">
            <Link
              to="/members"
              className="about-primary-button"
            >
              Browse Products
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              to="/contact"
              className="about-secondary-button"
            >
              Contact K&amp;M
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutPage;