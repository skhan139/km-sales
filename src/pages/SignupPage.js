// src/pages/SignupPage.js

import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css'; // Import the CSS file for styling

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); // State to manage phone number
  const [signupSuccess, setSignupSuccess] = useState(false); // State to manage signup success message
  const [errorMessage, setErrorMessage] = useState(''); // State to manage error messages
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Here you would typically also send the phone number to your backend or save it in the user profile
      await createUserWithEmailAndPassword(auth, email, password);
      setSignupSuccess(true); // Set signup success state to true
      setTimeout(() => {
        navigate('/login'); // Navigate to the login page after a delay
      }, 2000); // Adjust the delay as needed
    } catch (error) {
      console.error("Error signing up:", error);
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('The email address is already in use by another account.');
      } else if (error.code === 'auth/phone-number-already-exists') {
        setErrorMessage('The phone number is already in use by another account.');
      } else {
        setErrorMessage('An error occurred during signup. Please try again.');
      }
    }
  };

  return (
    <div className="page-container">
      <div className="signup-page-container">
        <h1>Create An Account To Login And View Our Products!</h1>
        <div className="signup-page">
          <div className="signup-container">
            <h2>Signup</h2>
            {signupSuccess && <p className="success-message">Signup successful!</p>} {/* Display success message */}
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
            <form onSubmit={handleSignup}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <button type="submit">Signup</button>
              <p>Already Have An Account? Sign In <a href={`${process.env.PUBLIC_URL}/login`} style={{ color: 'white' }}>Here!</a>.</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;