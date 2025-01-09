// src/pages/MembersPage.js

import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Navigate } from 'react-router-dom';
import ProductGallery from '../components/ProductGallery';
import './MembersPage.css'; // Import the CSS file for styling

const MembersPage = () => {
  const [user] = useAuthState(auth);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="members-page-container">
      <h1>Browse Our Entire Product Gallery</h1>
      <ProductGallery />
    </div>
  );
};

export default MembersPage;