import React from 'react';
import './ContactPage.css';

const representatives = [
  {
    id: 1,
    initials: 'RE',
    name: 'Rich Everett',
    region: 'Allegany and Garrett Counties',
    phoneDisplay: '(301) 876-0862',
    phoneLink: '+13018760862',
    email: 'everettr627@gmail.com',
  },
  {
    id: 2,
    initials: 'SK',
    name: 'Sami Khan',
    region: 'West Virginia',
    phoneDisplay: '(443) 789-6803',
    phoneLink: '+14437896803',
    email: 'skhan139@icloud.com',
  },
  {
    id: 3,
    initials: 'CR',
    name: 'Craig Rotruck',
    region: 'West Virginia',
    phoneDisplay: '(304) 813-1078',
    phoneLink: '+13048131078',
    email: 'craig.rotruck@gmail.com',
  },
  {
    id: 4,
    initials: 'JH',
    name: 'Jeff Haines',
    region: 'Garrett and Allegany Counties',
    phoneDisplay: '(301) 268-0634',
    phoneLink: '+13012680634',
    email: 'jeff.haines@comcast.net',
    secondaryLink: {
      label: 'Bontay Janitorial Services',
      url: 'https://www.bontay.com',
    },
  },
];

const ContactPage = () => {
  return (
    <main className="contact-page-shell">
      <div className="contact-background-grid" />
      <div className="contact-orb contact-orb--one" />
      <div className="contact-orb contact-orb--two" />

      <div className="contact-page">
        <header className="contact-hero">
          <p className="contact-eyebrow">
            Contact K&amp;M Sales
          </p>

          <h1>
            We’re here to help with
            <span> every order and question.</span>
          </h1>

          <p className="contact-introduction">
            Whether you need product recommendations, help
            placing an order, or information about a custom
            game, our local team is ready to assist.
          </p>

          <div className="contact-hero-actions">
            <a
              href="tel:+13047885310"
              className="contact-primary-button"
            >
              Call Our Office
              <span aria-hidden="true">→</span>
            </a>

            <a
              href="mailto:kandmsales17@gmail.com?subject=K%26M%20Sales%20Inquiry"
              className="contact-secondary-button"
            >
              Send an Email
            </a>
          </div>
        </header>

        <section className="contact-office-section">
          <div className="contact-office-card">
            <div className="contact-office-mark">
              <span>K&amp;M</span>
              <small>Keyser</small>
            </div>

            <div className="contact-office-content">
              <p className="contact-section-kicker">
                Main office
              </p>

              <h2>K&amp;M Keyser Office</h2>

              <address>
                365 Sunset Place
                <br />
                Keyser, WV 26726
              </address>
            </div>

            <div className="contact-office-actions">
              <a href="tel:+13047885310">
                <span className="contact-action-label">
                  Telephone
                </span>

                <strong>(304) 788-5310</strong>
                <span aria-hidden="true">→</span>
              </a>

              <a href="mailto:kandmsales17@gmail.com">
                <span className="contact-action-label">
                  Email
                </span>

                <strong>
                  kandmsales17@gmail.com
                </strong>
                <span aria-hidden="true">→</span>
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=365+Sunset+Place+Keyser+WV+26726"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-action-label">
                  Directions
                </span>

                <strong>Open in Maps</strong>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="contact-team-section">
          <div className="contact-section-heading">
            <div>
              <p className="contact-section-kicker">
                Regional representatives
              </p>

              <h2>
                Connect with someone in your area.
              </h2>
            </div>

            <p>
              Our representatives provide regional product
              support, ordering assistance, and personal
              guidance for clubs and organizations.
            </p>
          </div>

          <div className="contact-team-grid">
            {representatives.map((representative) => (
              <article
                className="contact-person-card"
                key={representative.id}
              >
                <div className="contact-person-heading">
                  <span className="contact-person-avatar">
                    {representative.initials}
                  </span>

                  <span className="contact-person-status">
                    <span />
                    Available to help
                  </span>
                </div>

                <div className="contact-person-copy">
                  <p>Regional representative</p>
                  <h3>{representative.name}</h3>
                  <span>{representative.region}</span>
                </div>

                <div className="contact-person-actions">
                  <a
                    href={`tel:${representative.phoneLink}`}
                  >
                    <span>
                      <small>Call</small>
                      <strong>
                        {representative.phoneDisplay}
                      </strong>
                    </span>

                    <span aria-hidden="true">→</span>
                  </a>

                  <a
                    href={`mailto:${representative.email}`}
                  >
                    <span>
                      <small>Email</small>
                      <strong>
                        {representative.email}
                      </strong>
                    </span>

                    <span aria-hidden="true">→</span>
                  </a>

                  {representative.secondaryLink && (
                    <a
                      href={
                        representative.secondaryLink.url
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-secondary-resource"
                    >
                      <span>
                        <small>
                          Additional service
                        </small>

                        <strong>
                          {
                            representative.secondaryLink
                              .label
                          }
                        </strong>
                      </span>

                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-response-banner">
          <div className="contact-response-icon">
            <span aria-hidden="true">24</span>
            <small>HRS</small>
          </div>

          <div>
            <p className="contact-section-kicker">
              Responsive local service
            </p>

            <h2>
              We’ll help you find the right solution.
            </h2>

            <p>
              Contact our office or a regional
              representative. We’ll respond as quickly as
              possible with the information you need.
            </p>
          </div>

          <a
            href="mailto:kandmsales17@gmail.com?subject=K%26M%20Sales%20Product%20Inquiry"
            className="contact-primary-button"
          >
            Start a Conversation
            <span aria-hidden="true">→</span>
          </a>
        </section>
      </div>
    </main>
  );
};

export default ContactPage;