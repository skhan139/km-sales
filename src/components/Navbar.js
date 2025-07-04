import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useCart } from '../context/CartContext';
import products from '../data/Products'; // Import the products data
import ProductModal from './ProductModal'; // Import the ProductModal component
import '../assets/styles/Navbar.css';

const Navbar = () => {
  const [user] = useAuthState(auth);
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsSearchOpen(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" onClick={closeNavbar}>
        <img 
          src="/assets/images/kmicologo.png" 
          alt="K&M Sales Logo" 
          className="logo" 
        />
      </Link>
      {user && (
        <button className="search-icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
          {isSearchOpen ? 'Close Search' : 'Game Search'}
          {!isSearchOpen && <img src="/assets/images/magnifying-glass.png" alt="Search" />}
        </button>
      )}
      {isSearchOpen ? (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a game..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="search-results">
            {searchResults.map(product => (
              <div key={product.id} className="search-result" onClick={() => handleProductClick(product)}>
                <img 
                  src={product.images ? product.images[0] : product.image} // Use the first image if multiple images exist
                  alt={product.name} 
                  className="search-result-image" 
                />
                <span>{product.name}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <button className="toggle-button" onClick={toggleNavbar}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
          <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
            <li>
              <Link to="/" onClick={closeNavbar}>
                <i className="fa fa-home" aria-hidden="true"></i> Home
              </Link>
            </li>
            <li className="dropdown">
              <li className="dropdown-button">Info</li>
              <ul className="dropdown-content">
                <li>
                  <Link to="/about" onClick={closeNavbar}>
                    <i className="fa fa-info-circle" aria-hidden="true"></i> About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" onClick={closeNavbar}>
                    <i className="fa fa-envelope" aria-hidden="true"></i> Contact
                  </Link>
                </li>
                <li>
                  <Link to="/legacy" onClick={closeNavbar}>
                    <i className="fa fa-bullseye" aria-hidden="true"></i> Our Mission
                  </Link>
                </li>
                <li>
                  <Link to="/testimonial" onClick={closeNavbar}>
                    <i className="fa fa-star" aria-hidden="true"></i> Why K&M?
                  </Link>
                </li>
                <li>
                  <Link to="/event-inspiration" onClick={closeNavbar}>
                    <i className="fa fa-lightbulb" aria-hidden="true"></i> Event Inspiration
                  </Link>
                </li>
                <li>
                  <Link to="/game-terminology" onClick={closeNavbar}>
                    <i className="fa fa-book" aria-hidden="true"></i> Game Terminology
                  </Link>
                </li>
                <li>
                  <Link to="/license" onClick={closeNavbar}>
                    <i className="fa fa-id-card" aria-hidden="true"></i> License
                  </Link>
                </li>
                <li>
                  <Link to="/rewards" onClick={closeNavbar}>
                    <i className="fa fa-gift" aria-hidden="true"></i> Rewards
                  </Link>
                </li>
                <li>
                  <a href="https://www.kandmbuzzboard.com/" target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-bolt" aria-hidden="true"></i> Buzz Board
                  </a>
                </li>
              </ul>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="/members" onClick={closeNavbar}>
                    <i className="fa fa-th" aria-hidden="true"></i> Products
                  </Link>
                </li>
                <li>
                  <Link to="/profile" onClick={closeNavbar}>
                    <i className="fa fa-user" aria-hidden="true"></i> My Profile
                  </Link>
                </li>
                <li>
                  <Link to="/cart" onClick={closeNavbar}>
                    <span className="cart-icon" data-count={cart ? cart.length : 0}>
                      <i className="fa fa-shopping-cart" aria-hidden="true"></i> Cart
                    </span>
                  </Link>
                </li>
                <li>
                  <button className="nav-button" onClick={() => { auth.signOut(); closeNavbar(); }}>Sign Out</button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" onClick={closeNavbar}>Login</Link></li>
                <li><Link to="/signup" onClick={closeNavbar}>Signup</Link></li>
              </>
            )}
          </ul>
        </>
      )}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </nav>
  );
};

export default Navbar;