import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Navbar.css'; // Ensure this path is correct


const Navbar = () => {
  return (
    <nav className="navbar">
      <img 
        src="/assets/images/km.jpeg" 
        alt="K&M Sales Logo" 
        className="logo" 
        style={{ width: '150px', height: '100px' }} 
      />
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;