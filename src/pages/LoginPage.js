import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Import the CSS file for styling

const LoginPage = () => {
  const [identifier, setIdentifier] = useState(''); // State to handle email or phone number
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State to store error message
  const [isPhoneNumber, setIsPhoneNumber] = useState(false); // State to track if the identifier is a phone number
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (isPhoneNumber) {
        // Phone number login logic
        const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
        const confirmationResult = await signInWithPhoneNumber(auth, identifier, recaptchaVerifier);
        const verificationCode = window.prompt('Please enter the verification code that was sent to your phone');
        await confirmationResult.confirm(verificationCode);
      } else {
        // Email login logic
        await signInWithEmailAndPassword(auth, identifier, password);
      }
      navigate('/members');
    } catch (error) {
      console.error("Error signing in:", error);
      switch (error.code) {
        case 'auth/user-not-found':
          setErrorMessage('No account found with this email.');
          break;
        case 'auth/wrong-password':
          setErrorMessage('Incorrect password. Please try again.');
          break;
        case 'auth/invalid-email':
          setErrorMessage('Invalid email format.');
          break;
        default:
          setErrorMessage('Login unsuccessful. Please check credentials or create an account.');
      }
    }
  };

  const handleIdentifierChange = (e) => {
    const value = e.target.value;
    setIdentifier(value);
    // Simple check to determine if the identifier is a phone number
    setIsPhoneNumber(/^\+?[1-9]\d{1,14}$/.test(value));
  };

  return (
    <div className="page-container">
      <div className="login-page-container">
        <h1>Existing K&M Customers Login Here!</h1>
        <h2 className='view'>View Our Products, Place Orders, And More!</h2>
        <div className="login-page">
          <div className="login-container">
            <h2 className='loginHeader'>Login</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Email or Phone Number"
                value={identifier}
                onChange={handleIdentifierChange}
              />
              {!isPhoneNumber && (
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              )}
              <button type="submit">Login</button>
              <p className='need'>Need To Create An Account? Sign Up <a href={`${process.env.PUBLIC_URL}/signup`} style={{ color: 'white' }}>Here!</a>.</p>
            </form>
            <div id="recaptcha-container"></div> {/* Recaptcha container for phone number auth */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;