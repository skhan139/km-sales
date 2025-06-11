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
    firstName: '',
    lastName: '',
    companyName: '',
    phoneNumber: '',
  }); // State to store updated user details
  const [showMessageBubble, setShowMessageBubble] = useState(false); // State for showing the update message bubble
  const [removeMessageBubble, setRemoveMessageBubble] = useState(false); // State for showing the removal message bubble
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const gamesPerPage = 9; // Maximum number of games per page

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
          setUpdatedUserDetails({
            firstName: docSnap.data().firstName || '',
            lastName: docSnap.data().lastName || '',
            companyName: docSnap.data().companyName || '',
            phoneNumber: docSnap.data().phoneNumber || '',
          });
        }
      };

      fetchUserData();
    }
  }, [user]);

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentFavorites = favorites.slice(indexOfFirstGame, indexOfLastGame);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(favorites.length / gamesPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

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

      // Prepare updated data, retaining previous values for blank fields
      const updatedData = {
        firstName: updatedUserDetails.firstName || userDetails.firstName,
        lastName: updatedUserDetails.lastName || userDetails.lastName,
        companyName: updatedUserDetails.companyName || userDetails.companyName,
        phoneNumber: updatedUserDetails.phoneNumber || userDetails.phoneNumber,
      };

      await updateDoc(userDoc, updatedData); // Update Firestore document

      // Update local state
      setUserDetails(updatedData);
      setIsUpdateFormOpen(false); // Close the form

      // Show the update message bubble
      setShowMessageBubble(true);
      setTimeout(() => setShowMessageBubble(false), 3000); // Hide the message bubble after 3 seconds
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

      // Show the removal message bubble
      setRemoveMessageBubble(true);
      setTimeout(() => setRemoveMessageBubble(false), 3000); // Hide the message bubble after 3 seconds
    } catch (error) {
      console.error('Error removing favorite:', error);
      alert('An error occurred while removing the favorite. Please try again.');
    }
  };

  const handleProductClick = (favorite) => {
    const product = products.find((item) => item.id === favorite.id);
    if (product) {
      setSelectedProduct(product);
    }
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <>
      {showMessageBubble && (
        <div className="message-bubble">
          Profile updated successfully!
        </div>
      )}
      {removeMessageBubble && (
        <div className="message-bubble">
          Game removed successfully!
        </div>
      )}
      <div className="user-profile">
        <h2>My Profile</h2>
        <h3>** Note, not all orders will be posted, please contact us if you would like to have your invoices posted to your profile **</h3>
        <div className="user-details">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>First Name:</strong> {userDetails.firstName}</p>
          <p><strong>Last Name:</strong> {userDetails.lastName}</p>
          <p><strong>Company Name:</strong> {userDetails.companyName}</p>
          <p><strong>Phone Number:</strong> {userDetails.phoneNumber}</p>
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
            <>
              <ul className="favorites-list">
                {currentFavorites.map((favorite, index) => (
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
              <div className="pagination-controls">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="pagination-button"
                >
                  <i className="fa fa-arrow-left" aria-hidden="true"></i>
                </button>
                <span>Page {currentPage} of {Math.ceil(favorites.length / gamesPerPage)}</span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === Math.ceil(favorites.length / gamesPerPage)}
                  className="pagination-button"
                >
                  <i className="fa fa-arrow-right" aria-hidden="true"></i>
                </button>
              </div>
            </>
          ) : (
            <p>You have no favorite games yet.</p>
          )}
        </div>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </>
  );
};

export default UserProfile;