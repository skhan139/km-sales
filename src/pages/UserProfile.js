import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase'; // Import Firebase configuration
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore'; // Firestore functions
import './UserProfile.css'; // Import the CSS file for styling
import Orders from './Orders'; // Import the Orders component

const UserProfile = () => {
  const [user] = useAuthState(auth);
  const [favorites, setFavorites] = useState([]); // State to store favorite products

  useEffect(() => {
    if (user) {
      const fetchFavorites = async () => {
        const userDoc = doc(db, 'users', user.email); // Reference to the user's document
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          setFavorites(docSnap.data().favorites || []); // Fetch favorites or set to an empty array
        }
      };

      fetchFavorites();
    }
  }, [user]);

  const handleRemoveFavorite = async (favorite) => {
    if (!user) return;

    try {
      const userDoc = doc(db, 'users', user.email); // Reference to the user's document
      await updateDoc(userDoc, {
        favorites: arrayRemove(favorite), // Remove the selected favorite
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

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="user-profile">
      <h2>My Profile <br /> <br />View Online Orders</h2>
      <div className="user-details">
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <Orders userEmail={user.email} />
      <div className="favorites-section">
        <h3>My Favorite Games</h3>
        {favorites.length > 0 ? (
          <ul className="favorites-list">
            {favorites.map((favorite, index) => (
              <li key={index}>
                <p><strong>{favorite.name}</strong></p>
                <img src={favorite.image} alt={favorite.name} className="favorite-image" />
                <button
                  onClick={() => handleRemoveFavorite(favorite)}
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
    </div>
  );
};

export default UserProfile;