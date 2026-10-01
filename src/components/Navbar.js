import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

import { auth } from '../firebase';
import { useCart } from '../context/CartContext';
import products from '../data/Products';
import ProductModal from './ProductModal';
import '../assets/styles/Navbar.css';

const informationLinks = [
  {
    label: 'About',
    description: 'Learn about K&M Sales',
    route: '/about',
  },
  {
    label: 'Contact',
    description: 'Get in touch with our team',
    route: '/contact',
  },
  {
    label: 'Our Mission',
    description: 'What drives our company',
    route: '/legacy',
  },
  {
    label: 'Why K&M?',
    description: 'Hear from our customers',
    route: '/testimonial',
  },
  {
    label: 'Event Inspiration',
    description: 'Ideas for your next event',
    route: '/event-inspiration',
  },
  {
    label: 'Game Terminology',
    description: 'Learn common industry terms',
    route: '/game-terminology',
  },
  {
    label: 'Licensing',
    description: 'Review licensing information',
    route: '/license',
  },
  {
    label: 'Rewards',
    description: 'Explore member rewards',
    route: '/rewards',
  },
];

const Navbar = () => {
  const [user] = useAuthState(auth);
  const { cart = [] } = useCart();

  const [isOpen, setIsOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] =
    useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] =
    useState(null);
  const [isSigningOut, setIsSigningOut] =
    useState(false);

  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => {
      const quantity = Number(item.quantity);

      return total + (
        Number.isFinite(quantity) && quantity > 0
          ? quantity
          : 1
      );
    }, 0);
  }, [cart]);

  const searchResults = useMemo(() => {
    const normalizedSearch = searchTerm
      .trim()
      .toLowerCase();

    if (!normalizedSearch) {
      return [];
    }

    return products
      .filter((product) => {
        const productName = String(
          product.name || ''
        ).toLowerCase();

        const category = String(
          product.category || ''
        ).toLowerCase();

        const tags = Array.isArray(product.tags)
          ? product.tags.map((tag) =>
              String(tag).toLowerCase()
            )
          : [];

        return (
          productName.includes(normalizedSearch) ||
          category.includes(normalizedSearch) ||
          tags.some((tag) =>
            tag.includes(normalizedSearch)
          )
        );
      })
      .slice(0, 8);
  }, [searchTerm]);

  useEffect(() => {
    setIsOpen(false);
    setIsInfoOpen(false);
    setIsSearchOpen(false);
    setSearchTerm('');
  }, [location.pathname]);

  useEffect(() => {
    if (isSearchOpen) {
      window.requestAnimationFrame(() => {
        searchInputRef.current?.focus();
      });
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key !== 'Escape') {
        return;
      }

      if (selectedProduct) {
        setSelectedProduct(null);
      } else if (isSearchOpen) {
        closeSearch();
      } else if (isOpen) {
        setIsOpen(false);
      } else {
        setIsInfoOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener(
        'keydown',
        handleEscape
      );
    };
  }, [
    isOpen,
    isSearchOpen,
    selectedProduct,
  ]);

  const closeNavbar = () => {
    setIsOpen(false);
    setIsInfoOpen(false);
  };

  const openSearch = () => {
    closeNavbar();
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchTerm('');
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    closeSearch();
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      await signOut(auth);
      closeNavbar();
      navigate('/');
    } catch (error) {
      console.error('Unable to sign out:', error);
    } finally {
      setIsSigningOut(false);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `site-navbar-link${isActive ? ' active' : ''}`;

  const infoRouteIsActive =
    informationLinks.some(({ route }) =>
      location.pathname.startsWith(route)
    );

  return (
    <>
      <nav
        className="site-navbar"
        aria-label="Main navigation"
      >
        <div className="site-navbar-inner">
          <Link
            to="/"
            className="site-navbar-brand"
            aria-label="K and M Sales home"
            onClick={closeNavbar}
          >
            <img
              src="/assets/images/kmicologo.png"
              alt="K&M Sales"
              className="site-navbar-logo"
            />

            <span className="site-navbar-brand-copy">
              <strong>K&amp;M Sales</strong>
              <small>Gaming supplies</small>
            </span>
          </Link>

          <div className="site-navbar-desktop">
            <ul className="site-navbar-links">
              <li>
                <NavLink
                  to="/"
                  end
                  className={navLinkClass}
                >
                  Home
                </NavLink>
              </li>

              <li
                className={`site-navbar-dropdown ${
                  isInfoOpen ? 'open' : ''
                }`}
              >
                <button
                  type="button"
                  className={`site-navbar-link site-navbar-dropdown-button ${
                    infoRouteIsActive ? 'active' : ''
                  }`}
                  aria-expanded={isInfoOpen}
                  aria-controls="information-menu"
                  onClick={() =>
                    setIsInfoOpen(
                      (currentValue) => !currentValue
                    )
                  }
                >
                  Information

                  <span
                    className="site-navbar-chevron"
                    aria-hidden="true"
                  />
                </button>

                <div
                  id="information-menu"
                  className="site-navbar-dropdown-menu"
                >
                  <div className="dropdown-menu-heading">
                    <span>Explore K&amp;M</span>
                    <small>
                      Company information and resources
                    </small>
                  </div>

                  <div className="dropdown-menu-links">
                    {informationLinks.map((item) => (
                      <NavLink
                        key={item.route}
                        to={item.route}
                        className={navLinkClass}
                        onClick={closeNavbar}
                      >
                        <span>
                          <strong>{item.label}</strong>
                          <small>
                            {item.description}
                          </small>
                        </span>

                        <span aria-hidden="true">→</span>
                      </NavLink>
                    ))}
                  </div>

                  <a
                    href="https://www.kandmbuzzboard.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-navbar-external-link"
                    onClick={closeNavbar}
                  >
                    <span>
                      <strong>Buzz Board</strong>
                      <small>Open the Buzz Board website</small>
                    </span>

                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </li>

              {user && (
                <>
                  <li>
                    <NavLink
                      to="/members"
                      className={navLinkClass}
                    >
                      Products
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/profile"
                      className={navLinkClass}
                    >
                      My Profile
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="site-navbar-actions">
            {user && (
              <button
                type="button"
                className="site-navbar-search-button"
                onClick={openSearch}
                aria-label="Search products"
              >
                <span
                  className="navbar-search-symbol"
                  aria-hidden="true"
                />

                <span className="search-button-label">
                  Search
                </span>
              </button>
            )}

            {user && (
              <NavLink
                to="/cart"
                className="site-navbar-cart"
                aria-label={`Cart with ${cartCount} items`}
              >
                <span
                  className="navbar-cart-symbol"
                  aria-hidden="true"
                >
                  ♧
                </span>

                <span className="cart-label">Cart</span>

                {cartCount > 0 && (
                  <span className="cart-count">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </NavLink>
            )}

            {!user && (
              <Link
                to="/login"
                className="site-navbar-login"
              >
                Sign in
              </Link>
            )}

            <button
              type="button"
              className={`site-navbar-toggle ${
                isOpen ? 'active' : ''
              }`}
              onClick={() =>
                setIsOpen(
                  (currentValue) => !currentValue
                )
              }
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label={
                isOpen
                  ? 'Close navigation menu'
                  : 'Open navigation menu'
              }
            >
              <span />
              <span />
              <span />
            </button>
          </div>

          <aside
            id="mobile-navigation"
            className={`site-navbar-mobile ${
              isOpen ? 'active' : ''
            }`}
            aria-hidden={!isOpen}
          >
            <div className="mobile-navigation-heading">
              <div>
                <p>Navigation</p>
                <h2>K&amp;M Sales</h2>
              </div>
            </div>

            <ul>
              <li>
                <NavLink
                  to="/"
                  end
                  className={navLinkClass}
                  onClick={closeNavbar}
                >
                  Home
                </NavLink>
              </li>

              {user && (
                <>
                  <li>
                    <NavLink
                      to="/members"
                      className={navLinkClass}
                      onClick={closeNavbar}
                    >
                      Products
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/profile"
                      className={navLinkClass}
                      onClick={closeNavbar}
                    >
                      My Profile
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/cart"
                      className={navLinkClass}
                      onClick={closeNavbar}
                    >
                      <span>Cart</span>
                      <span className="mobile-cart-count">
                        {cartCount}
                      </span>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

            <details className="mobile-info-menu">
              <summary>Information</summary>

              <div>
                {informationLinks.map((item) => (
                  <NavLink
                    key={item.route}
                    to={item.route}
                    className={navLinkClass}
                    onClick={closeNavbar}
                  >
                    {item.label}
                  </NavLink>
                ))}

                <a
                  href="https://www.kandmbuzzboard.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-navbar-link"
                  onClick={closeNavbar}
                >
                  Buzz Board
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </details>

            <div className="mobile-account-actions">
              {user ? (
                <button
                  type="button"
                  className="mobile-signout-button"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                >
                  {isSigningOut
                    ? 'Signing out…'
                    : 'Sign out'}
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="mobile-login-button"
                    onClick={closeNavbar}
                  >
                    Sign in
                  </Link>

                  <Link
                    to="/signup"
                    className="mobile-signup-button"
                    onClick={closeNavbar}
                  >
                    Create an account
                  </Link>
                </>
              )}
            </div>
          </aside>
        </div>
      </nav>

      {isOpen && (
        <button
          type="button"
          className="site-navbar-mobile-overlay"
          aria-label="Close navigation menu"
          onClick={closeNavbar}
        />
      )}

      {isSearchOpen && (
        <div
          className="navbar-search-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeSearch();
            }
          }}
        >
          <section
            className="navbar-search-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="navbar-search-title"
          >
            <div className="navbar-search-heading">
              <div>
                <p>Product catalog</p>
                <h2 id="navbar-search-title">
                  Search for a game
                </h2>
              </div>

              <button
                type="button"
                onClick={closeSearch}
                aria-label="Close product search"
              >
                ×
              </button>
            </div>

            <div className="navbar-search-field">
              <span
                className="navbar-search-symbol"
                aria-hidden="true"
              />

              <input
                ref={searchInputRef}
                type="search"
                placeholder="Search by name, category, or tag"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                aria-label="Search products"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear product search"
                >
                  Clear
                </button>
              )}
            </div>

            <div
              className="navbar-search-results"
              aria-live="polite"
            >
              {!searchTerm.trim() && (
                <div className="navbar-search-empty">
                  <span aria-hidden="true">⌕</span>
                  <p>
                    Start typing to search the K&amp;M
                    product catalog.
                  </p>
                </div>
              )}

              {searchTerm.trim() &&
                searchResults.length === 0 && (
                  <div className="navbar-search-empty">
                    <span aria-hidden="true">?</span>
                    <p>
                      No products match “
                      {searchTerm.trim()}”.
                    </p>
                  </div>
                )}

              {searchResults.map((product) => (
                <button
                  type="button"
                  key={product.id}
                  className="navbar-search-result"
                  onClick={() =>
                    handleProductClick(product)
                  }
                >
                  <img
                    src={
                      product.images?.[0] ||
                      product.image
                    }
                    alt=""
                  />

                  <span>
                    <strong>{product.name}</strong>
                    <small>
                      {product.category ||
                        'K&M product'}
                    </small>
                  </span>

                  <span aria-hidden="true">→</span>
                </button>
              ))}
            </div>

            {searchResults.length > 0 && (
              <Link
                to="/members"
                className="navbar-view-all"
                onClick={closeSearch}
              >
                View the complete product catalog
                <span aria-hidden="true">→</span>
              </Link>
            )}
          </section>
        </div>
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
};

export default Navbar;