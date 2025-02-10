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

  const closeNavbar = () => {
    setIsOpen(false);
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
      <button className="toggle-button" onClick={toggleNavbar}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={closeNavbar}>Home</Link></li>
        <li><Link to="/about" onClick={closeNavbar}>About</Link></li>
        <li><Link to="/contact" onClick={closeNavbar}>Contact</Link></li>
        <li><Link to="/legacy" onClick={closeNavbar}>K&M Legacy</Link></li> {/* Add Legacy Link */}
        <li><Link to="/testimonial" onClick={closeNavbar}>Why K&M?</Link></li> {/* Add Testimonial Link */}
        <li><a href="https://www.kandmsalesdatabase.online/" target="_blank" rel="noopener noreferrer" onClick={closeNavbar}>Admin</a></li> {/* Add Admin Link */}
        {user ? (
          <>
            <li><Link to="/members" onClick={closeNavbar}>Products</Link></li>
            <li>
              <Link to="/cart" onClick={closeNavbar}>
                <span className="cart-icon" data-count={cart ? cart.length : 0}>
                  Cart
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
    </nav>
  );
};

export default Navbar;