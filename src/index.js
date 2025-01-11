import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router
import './index.css';
import App from './App';

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component into the root element
root.render(
  <React.StrictMode>
    <Router basename={process.env.PUBLIC_URL}>
      <App />
    </Router>
  </React.StrictMode>
);