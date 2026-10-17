import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/PolicyPage.css';

const ShippingPolicy = () => {
  return (
    <main className="policy-page-container">
      <div className="policy-background" aria-hidden="true">
        <span className="policy-orb policy-orb-one" />
        <span className="policy-orb policy-orb-two" />
      </div>

      <article className="policy-page">
        <header className="policy-header">
          <span className="policy-eyebrow">K&amp;M Sales</span>
          <h1>Shipping Policy</h1>
          <p className="policy-effective-date">
            <span>Effective date</span>
            January 1, 2025
          </p>
        </header>

        <div className="policy-introduction">
          <p>
            At K&amp;M Sales, we work to ensure that every order is delivered in
            a timely and efficient manner. The information below explains how we
            process, ship, and track orders.
          </p>
        </div>

        <div className="policy-content">
          <section className="policy-section">
            <span className="policy-section-number">01</span>
            <div>
              <h2>Order Processing</h2>
              <ul>
                <li>
                  Orders are generally processed within{' '}
                  <strong>1–3 business days</strong> after payment and order
                  confirmation.
                </li>
                <li>
                  Orders placed on weekends or holidays will be processed on the
                  following business day.
                </li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <span className="policy-section-number">02</span>
            <div>
              <h2>Shipping Methods</h2>
              <p>Available fulfillment options may include:</p>
              <ul>
                <li>
                  <strong>Standard shipping:</strong> Estimated delivery within
                  5–7 business days.
                </li>
                <li>
                  <strong>Expedited shipping:</strong> Estimated delivery within
                  2–3 business days.
                </li>
                <li>
                  <strong>Local pickup:</strong> Available to customers in Maryland
                  and West Virginia.
                </li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <span className="policy-section-number">03</span>
            <div>
              <h2>Shipping Rates</h2>
              <ul>
                <li>
                  Rates are calculated using the weight, dimensions, and destination
                  of the order.
                </li>
                <li>
                  The applicable shipping cost will be displayed at checkout before
                  you complete your purchase.
                </li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <span className="policy-section-number">04</span>
            <div>
              <h2>Delivery Locations</h2>
              <ul>
                <li>
                  We currently ship to addresses in West Virginia and Maryland.
                </li>
                <li>
                  For orders outside these areas, contact us at{' '}
                  <a href="mailto:kandmsales17@gmail.com">
                    kandmsales17@gmail.com
                  </a>{' '}
                  for assistance.
                </li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <span className="policy-section-number">05</span>
            <div>
              <h2>Order Tracking</h2>
              <p>
                When tracking is available, you will receive a shipping
                confirmation email containing a tracking number. Use that number
                on the carrier&apos;s website to monitor your shipment.
              </p>
            </div>
          </section>

          <section className="policy-section">
            <span className="policy-section-number">06</span>
            <div>
              <h2>Damaged or Lost Shipments</h2>
              <p>
                If an order arrives damaged or appears to have been lost in transit,
                contact us within <strong>7 days</strong> of the delivery date or
                expected delivery date. We will work with the shipping carrier to
                investigate and resolve the issue.
              </p>
            </div>
          </section>

          <section className="policy-section">
            <span className="policy-section-number">07</span>
            <div>
              <h2>Returns and Refunds</h2>
              <p>
                Please review our{' '}
                <Link to="/return-policy" className="return-policy-link">
                  Return Policy
                </Link>{' '}
                for eligibility requirements and instructions for requesting a
                return or refund.
              </p>
            </div>
          </section>

          <section className="policy-section policy-contact-section">
            <span className="policy-section-number">08</span>
            <div>
              <h2>Contact Us</h2>
              <p>Questions about shipping or delivery? Contact our team:</p>
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

export default ShippingPolicy;
