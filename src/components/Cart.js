import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import CheckoutFormModal from './CheckoutFormModal';
import Modal from 'react-modal';
import './Cart.css';

const Cart = () => {
  const { cart, removeItemFromCart, clearCart, updateQuantity } = useCart();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = () => {
    if (cart.length === 0) {
      setError('You have no items in your cart');
      return;
    }

    if (user) {
      setIsModalOpen(true);
      setError(''); // Clear any previous error
    } else {
      navigate('/login');
    }
  };

  const handleFormSubmit = (formData) => {
    console.log('Form Data:', formData);
    setIsModalOpen(false);
    clearCart();
    setIsSuccessModalOpen(true);
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      updateQuantity(id, quantity);
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>You have no items in your cart</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <span className="cart-item-name">{item.name}</span>
                {/* <span className="cart-item-price">{item.price}</span> */}
                <div className="cart-item-quantity">
                  <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                </div>
              </div>
              <button className="remove-item-button" onClick={() => removeItemFromCart(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
      <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>

      <CheckoutFormModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
      />

      <Modal
        isOpen={isSuccessModalOpen}
        onRequestClose={() => setIsSuccessModalOpen(false)}
        contentLabel="Success Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2 className='order'>Order Successful</h2>
        <p className='ordertwo'>A representative will be in touch shortly.</p>
        <button onClick={() => setIsSuccessModalOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default Cart;