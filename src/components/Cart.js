import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase'; // Remove db import
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com'; // Import EmailJS
import CheckoutFormModal from './CheckoutFormModal';
import Modal from 'react-modal';
import ConfirmationPopup from './ConfirmationPopup'; // Import the ConfirmationPopup component
import MessageBubble from './MessageBubble'; // Import the MessageBubble component
import './Cart.css';

const Cart = () => {
  const { cart, removeItemFromCart, clearCart, updateQuantity } = useCart();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for the confirmation popup
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

  const handleFormSubmit = async (formData) => {
    console.log('Form Data:', formData);

    // Example of sending order information via EmailJS
    try {
      const orderData = {
        user: user.email,
        cart,
        formData,
        createdAt: new Date(),
      };

      console.log('Order Data:', orderData);

      const templateParams = {
        to_email: 'skhan139@icloud.com',
        subject: 'New Order',
        message: JSON.stringify(orderData, null, 2),
      };

      await emailjs.send(
        'service_0fzyzws', // Replace with your EmailJS service ID
        'template_446ao1n', // Replace with your EmailJS template ID
        templateParams,
        'JEDoAfpGovlaq9jU4' // Replace with your EmailJS user ID
      );

      console.log('Order successfully sent via email');

      setIsModalOpen(false);
      clearCart();
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error('Error submitting order:', error);
      setError('Failed to submit order. Please try again.');
    }
  };

  const handleQuantityChange = (id, quantity, quantityType) => {
    if (quantity > 0) {
      updateQuantity(id, quantity, quantityType);
    }
  };

  const handleClearCart = () => {
    if (cart.length === 0) {
      setError('You have no items in your cart');
      return;
    }
    setIsPopupOpen(true);
  };

  const handleConfirmClearCart = () => {
    clearCart();
    setIsPopupOpen(false);
  };

  const handleCancelClearCart = () => {
    setIsPopupOpen(false);
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
                {item.tags && item.tags.includes('paper') && (
                  <span className="cart-item-paper-type">Type: {item.selectedPaper}</span>
                )}
                <span className="cart-item-quantity-type">
                  {item.tags && item.tags.includes('boards') 
                    ? `${item.quantity} ${item.quantity === 1 ? 'board' : 'boards'}` 
                    : item.tags && item.tags.includes('daubers')
                      ? item.quantityType === 'cases'
                        ? `${item.quantity} ${item.quantity === 1 ? 'case' : 'cases'}`
                        : `${item.quantity} ${item.quantity === 1 ? 'dauber' : 'daubers'}`
                      : item.tags && item.tags.includes('paper')
                        ? `${item.quantity} ${item.quantity === 1 ? 'book' : 'books'}`
                        : item.quantityType === 'cases' 
                          ? `${item.quantity} ${item.quantity === 1 ? 'case' : 'cases'}` 
                          : `${item.quantity} ${item.quantity === 1 ? 'game' : 'games'}`}
                </span>
                <div className="cart-item-quantity">
                  <button onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.quantityType)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.quantityType)}>+</button>
                </div>
              </div>
              <button className="remove-item-button" onClick={() => removeItemFromCart(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
      <MessageBubble />
      <div className="cart-buttons">
        <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
        <button className="clear-cart-button" onClick={handleClearCart}>Clear Cart</button>
      </div>

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
        <img src="/assets/images/kmicologo.png" alt="Logo" className="cart-logo" />
        <p className='ordertwo'>A representative will be in touch shortly. <br/> Thank You For Choosing K&M Sales!</p>
        <button onClick={() => setIsSuccessModalOpen(false)}>Close</button>
      </Modal>

      {isPopupOpen && (
        <ConfirmationPopup
          message="Are you sure you want to clear your entire cart?"
          onConfirm={handleConfirmClearCart}
          onCancel={handleCancelClearCart}
        />
      )}
    </div>
  );
};

export default Cart;