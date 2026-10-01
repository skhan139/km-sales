import React from 'react';
import { Link } from 'react-router-dom';
import './License.css';

const licenses = [
  {
    id: 'wv',
    number: '01',
    jurisdiction: 'West Virginia',
    title: 'Gaming Distribution License',
    image: '/assets/images/wvlicense.jpg',
    expiration: 'June 30, 2027',
  },
  {
    id: 'md',
    number: '02',
    jurisdiction: 'Maryland',
    title: 'Gaming Distribution License',
    image: '/assets/images/alleganylicense.jpg',
    expiration: 'June 30, 2027',
  },
];

const licensingResources = [
  {
    id: 'wv-resources',
    number: '01',
    jurisdiction: 'West Virginia',
    title: 'West Virginia Licensing',
    description:
      'Organizations planning to sell eligible gaming products in West Virginia should review the state’s current bingo and raffle registration requirements before operating.',
    notice:
      'Confirm that your license and registration cover your organization’s activities and location.',
    links: [
      {
        label: 'View Official Form',
        description: 'West Virginia Tax Division PDF',
        url: 'https://tax.wv.gov/Documents/TSD/tsd446.pdf',
      },
      {
        label: 'Open Registration Portal',
        description: 'Bingo and raffle registration',
        url: 'https://tax.wv.gov/Business/BusinessRegistration/BingoAndRaffle/Pages/BusinessRegistrationBingoAndRaffle.aspx',
      },
    ],
  },
  {
    id: 'md-resources',
    number: '02',
    jurisdiction: 'Maryland',
    title: 'Maryland Licensing',
    description:
      'Gaming licenses in Maryland may be administered at the county level. Organizations should verify the requirements for the county where their activities will take place.',
    notice:
      'The information supplied to K&M states that Garrett County does not require a license. Confirm this with the county before operating.',
    links: [
      {
        label: 'Allegany County Gaming Office',
        description: 'County licensing information',
        url: 'https://www.alleganygov.org/202/Gaming-Office',
      },
    ],
  },
];

const LicensePage = () => {
  return (
    <main className="license-page-shell">
      <div className="license-background-grid" />
      <div className="license-orb license-orb--one" />
      <div className="license-orb license-orb--two" />

      <div className="license-page">
        <header className="license-hero">
          <p className="license-eyebrow">
            Compliance and Registration
          </p>

          <h1>
            Licensing information for
            <span> gaming organizations.</span>
          </h1>

          <p className="license-introduction">
            Review K&amp;M’s current distribution documents
            and find official state and county resources for
            bingo, raffle, and gaming registration.
          </p>

          <div className="license-hero-actions">
            <a
              href="#company-licenses"
              className="license-primary-button"
            >
              View Our Licenses
              <span aria-hidden="true">↓</span>
            </a>

            <Link
              to="/contact"
              className="license-secondary-button"
            >
              Ask a Question
            </Link>
          </div>
        </header>

        <aside
          className="license-current-alert"
          role="status"
        >
          <span
            className="license-current-icon"
            aria-hidden="true"
          >
            ✓
          </span>

          <div>
            <strong>Current licensing documents</strong>

            <p>
              K&amp;M’s West Virginia and Maryland
              distribution licenses are current through June
              30, 2027.
            </p>
          </div>
        </aside>

        <section
          className="company-license-section"
          id="company-licenses"
        >
          <div className="license-section-heading">
            <div>
              <p className="license-section-kicker">
                Company documentation
              </p>

              <h2>Our distribution licenses</h2>
            </div>

            <p>
              Select either document to open a larger copy
              in a new browser tab.
            </p>
          </div>

          <div className="company-license-grid">
            {licenses.map((license) => (
              <article
                className="company-license-card"
                key={license.id}
              >
                <div className="license-card-heading">
                  <span className="license-number">
                    {license.number}
                  </span>

                  <span className="license-document-status current">
                    <span />
                    Current
                  </span>
                </div>

                <div className="license-card-copy">
                  <p>{license.jurisdiction}</p>
                  <h3>{license.title}</h3>
                </div>

                <a
                  href={license.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="license-image-link"
                  aria-label={`Open the current ${license.jurisdiction} gaming distribution license`}
                >
                  <img
                    src={license.image}
                    alt={`Current ${license.jurisdiction} gaming distribution license`}
                    className="license-image"
                  />

                  <span className="license-image-overlay">
                    View document
                    <span aria-hidden="true">↗</span>
                  </span>
                </a>

                <div className="license-expiration current">
                  <span>Valid through</span>
                  <strong>{license.expiration}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="license-resources-section">
          <div className="license-section-heading">
            <div>
              <p className="license-section-kicker">
                Official resources
              </p>

              <h2>
                Learn about licensing requirements.
              </h2>
            </div>

            <p>
              Licensing requirements can change. Always use
              current state or county information before
              applying or conducting gaming activities.
            </p>
          </div>

          <div className="license-resource-grid">
            {licensingResources.map((resource) => (
              <article
                className="license-resource-card"
                key={resource.id}
              >
                <div className="resource-card-heading">
                  <span>{resource.number}</span>

                  <div>
                    <p>{resource.jurisdiction}</p>
                    <h3>{resource.title}</h3>
                  </div>
                </div>

                <p className="resource-description">
                  {resource.description}
                </p>

                <div className="resource-notice">
                  <span aria-hidden="true">i</span>
                  <p>{resource.notice}</p>
                </div>

                <div className="license-links">
                  {resource.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>
                        <strong>{link.label}</strong>
                        <small>{link.description}</small>
                      </span>

                      <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="license-disclaimer">
          <div className="license-disclaimer-icon">
            <span aria-hidden="true">i</span>
          </div>

          <div>
            <p className="license-section-kicker">
              Important notice
            </p>

            <h2>
              Confirm requirements before operating.
            </h2>

            <p>
              This page is provided as a general resource
              and is not legal advice. Rules, forms, fees,
              and licensing requirements may change. Contact
              the appropriate government agency for current
              requirements.
            </p>
          </div>

          <Link
            to="/contact"
            className="license-primary-button"
          >
            Contact K&amp;M
            <span aria-hidden="true">→</span>
          </Link>
        </section>
      </div>
    </main>
  );
};

export default LicensePage;