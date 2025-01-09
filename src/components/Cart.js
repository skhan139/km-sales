// src/components/Cart.js

import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './Cart.css'; // Import the CSS file for styling

const Cart = () => {
  const { cart, removeItemFromCart, clearCart } = useCart();
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
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-price">{item.price}</span>
              </div>
              <button className="remove-item-button" onClick={() => removeItemFromCart(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
      <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default Cart;