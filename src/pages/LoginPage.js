import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Import the CSS file for styling

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State to store error message
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/members');
    } catch (error) {
      console.error("Error signing in:", error);
      setErrorMessage("Login unsuccessful, please check credentials or make an account.");
    }
  };

  return (
    <div className="page-container">
      <div className="login-page-container">
        <h1>Existing K&M Customers Login Here!</h1>
        <div className="login-page">
          <div className="login-container">
            <h2>Login</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
            <form onSubmit={handleLogin}>
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
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;