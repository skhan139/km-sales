import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import CheckoutFormModal from './CheckoutFormModal';
import Modal from 'react-modal';
import ConfirmationPopup from './ConfirmationPopup';
import MessageBubble from './MessageBubble';
import './Cart.css';

const Cart = () => {
  const { cart, removeItemFromCart, clearCart, updateQuantity } = useCart();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [error, setError] = useState('');

  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  const handleApplyDiscount = () => {
    if (discountCode.trim().toLowerCase() === 'kmbash10') {
      setDiscountAmount(10);
      setDiscountApplied(true);
      setError('');
    } else {
      setError('Invalid discount code');
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      setError('You have no items in your cart');
      return;
    }

    if (user) {
      setIsModalOpen(true);
      setError('');
    } else {
      navigate('/login');
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      const orderData = {
        user: user.email,
        cart,
        formData,
        discountCode: discountCode || 'None',
        discountAmount,
        createdAt: new Date(),
      };

      const templateParams = {
        to_email: 'skhan139@icloud.com',
        subject: 'New Order',
        message: JSON.stringify(orderData, null, 2),
      };

      await emailjs.send(
        'service_0fzyzws',
        'template_446ao1n',
        templateParams,
        'JEDoAfpGovlaq9jU4'
      );

      setIsModalOpen(false);
      clearCart();
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error('Error submitting order:', error);
      setError('Failed to submit order. Please try again.');
    }
  };

  const handleQuantityChange = (id, quantity, quantityType) => {
    if (quantity >= 1) {
      updateQuantity(id, quantity, quantityType); // Update quantity if it's 1 or more
    } else {
      removeItemFromCart(id); // Remove the item if quantity is less than 1
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
            <div key={`${item.id}-${item.quantityType}`} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-quantity-type">
                  {item.quantity} {item.quantity === 1 ? item.quantityType.slice(0, -1) : item.quantityType}
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
        discountCode={discountCode}
        setDiscountCode={setDiscountCode}
        handleApplyDiscount={handleApplyDiscount}
        discountApplied={discountApplied}
      />

      <Modal
        isOpen={isSuccessModalOpen}
        onRequestClose={() => setIsSuccessModalOpen(false)}
        contentLabel="Success Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2 className="order">Order Successful</h2>
        <img src="/assets/images/kmicologo.png" alt="Logo" className="cart-logo" />
        <p className="ordertwo">A representative will be in touch shortly. <br /> Thank you for choosing K&M Sales!</p>
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