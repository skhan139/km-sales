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
          src="/assets/images/kmicologo.png" 
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
        <li><Link to="/legacy">K&M Legacy</Link></li> {/* Add Legacy Link */}
        <li><Link to="/testimonial">Why K&M?</Link></li> {/* Add Testimonial Link */}
        <li><a href="https://www.kandmsalesdatabase.online/" target="_blank" rel="noopener noreferrer">Admin</a></li> {/* Add Admin Link */}
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