import React, { useState } from 'react';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import './SignupPage.css'; // Reuse SignupPage styles

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage('Please enter your email.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage('Password reset email sent! Please check your inbox.');
      setErrorMessage(''); // Clear any previous error messages
    } catch (error) {
      console.error('Error sending password reset email:', error);
      if (error.code === 'auth/user-not-found') {
        setErrorMessage('There is no account registered with that email.');
      } else {
        setErrorMessage('An error occurred while sending the password reset email. Please try again.');
      }
      setSuccessMessage(''); // Clear any previous success messages
    }
  };

  return (
    <div className="page-container">
      <div className="signup-page-container">
        <h1>Reset Your Password</h1>
        <p>Enter your email address below, and we'll send you a link to reset your password.</p>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handlePasswordReset}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Email</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;