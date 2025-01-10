import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Navigate } from 'react-router-dom';
import ProductGallery from '../components/ProductGallery';
import './MembersPage.css'; // Import the CSS file for styling

const MembersPage = () => {
  const [user] = useAuthState(auth);
  const [searchTerm, setSearchTerm] = useState('');

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="members-page-container">
      <h1>Browse Our Entire Product Gallery</h1>
      <h2>** Note, Some Orders May Take Longer Than Others Depending On Stock</h2>
      <input 
        type="text" 
        placeholder="Search by tag or category..." 
        value={searchTerm} 
        onChange={handleSearchChange} 
        className="search-bar"
      />
      <ProductGallery searchTerm={searchTerm} />
    </div>
  );
};

export default MembersPage;