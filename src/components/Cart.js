import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
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
  const [points, setPoints] = useState(0); // State to store user points

  // State variables for discount functionality
  const [discountCode, setDiscountCode] = useState(''); // State for the discount code
  const [discountAmount, setDiscountAmount] = useState(0); // State for the discount amount
  const [discountApplied, setDiscountApplied] = useState(false); // State to track if the discount is applied

  useEffect(() => {
    if (user) {
      const fetchUserPoints = async () => {
        const userDoc = doc(db, 'users', user.email); // Reference to the user's document
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          setPoints(docSnap.data().points || 0); // Fetch points or set to 0 if not defined
        }
      };

      fetchUserPoints();
    }
  }, [user]);

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
      <h2>
        <i className="fa fa-shopping-cart" aria-hidden="true"></i> Your Cart <br/>
        {user && (
          <span className="user-points">
            <i className="fa fa-trophy" aria-hidden="true"></i> Points: {points}
          </span>
        )}
      </h2>
      {cart.length === 0 ? (
        <p>You have no items in your cart</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={`${item.id}-${item.quantityType}`} className="cart-item">
              <img
                src={
                  Array.isArray(item.images) && item.images.length > 0
                    ? item.images[0]
                    : item.image
                }
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-quantity-type">
                  {item.quantity}{' '}
                  {item.quantity === 1
                    ? item.quantityType.slice(0, -1)
                    : item.quantityType}
                </span>
                <div className="cart-item-quantity">
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.id,
                        item.quantity - 1,
                        item.quantityType
                      )
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.id,
                        item.quantity + 1,
                        item.quantityType
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-details-extra">
                  <p>
                    <strong>Take In:</strong> {item.takeIn || 'N/A'}
                  </p>
                  <p>
                    <strong>Pay Out:</strong> {item.payout || 'N/A'}
                  </p>
                  <p>
                    <strong>Profit:</strong> {item.profit || 'N/A'}
                  </p>
                </div>
              </div>
              <button
                className="remove-item-button"
                onClick={() => removeItemFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
      <MessageBubble />
      <div className="cart-buttons">
        <button className="checkout-button" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
        <button className="clear-cart-button" onClick={handleClearCart}>
          Clear Cart
        </button>
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
        <img
          src="/assets/images/kmicologo.png"
          alt="Logo"
          className="cart-logo"
        />
        <p className="ordertwo">
          A representative will be in touch shortly. <br /> Thank you for
          choosing K&M Sales!
        </p>
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