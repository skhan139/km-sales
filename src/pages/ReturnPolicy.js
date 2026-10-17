import React from 'react';
import '../assets/styles/PolicyPage.css';

const ReturnPolicy = () => {
  return (
    <main className="policy-page-container">
      <div className="policy-background" aria-hidden="true">
        <span className="policy-orb policy-orb-one" />
        <span className="policy-orb policy-orb-two" />
      </div>

      <article className="policy-page">
        <header className="policy-header">
          <span className="policy-eyebrow">K&amp;M Sales</span>
          <h1>Return Policy</h1>
          <p className="policy-effective-date">
            <span>Return window</span>
            30 days after delivery
          </p>
        </header>

        <div className="policy-introduction">
          <p>
            We want you to be satisfied with your purchase. You have 30 days
            after receiving an item to request an eligible return.
          </p>
        </div>

        <div className="policy-content">
          <section className="policy-section">
            <span className="policy-section-number">01</span>
            <div>
              <h2>Return Eligibility</h2>
              <p>To qualify for a return, your item must be:</p>
              <ul>
                <li>In the same condition in which you received it.</li>
                <li>Unworn or unused, with any original tags attached.</li>
                <li>In its original packaging.</li>
                <li>Accompanied by a receipt or other proof of purchase.</li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <span className="policy-section-number">02</span>
            <div>
              <h2>Starting a Return</h2>
              <p>
                Contact us at{' '}
                <a href="mailto:kandmsales17@gmail.com">
                  kandmsales17@gmail.com
                </a>{' '}
                before returning an item. Approved returns should be sent to:
              </p>
              <address className="policy-contact-card">
                <strong>K&amp;M Sales</strong>
                <span>365 Sunset Place</span>
                <span>Keyser, WV 26726</span>
              </address>
              <p>
                If your return is accepted, we will provide a return shipping
                label and instructions explaining how and where to send the
                package. Items returned without first requesting authorization
                will not be accepted.
              </p>
            </div>
          </section>

          <section className="policy-section">
            <span className="policy-section-number">03</span>
            <div>
              <h2>Damages and Order Issues</h2>
              <p>
                Please inspect your order when it arrives. Contact us immediately
                if an item is defective or damaged, or if you receive the wrong
                item, so we can evaluate the issue and make it right.
              </p>
            </div>
          </section>

          <section className="policy-section">
            <span className="policy-section-number">04</span>
            <div>
              <h2>Exceptions and Non-returnable Items</h2>
              <p>Certain items cannot be returned, including:</p>
              <ul>
                <li>Perishable goods, such as food, flowers, or plants.</li>
                <li>Custom, special-order, or personalized products.</li>
                <li>Personal-care goods.</li>
                <li>Hazardous materials, flammable liquids, or gases.</li>
                <li>Sale items and gift cards.</li>
              </ul>
              <p>
                Please contact us if you have questions about whether a specific
                item is eligible for return.
              </p>
            </div>
          </section>

          <section className="policy-section">
            <span className="policy-section-number">05</span>
            <div>
              <h2>Exchanges</h2>
              <p>
                The fastest way to receive the item you want is to return the item
                you currently have. Once that return is accepted, place a separate
                order for the replacement item.
              </p>
            </div>
          </section>

          <section className="policy-section">
            <span className="policy-section-number">06</span>
            <div>
              <h2>European Union Cooling-off Period</h2>
              <p>
                If merchandise is shipped into the European Union, you may cancel
                or return your order within 14 days for any reason and without
                justification. The item must be unworn or unused, in its original
                condition and packaging, with tags and proof of purchase.
              </p>
            </div>
          </section>

          <section className="policy-section">
            <span className="policy-section-number">07</span>
            <div>
              <h2>Refunds</h2>
              <p>
                We will notify you after receiving and inspecting your return. If
                approved, the refund will be issued automatically to your original
                payment method within 10 business days. Your bank or card provider
                may require additional processing time before the refund appears.
              </p>
              <p>
                If more than 15 business days have passed since your return was
                approved, contact us at{' '}
                <a href="mailto:kandmsales17@gmail.com">
                  kandmsales17@gmail.com
                </a>.
              </p>
            </div>
          </section>

          <section className="policy-section policy-contact-section">
            <span className="policy-section-number">08</span>
            <div>
              <h2>Return Questions</h2>
              <p>We are happy to help with questions about your return.</p>
              <address className="policy-contact-card">
                <strong>K&amp;M Sales</strong>
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

export default ReturnPolicy;
