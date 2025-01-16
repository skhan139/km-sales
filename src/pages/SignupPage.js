// src/pages/SignupPage.js

import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css'; // Import the CSS file for styling

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [organizationRole, setOrganizationRole] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Here you would typically also send the additional fields to your backend or save them in the user profile
      await createUserWithEmailAndPassword(auth, email, password);
      setSignupSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
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
            <h2 className='signupHeader'>Signup</h2>
            {signupSuccess && <p className="success-message">Signup successful!</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSignup}>
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
              <button type="submit">Signup</button>
              <p className='already'>Already Have An Account? Sign In <a href={`${process.env.PUBLIC_URL}/login`} style={{ color: 'white' }}>Here!</a>.</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;