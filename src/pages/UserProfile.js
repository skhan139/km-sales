import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase'; // Import Firebase configuration
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Firestore functions
import './UserProfile.css'; // Import the CSS file for styling
import Orders from './Orders'; // Import the Orders component
import ProductModal from '../components/ProductModal'; // Import the ProductModal component
import products from '../data/Products'; // Import the Products data

const UserProfile = () => {
  const [user] = useAuthState(auth);
  const [favorites, setFavorites] = useState([]); // State to store favorite products
  const [selectedProduct, setSelectedProduct] = useState(null); // State for the selected product
  const [points, setPoints] = useState(0); // State to store user points
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    phoneNumber: '', // Add phoneNumber to userDetails
  }); // State to store user details
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false); // State to toggle the update form
  const [updatedUserDetails, setUpdatedUserDetails] = useState({
    firstName: userDetails.firstName || '',
    lastName: userDetails.lastName || '',
    companyName: userDetails.companyName || '',
    phoneNumber: userDetails.phoneNumber || '', // Add phoneNumber to updatedUserDetails
  }); // State to store updated user details

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userDoc = doc(db, 'users', user.email); // Reference to the user's document
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          setFavorites(docSnap.data().favorites || []); // Fetch favorites or set to an empty array
          setPoints(docSnap.data().points || 0); // Fetch points or set to 0 if not defined
          setUserDetails({
            firstName: docSnap.data().firstName || 'N/A',
            lastName: docSnap.data().lastName || 'N/A',
            companyName: docSnap.data().companyName || 'N/A',
            phoneNumber: docSnap.data().phoneNumber || 'N/A', // Fetch phoneNumber or set to 'N/A'
          });
        }
      };

      fetchUserData();
    }
  }, [user]);

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleUpdateUserInfo = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const userDoc = doc(db, 'users', user.email); // Reference to the user's document
      await updateDoc(userDoc, {
        firstName: updatedUserDetails.firstName,
        lastName: updatedUserDetails.lastName,
        companyName: updatedUserDetails.companyName,
        phoneNumber: updatedUserDetails.phoneNumber, // Update phoneNumber
      });

      // Update local state
      setUserDetails(updatedUserDetails);
      setIsUpdateFormOpen(false); // Close the form
      alert('User information updated successfully!');
    } catch (error) {
      console.error('Error updating user information:', error);
      alert('An error occurred while updating your information. Please try again.');
    }
  };

  const handleRemoveFavorite = async (favorite) => {
    if (!user) return;

    try {
      const userDoc = doc(db, 'users', user.email); // Reference to the user's document
      await updateDoc(userDoc, {
        favorites: favorites.filter((item) => item.id !== favorite.id), // Remove the selected favorite
      });

      // Update the local state to reflect the change
      setFavorites((prevFavorites) =>
        prevFavorites.filter((item) => item.id !== favorite.id)
      );

      alert(`${favorite.name} has been removed from your favorites.`);
    } catch (error) {
      console.error('Error removing favorite:', error);
      alert('An error occurred while removing the favorite. Please try again.');
    }
  };

  const handleProductClick = (favorite) => {
    // Find the product in the Products.js data by ID
    const product = products.find((item) => item.id === favorite.id);
    if (product) {
      setSelectedProduct(product); // Open the ProductModal with the selected product
    }
  };

  const handleCloseModal = () => {
    setSelectedProduct(null); // Close the ProductModal
  };

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="user-profile">
      <h2>My Profile</h2>
      <h3>** Note, not all orders will be posted, please contact us if you would like to have your invoices posted to your profile **</h3>
      <div className="user-details">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>First Name:</strong> {userDetails.firstName}</p>
        <p><strong>Last Name:</strong> {userDetails.lastName}</p>
        <p><strong>Company Name:</strong> {userDetails.companyName}</p>
        <p><strong>Phone Number:</strong> {userDetails.phoneNumber}</p> {/* Render phoneNumber */}
      </div>
      <div className="update-user-info">
        <button onClick={() => setIsUpdateFormOpen(!isUpdateFormOpen)} className="update-button">
          {isUpdateFormOpen ? 'Cancel Update' : 'Update User Information'}
        </button>
        {isUpdateFormOpen && (
          <form onSubmit={handleUpdateUserInfo} className="update-form">
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={updatedUserDetails.firstName}
                onChange={handleUpdateInputChange}
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={updatedUserDetails.lastName}
                onChange={handleUpdateInputChange}
              />
            </label>
            <label>
              Company Name:
              <input
                type="text"
                name="companyName"
                value={updatedUserDetails.companyName}
                onChange={handleUpdateInputChange}
              />
            </label>
            <label>
              Phone Number:
              <input
                type="text"
                name="phoneNumber"
                value={updatedUserDetails.phoneNumber}
                onChange={handleUpdateInputChange}
              />
            </label>
            <button type="submit" className="submit-update-button">Submit</button>
          </form>
        )}
      </div>
      <Orders userEmail={user.email} />
      <div className="points-section">
        <h3>
          <i className="fa fa-trophy" aria-hidden="true"></i> My Points
        </h3>
        <p>You have <strong>{points}</strong> points.</p>
      </div>
      <div className="favorites-section">
        <h3>
          <i className="fa fa-star" aria-hidden="true"></i> My Favorite Games
        </h3>
        {favorites.length > 0 ? (
          <ul className="favorites-list">
            {favorites.map((favorite, index) => (
              <li key={index} onClick={() => handleProductClick(favorite)}>
                <p><strong>{favorite.name}</strong></p>
                <img src={favorite.image} alt={favorite.name} className="favorite-image" />
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the product click
                    handleRemoveFavorite(favorite);
                  }}
                  className="remove-favorite-button"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have no favorite games yet.</p>
        )}
      </div>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onFavorite={() => {}} // Optional: Pass a favorite handler if needed
        />
      )}
    </div>
  );
};

export default UserProfile;