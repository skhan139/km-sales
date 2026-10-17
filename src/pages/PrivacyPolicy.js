import React from 'react';
import '../assets/styles/PolicyPage.css';

const PrivacyPolicy = () => {
  return (
    <main className="policy-page-container">
      <div className="policy-background" aria-hidden="true">
        <span className="policy-orb policy-orb-one" />
        <span className="policy-orb policy-orb-two" />
      </div>

      <article className="policy-page">
        <header className="policy-header">
          <span className="policy-eyebrow">K&amp;M Sales</span>
          <h1>Privacy Policy</h1>
          <p className="policy-effective-date">
            <span>Effective date</span>
            January 16, 2025
          </p>
        </header>

        <div className="policy-introduction">
          <p>
            K&amp;M Sales (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is
            committed to protecting and respecting your privacy. This Privacy
            Policy explains how we collect, use, and share information when you
            visit our website or use our services.
          </p>
        </div>

        <div className="policy-content">
          <section className="policy-section">
            <span className="policy-section-number">01</span>
            <div>
              <h2>Information We Collect</h2>
              <p>
                We may collect the following types of information in connection
                with the services we provide:
              </p>
              <ul>
                <li>
                  <strong>Personal information:</strong> Information that can
                  identify you, such as your name, email address, phone number,
                  and mailing address.
                </li>
                <li>
                  <strong>Usage data:</strong> Information about how you use our
                  website, including your IP address, browser type, pages viewed,
                  and the date and time of your visits.
                </li>
                <li>
                  <strong>Cookies:</strong> Small data files stored on your device
                  that help us understand and improve your website experience.
                </li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <span className="policy-section-number">02</span>
            <div>
              <h2>How We Use Your Information</h2>
              <p>We may use the information we collect to:</p>
              <ul>
                <li>Provide and maintain our services.</li>
                <li>Notify you about changes to our services.</li>
                <li>Provide customer support.</li>
                <li>Analyze and improve our services.</li>
                <li>Monitor the use and performance of our website.</li>
                <li>Detect, prevent, and address technical issues.</li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <span className="policy-section-number">03</span>
            <div>
              <h2>Sharing Your Information</h2>
              <p>
                We do not sell your personal information to third parties. We may
                share information in the following circumstances:
              </p>
              <ul>
                <li>
                  <strong>Service providers:</strong> With companies or individuals
                  that help us operate and provide our services.
                </li>
                <li>
                  <strong>Business transfers:</strong> In connection with a merger,
                  acquisition, reorganization, or sale of assets.
                </li>
                <li>
                  <strong>Legal requirements:</strong> When disclosure is required
                  by law or reasonably necessary to protect our company, customers,
                  or others.
                </li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <span className="policy-section-number">04</span>
            <div>
              <h2>Your Data Protection Rights</h2>
              <p>
                Depending on your location, you may have certain rights concerning
                your personal information, including:
              </p>
              <ul>
                <li>The right to access, update, or delete your information.</li>
                <li>The right to object to or restrict certain processing.</li>
                <li>The right to request data portability.</li>
              </ul>
              <p>
                To exercise an applicable right, contact us at{' '}
                <a href="mailto:kandmsales17@gmail.com">
                  kandmsales17@gmail.com
                </a>.
              </p>
            </div>
          </section>

          <section className="policy-section">
            <span className="policy-section-number">05</span>
            <div>
              <h2>Data Security</h2>
              <p>
                We take reasonable measures to protect personal information from
                loss, theft, misuse, and unauthorized access. However, no internet
                or email transmission can be guaranteed to be completely secure or
                error-free.
              </p>
            </div>
          </section>

          <section className="policy-section">
            <span className="policy-section-number">06</span>
            <div>
              <h2>Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy periodically. Any updates will be
                posted on this page with a revised effective date. We encourage you
                to review this page from time to time.
              </p>
            </div>
          </section>

          <section className="policy-section policy-contact-section">
            <span className="policy-section-number">07</span>
            <div>
              <h2>Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us:
              </p>
              <address className="policy-contact-card">
                <strong>K&amp;M Sales</strong>
                <span>365 Sunset Place</span>
                <span>Keyser, WV 26726</span>
                <a href="mailto:kandmsales17@gmail.com">
                  kandmsales17@gmail.com
                </a>
                <a href="tel:+13047885310">(304) 788-5310</a>
              </address>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
};

export default PrivacyPolicy;
