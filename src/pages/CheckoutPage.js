// src/pages/CheckoutPage.js

import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (user) {
      // Implement checkout logic here
      clearCart();
      navigate('/checkout-success');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px' }} />
              <span>{item.name}</span>
              <span>{item.price}</span>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default CheckoutPage;