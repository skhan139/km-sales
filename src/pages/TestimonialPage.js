import React from 'react';
import { Link } from 'react-router-dom';
import './TestimonialPage.css';

const benefits = [
  {
    id: 1,
    number: '01',
    title: 'Fast Fulfillment',
    summary: 'Local service without unnecessary delays.',
    text:
      'We approach every order with urgency. Being close to our customers often allows us to fulfill orders on the day they are placed or the following day. We understand that long delays can put organizations at a disadvantage.',
    featured: true,
  },
  {
    id: 2,
    number: '02',
    title: 'No Delivery Fee',
    summary: 'Regional delivery at no additional cost.',
    text:
      'We provide free delivery throughout Mineral, Allegany, and surrounding counties. Our goal is to support your club without adding unnecessary delivery charges to your order.',
    featured: true,
  },
  {
    id: 3,
    number: '03',
    title: 'Custom Products',
    summary: 'Games designed around your organization.',
    text:
      'From ticket games to custom card games, we can create products based on your specifications. Custom names, themes, illustrations, and payouts are available to help bring your idea to life.',
  },
  {
    id: 4,
    number: '04',
    title: 'Personal Product Guidance',
    summary: 'Help finding the right fit for your goals.',
    text:
      'We provide product guidance online and in person. With so many options available, our team helps you choose products that fit your organization, audience, and revenue goals.',
  },
  {
    id: 5,
    number: '05',
    title: 'Community Commitment',
    summary: 'Relationships that extend beyond an order.',
    text:
      'We take pride in supporting our customers and their events. Giving back to the communities we serve is an important part of developing lasting relationships.',
  },
  {
    id: 6,
    number: '06',
    title: 'On-Site Event Support',
    summary: 'Additional help when your event needs it.',
    text:
      'Our team can attend bashes, fundraisers, and charity events with extra inventory and hands-on assistance. We help with product distribution and other needs to make the fundraising process as efficient as possible.',
  },
  {
    id: 7,
    number: '07',
    title: 'Web and Software Development',
    summary: 'Digital tools built for your organization.',
    text:
      'Our team can create websites and mobile applications for clubs, bashes, and events. Existing customers may also qualify for discounted development rates.',
  },
];

const highlights = [
  {
    value: '40+',
    label: 'Years of Service',
  },
  {
    value: 'Free',
    label: 'Regional Delivery',
  },
  {
    value: 'Local',
    label: 'Customer Support',
  },
];

const TestimonialPage = () => {
  return (
    <main className="testimonial-page-shell">
      <div className="testimonial-background-grid" />
      <div className="testimonial-orb testimonial-orb--one" />
      <div className="testimonial-orb testimonial-orb--two" />

      <div className="testimonial-page">
        <header className="testimonial-hero">
          <p className="testimonial-eyebrow">
            The K&amp;M Difference
          </p>

          <h1>
            More than a supplier.
            <span> A partner in your success.</span>
          </h1>

          <p className="testimonial-introduction">
            Our customers choose K&amp;M for dependable
            products, responsive regional service, and a team
            that understands the needs of clubs, charities,
            and community organizations.
          </p>

          <div className="testimonial-hero-actions">
            <Link
              to="/members"
              className="testimonial-primary-button"
            >
              Browse Products
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              to="/contact"
              className="testimonial-secondary-button"
            >
              Contact Our Team
            </Link>
          </div>
        </header>

        <section
          className="testimonial-highlights"
          aria-label="K and M Sales highlights"
        >
          {highlights.map((highlight) => (
            <div key={highlight.label}>
              <strong>{highlight.value}</strong>
              <span>{highlight.label}</span>
            </div>
          ))}
        </section>

        <section className="testimonial-benefits">
          <div className="testimonial-section-heading">
            <div>
              <p className="testimonial-section-kicker">
                Why customers choose us
              </p>

              <h2>
                Service designed around your organization.
              </h2>
            </div>

            <p>
              From fast local delivery to custom products and
              on-site assistance, we work to make ordering
              and fundraising easier.
            </p>
          </div>

          <div className="testimonials-container">
            {benefits.map((benefit) => (
              <article
                key={benefit.id}
                className={`testimonial-card ${
                  benefit.featured ? 'featured' : ''
                }`}
              >
                <div className="testimonial-card-top">
                  <span className="testimonial-number">
                    {benefit.number}
                  </span>

                  {benefit.featured && (
                    <span className="testimonial-featured-label">
                      Customer favorite
                    </span>
                  )}
                </div>

                <div className="testimonial-card-content">
                  <p className="testimonial-summary">
                    {benefit.summary}
                  </p>

                  <h3>{benefit.title}</h3>
                  <p className="testimonial-description">
                    {benefit.text}
                  </p>
                </div>

                <div
                  className="testimonial-card-line"
                  aria-hidden="true"
                />
              </article>
            ))}
          </div>
        </section>

        <section className="testimonial-service-banner">
          <div className="service-banner-mark">
            <span aria-hidden="true">KM</span>
          </div>

          <div className="service-banner-content">
            <p className="testimonial-section-kicker">
              Personal regional service
            </p>

            <h2>
              Your goals matter to us.
            </h2>

            <p>
              Tell us about your organization, event, or
              fundraising goals. Our team will help you find
              products and services that fit your needs.
            </p>
          </div>

          <Link
            to="/contact"
            className="testimonial-primary-button"
          >
            Start a Conversation
            <span aria-hidden="true">→</span>
          </Link>
        </section>
      </div>
    </main>
  );
};

export default TestimonialPage;