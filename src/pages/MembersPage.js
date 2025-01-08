// src/pages/MembersPage.js

import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Navigate } from 'react-router-dom';
import ProductGallery from '../components/ProductGallery';

const MembersPage = () => {
  const [user] = useAuthState(auth);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="homepage-container">
    <div>
      <h1>Browse Our Entire Product Gallery</h1>
      <ProductGallery />
    </div>
    </div>
  );
};

export default MembersPage;