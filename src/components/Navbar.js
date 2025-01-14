// src/components/Navbar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useCart } from '../context/CartContext';
import '../assets/styles/Navbar.css';

const Navbar = () => {
  const [user] = useAuthState(auth);
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <img 
          src="/assets/images/km.jpeg" 
          alt="K&M Sales Logo" 
          className="logo" 
        />
      </Link>
      <button className="toggle-button" onClick={toggleNavbar}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {user ? (
          <>
            <li><Link to="/members">Products</Link></li>
            <li>
              <Link to="/cart">
                <span className="cart-icon" data-count={cart ? cart.length : 0}>
                  Cart
                </span>
              </Link>
            </li>
            <li>
              <button className="nav-button" onClick={() => auth.signOut()}>Sign Out</button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;