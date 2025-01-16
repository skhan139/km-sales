import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import MembersPage from './pages/MembersPage';
import Cart from './components/Cart';
import CheckoutPage from './pages/CheckoutPage';
import LegacyPage from './pages/LegacyPage'; // Import LegacyPage
import TestimonialPage from './pages/TestimonialPage'; // Import TestimonialPage
import PrivacyPolicy from './pages/PrivacyPolicy'; // Import PrivacyPolicy
import ReturnPolicy from './pages/ReturnPolicy'; // Import ReturnPolicy
import ShippingPolicy from './pages/ShippingPolicy'; // Import ShippingPolicy
import Footer from './components/Footer';

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <CartProvider> {/* Wrap the application with CartProvider */}
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/members" element={user ? <MembersPage /> : <Navigate to="/login" />} />
          <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />
          <Route path="/checkout" element={user ? <CheckoutPage /> : <Navigate to="/login" />} />
          <Route path="/legacy" element={<LegacyPage />} /> {/* Add Legacy route */}
          <Route path="/testimonial" element={<TestimonialPage />} /> {/* Add Testimonial route */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} /> {/* Add Privacy Policy route */}
          <Route path="/return-policy" element={<ReturnPolicy />} /> {/* Add Return Policy route */}
          <Route path="/shipping-policy" element={<ShippingPolicy />} /> {/* Add Shipping Policy route */}
          <Route path="/checkout-success" element={user ? <h2>Checkout Successful!</h2> : <Navigate to="/login" />} />
        </Routes>
        <Footer /> {/* Include the Footer at the bottom */}
      </div>
    </CartProvider>
  );
};

export default App;