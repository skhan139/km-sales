// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { CartProvider } from './context/CartContext'; // Import CartProvider
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import MembersPage from './pages/MembersPage';
import Cart from './components/Cart';
import CheckoutPage from './pages/CheckoutPage'; // Import CheckoutPage

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <CartProvider> {/* Wrap the application with CartProvider */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/members" element={user ? <MembersPage /> : <Navigate to="/login" />} />
          <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />
          <Route path="/checkout" element={user ? <CheckoutPage /> : <Navigate to="/login" />} /> {/* Add CheckoutPage route */}
          <Route path="/checkout-success" element={user ? <h2>Checkout Successful!</h2> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;