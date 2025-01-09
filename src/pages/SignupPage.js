// src/pages/SignupPage.js

import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css'; // Import the CSS file for styling

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false); // State to manage signup success message
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSignupSuccess(true); // Set signup success state to true
      setTimeout(() => {
        navigate('/login'); // Navigate to the login page after a delay
      }, 2000); // Adjust the delay as needed
    } catch (error) {
      console.error("Error signing up:", error);
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
            <form onSubmit={handleSignup}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Signup</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;