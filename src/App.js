import React, { useEffect, useState } from 'react';
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
import LegacyPage from './pages/LegacyPage';
import TestimonialPage from './pages/TestimonialPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ReturnPolicy from './pages/ReturnPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import UserProfile from './pages/UserProfile';
import CustomGamePage from './pages/CustomGamePage'; // Import the CustomGamePage component
import Footer from './components/Footer';

const App = () => {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Establish WebSocket connection
    const socket = new WebSocket('ws://localhost:3001/ws');

    // Event listener for when the connection is opened
    socket.addEventListener('open', (event) => {
      console.log('WebSocket is open now.');
      socket.send('Hello Server!');
    });

    // Event listener for receiving messages from the server
    socket.addEventListener('message', (event) => {
      console.log('Message from server: ', event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    });

    // Event listener for errors
    socket.addEventListener('error', (error) => {
      console.error('WebSocket error: ', error);
    });

    // Event listener for when the connection is closed
    socket.addEventListener('close', (event) => {
      console.log('WebSocket is closed now.');
    });

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.close();
    };
  }, []);

  return (
    <CartProvider>
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
          <Route path="/legacy" element={<LegacyPage />} />
          <Route path="/testimonial" element={<TestimonialPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/profile" element={user ? <UserProfile /> : <Navigate to="/login" />} />
          <Route path="/checkout-success" element={user ? <h2>Checkout Successful!</h2> : <Navigate to="/login" />} />
          <Route path="/custom-game" element={<CustomGamePage />} /> {/* Add CustomGamePage route */}
        </Routes>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default App;