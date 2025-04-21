import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase'; // Import your Firebase configuration
import './UserProfile.css'; // Import the CSS file for styling
import Orders from './Orders'; // Import the Orders component

const UserProfile = () => {
  const [user] = useAuthState(auth);

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="user-profile">
      <h2>My Profile <br/> <br/>View Online Orders</h2>
      <div className="user-details">
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <Orders userEmail={user.email} />
    </div>
  );
};

export default UserProfile;