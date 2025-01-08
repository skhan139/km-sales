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
    <div>
      <h1>Members Only Product Gallery</h1>
      <ProductGallery />
    </div>
  );
};

export default MembersPage;