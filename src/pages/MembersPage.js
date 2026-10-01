import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../firebase';
import ProductGallery from '../components/ProductGallery';
import './MembersPage.css';

const INVENTORY_SHEET_URL =
  'https://docs.google.com/document/d/1q-EhU-s9IAyRn8amNAHuDYz4tMU66lA5zmUw4X1gsC4/edit?tab=t.0';

const MembersPage = () => {
  const [user, loading] = useAuthState(auth);
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) {
    return (
      <main className="members-page-container members-loading">
        <div
          className="members-loading-spinner"
          aria-hidden="true"
        />

        <p>Loading the product catalog…</p>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <main className="members-page-container">
      <div className="members-background-grid" />
      <div className="members-orb members-orb--one" />
      <div className="members-orb members-orb--two" />

      <header className="members-hero">
        <p className="members-eyebrow">
          K&amp;M Product Catalog
        </p>

        <h1 className="members-title">
          Browse our complete
          <span> product gallery.</span>
        </h1>

        <p className="members-introduction">
          Search our selection of games, tickets, and gaming
          supplies. Add the products you need and our team
          will follow up with availability and personalized
          pricing.
        </p>

        <div className="members-meta-row">
          <span>
            <span className="members-meta-dot" />
            Member access
          </span>

          <span>500+ available products</span>
          <span>Personalized quotes</span>
        </div>
      </header>

      <section
        className="members-notices"
        aria-label="Important ordering information"
      >
        <article className="members-notice">
          <span
            className="members-notice-icon"
            aria-hidden="true"
          >
            01
          </span>

          <div>
            <h2>Stock and fulfillment</h2>
            <p>
              Some orders may take longer to fulfill
              depending on current product availability.
            </p>
          </div>
        </article>

        <article className="members-notice">
          <span
            className="members-notice-icon"
            aria-hidden="true"
          >
            02
          </span>

          <div>
            <h2>Pricing information</h2>
            <p>
              Prices, profits, take-ins, and payouts may vary
              depending on whether you order a full case or
              individual games.
            </p>
          </div>
        </article>

        <a
          className="members-inventory-card"
          href={INVENTORY_SHEET_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span
            className="members-sheet-icon"
            aria-hidden="true"
          >
            ↓
          </span>

          <span>
            <strong>Full inventory sheet</strong>
            <small>
              View or download the complete product list
            </small>
          </span>

          <span
            className="members-sheet-arrow"
            aria-hidden="true"
          >
            ↗
          </span>
        </a>
      </section>

      <section className="members-catalog">
        <div className="members-catalog-header">
          <div>
            <p className="members-section-kicker">
              Product library
            </p>

            <h2>Find what you’re looking for</h2>
          </div>

          <p>
            Search by product name, tag, or category.
          </p>
        </div>

        <div
          className={`members-search-wrapper ${
            searchTerm ? 'has-value' : ''
          }`}
        >
          <span
            className="members-search-icon"
            aria-hidden="true"
          />

          <input
            type="search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="members-search-input"
            placeholder="Search products, tags, or categories"
            aria-label="Search the product catalog"
          />

          {searchTerm && (
            <button
              type="button"
              className="members-search-clear"
              onClick={clearSearch}
              aria-label="Clear product search"
            >
              ×
            </button>
          )}
        </div>

        {searchTerm && (
          <p className="members-search-status" role="status">
            Showing results for “{searchTerm.trim()}”
          </p>
        )}

        <div className="members-gallery-wrapper">
          <ProductGallery searchTerm={searchTerm} />
        </div>
      </section>
    </main>
  );
};

export default MembersPage;