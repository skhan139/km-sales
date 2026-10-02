import React from 'react';
import './Rewards.css';

const rewardFeatures = [
  {
    number: '01',
    title: 'How It Works',
    description:
      'Earn points for every dollar spent. Redeem your balance for discounts, free items, and exclusive offers—the more you shop, the more you save.',
  },
  {
    number: '02',
    title: 'Exclusive Rewards',
    description:
      'Unlock member-only benefits, including free products, early access to new arrivals, and special promotions.',
  },
  {
    number: '03',
    title: 'Sign Up Today',
    description:
      'Joining is easy and free. Create an online account—or sign in to your existing account—to begin earning points.',
  },
  {
    number: '04',
    title: 'Track Your Points',
    description:
      'Follow your points and available rewards from your account dashboard, then redeem them whenever you are ready.',
  },
  {
    number: '05',
    title: 'Refer a Friend',
    description:
      'Introduce a friend to K&M Sales and earn bonus points after their first qualifying purchase.',
  },
  {
    number: '06',
    title: 'Contact Us',
    description:
      'Have a question about points or redemptions? Our team is ready to help you get the most from your rewards.',
  },
];

const RewardsPage = () => {
  return (
    <main className="rewards-page-shell">
      <div className="rewards-page">
        <header className="rewards-hero">
          <p className="rewards-eyebrow">K&M customer rewards</p>
          <h1>Every purchase should give something back.</h1>
          <p className="rewards-hero-copy">
            Earn points as you shop and turn them into meaningful savings,
            complimentary products, and offers reserved for our members.
          </p>

          <div className="rewards-actions">
            <a
              className="rewards-primary-link"
              href="https://docs.google.com/document/d/1dc2rQ2FOHAb2csD-JAiol94XxVQRu-AnkYlx8c-Ac08/edit?tab=t.0"
              target="_blank"
              rel="noopener noreferrer"
            >
              View the points system
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </header>

        <aside className="rewards-eligibility" aria-label="Rewards eligibility">
          <span className="rewards-eligibility-icon" aria-hidden="true">
            ✓
          </span>
          <div>
            <strong>Online account required</strong>
            <p>
              Customers must have an online K&M Sales account to participate in
              the points program and track available rewards.
            </p>
          </div>
        </aside>

        <section className="rewards-overview" aria-labelledby="rewards-overview-heading">
          <div className="rewards-section-heading">
            <div>
              <p>Member benefits</p>
              <h2 id="rewards-overview-heading">More value at every step</h2>
            </div>
            <p>
              Designed for long-time partners and new customers alike, the K&M
              Rewards Program makes every qualifying purchase more rewarding.
            </p>
          </div>

          <div className="rewards-grid">
            {rewardFeatures.map((feature) => (
              <article key={feature.number} className="rewards-card">
                <span className="rewards-card-number" aria-hidden="true">
                  {feature.number}
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rewards-footer-cta" aria-labelledby="rewards-cta-heading">
          <div>
            <p>Ready when you are</p>
            <h2 id="rewards-cta-heading">Start earning with your next purchase.</h2>
          </div>
          <a
            href="https://docs.google.com/document/d/1dc2rQ2FOHAb2csD-JAiol94XxVQRu-AnkYlx8c-Ac08/edit?tab=t.0"
            target="_blank"
            rel="noopener noreferrer"
          >
            Review program details
          </a>
        </section>
      </div>
    </main>
  );
};

export default RewardsPage;
