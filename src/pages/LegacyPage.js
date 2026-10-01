import React from 'react';
import { Link } from 'react-router-dom';
import './LegacyPage.css';

const legacyMilestones = [
  {
    number: '01',
    period: 'The Beginning',
    title: 'A business built in a garage',
    description:
      'More than 40 years ago, Roy “Buzz” Mills started K&M Sales as a small garage operation. The company was built on hard work, honest relationships, and a commitment to personally serving every customer.',
  },
  {
    number: '02',
    period: 'Building Trust',
    title: 'A reputation for dependable service',
    description:
      'Buzz worked tirelessly to fulfill orders and ensure every customer was satisfied. That dedication helped K&M earn a reputation for reliability throughout Allegany County and West Virginia.',
  },
  {
    number: '03',
    period: 'Growing Together',
    title: 'A team united by shared values',
    description:
      'As the business grew, Buzz surrounded himself with people who shared his values and passion for excellence. Together, they transformed a small local operation into a thriving regional company.',
  },
  {
    number: '04',
    period: 'Moving Forward',
    title: 'Adapting without losing our foundation',
    description:
      'K&M expanded its products, embraced new technology, and reached new customers. Through every change, the company remained grounded in integrity, service, and respect for its customers.',
  },
];

const companyValues = [
  {
    title: 'Hard Work',
    description:
      'Approach every order and customer need with care, focus, and urgency.',
  },
  {
    title: 'Honesty',
    description:
      'Build lasting customer relationships through trust and transparency.',
  },
  {
    title: 'Personal Service',
    description:
      'Treat every organization as a valued partner, not simply another order.',
  },
];

const LegacyPage = () => {
  return (
    <main className="legacy-page-shell">
      <div className="legacy-background-grid" />
      <div className="legacy-orb legacy-orb--one" />
      <div className="legacy-orb legacy-orb--two" />

      <div className="legacy-page">
        <section className="legacy-hero">
          <div className="legacy-hero-copy">
            <p className="legacy-eyebrow">
              Our Founder
            </p>

            <h1>
              The legacy of
              <span> Roy “Buzz” Mills.</span>
            </h1>

            <p className="legacy-lead">
              A story of hard work, honest relationships, and
              more than four decades of commitment to the
              customers and communities K&amp;M Sales serves.
            </p>

            <div className="legacy-hero-actions">
              <Link
                to="/about"
                className="legacy-primary-button"
              >
                About K&amp;M
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                to="/contact"
                className="legacy-secondary-button"
              >
                Contact Our Team
              </Link>
            </div>

            <div className="legacy-hero-details">
              <div>
                <strong>40+</strong>
                <span>Years of Service</span>
              </div>

              <div>
                <strong>Local</strong>
                <span>Family Values</span>
              </div>

              <div>
                <strong>Trusted</strong>
                <span>Regional Partner</span>
              </div>
            </div>
          </div>

          <figure className="legacy-founder-figure">
            <div className="legacy-founder-image">
              <img
                src="/assets/images/buzz.jpg"
                alt="Roy “Buzz” Mills, founder of K&M Sales"
              />

              <div className="legacy-image-shade" />

              <span className="legacy-image-label">
                Founder of K&amp;M Sales
              </span>
            </div>

            <figcaption>
              <span className="legacy-founder-mark">
                RM
              </span>

              <span>
                <strong>Roy “Buzz” Mills</strong>
                <small>
                  A legacy of service and integrity
                </small>
              </span>
            </figcaption>
          </figure>
        </section>

        <section className="legacy-introduction">
          <div className="legacy-introduction-heading">
            <p className="legacy-section-kicker">
              The vision
            </p>

            <h2>
              Great companies begin with a clear set of
              values.
            </h2>
          </div>

          <div className="legacy-introduction-copy">
            <p>
              Over 40 years ago, Buzz Mills had a vision to
              build a company founded on hard work, honest
              relationships, and a commitment to customer
              service.
            </p>

            <p>
              What began as a small business in his garage
              grew to serve hundreds of customers throughout
              the region. Buzz’s determination and personal
              approach established the standards that still
              guide K&amp;M Sales today.
            </p>
          </div>
        </section>

        <section className="legacy-timeline-section">
          <div className="legacy-section-heading">
            <div>
              <p className="legacy-section-kicker">
                Our journey
              </p>

              <h2>
                From a garage to a trusted regional company.
              </h2>
            </div>

            <p>
              Each chapter of K&amp;M’s history reflects the
              work, perseverance, and customer-first mindset
              that Buzz brought to the company.
            </p>
          </div>

          <div className="legacy-timeline">
            {legacyMilestones.map((milestone) => (
              <article
                className="legacy-milestone"
                key={milestone.number}
              >
                <div className="legacy-timeline-marker">
                  <span>{milestone.number}</span>
                </div>

                <div className="legacy-milestone-card">
                  <p>{milestone.period}</p>
                  <h3>{milestone.title}</h3>
                  <span>{milestone.description}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="legacy-values-section">
          <div className="legacy-section-heading">
            <div>
              <p className="legacy-section-kicker">
                Values that endure
              </p>

              <h2>
                The principles behind every customer
                interaction.
              </h2>
            </div>

            <p>
              Markets and technology may change, but the
              foundation Buzz established remains at the
              center of K&amp;M Sales.
            </p>
          </div>

          <div className="legacy-values-grid">
            {companyValues.map((value, index) => (
              <article
                className="legacy-value-card"
                key={value.title}
              >
                <span>
                  {String(index + 1).padStart(2, '0')}
                </span>

                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="legacy-today-section">
          <div className="legacy-today-copy">
            <p className="legacy-section-kicker">
              The legacy continues
            </p>

            <h2>
              Honoring the past while building the future.
            </h2>

            <p>
              Today, the legacy of Roy “Buzz” Mills lives on
              through K&amp;M’s dedication to dependable
              products and exceptional service. Every order
              delivered and every customer interaction
              reflects the principles he held dear.
            </p>

            <p>
              As we look to the future, we remain committed
              to the standards Buzz established and to the
              tradition of excellence that has defined
              K&amp;M Sales for more than four decades.
            </p>
          </div>

          <figure className="legacy-signature-card">
            <div className="legacy-signature-image">
              <img
                src="/assets/images/buzzsignature.jpg"
                alt="Signature of Roy “Buzz” Mills"
              />
            </div>

            <figcaption>
              <span>Our Founder</span>
              <strong>Roy “Buzz” Mills</strong>
            </figcaption>
          </figure>
        </section>

        <section className="legacy-cta">
          <div>
            <p className="legacy-section-kicker">
              Continue the story
            </p>

            <h2>
              Experience the service behind the K&amp;M
              name.
            </h2>

            <p>
              Browse our products or connect with our team
              for personal assistance.
            </p>
          </div>

          <div className="legacy-cta-actions">
            <Link
              to="/members"
              className="legacy-primary-button"
            >
              Browse Products
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              to="/contact"
              className="legacy-secondary-button"
            >
              Contact K&amp;M
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LegacyPage;