// src/pages/CheckoutPage.js

import React, { useState } from 'react';
import './CheckoutPage.css'; // Import the CSS file for styling

const CheckoutPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [organizationRole, setOrganizationRole] = useState('');
  const [orderDetails, setOrderDetails] = useState(''); // Add a state for order details
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      firstName,
      lastName,
      companyName,
      email,
      phoneNumber,
      businessAddress,
      city,
      zipCode,
      organizationRole,
      orderDetails,
    };

    try {
      const response = await fetch('http://localhost:3000/submit-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setOrderSuccess(true);
        setTimeout(() => {
          setOrderSuccess(false);
        }, 3000);
      } else {
        throw new Error('Error submitting order');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      setErrorMessage('Error submitting order. Please try again.');
    }
  };

  return (
    <div className="checkout-page-container">
      <h1>Checkout</h1>
      {orderSuccess && <p className="success-message">Order submitted successfully!</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleOrderSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Business Address"
          value={businessAddress}
          onChange={(e) => setBusinessAddress(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Zip Code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Organization Role"
          value={organizationRole}
          onChange={(e) => setOrganizationRole(e.target.value)}
          required
        />
        <textarea
          placeholder="Order Details"
          value={orderDetails}
          onChange={(e) => setOrderDetails(e.target.value)}
          required
        />
        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;