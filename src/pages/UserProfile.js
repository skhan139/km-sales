import React, { useEffect, useMemo, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Orders from './Orders';
import ProductModal from '../components/ProductModal';
import products from '../data/Products';
import './UserProfile.css';

const FAVORITES_PER_PAGE = 9;

const EMPTY_USER_DETAILS = {
  firstName: '',
  lastName: '',
  companyName: '',
  phoneNumber: '',
};

const displayValue = (value) => value?.trim() || 'Not provided';

const UserProfile = () => {
  const [user, isAuthLoading, authError] = useAuthState(auth);
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [points, setPoints] = useState(0);
  const [userDetails, setUserDetails] = useState(EMPTY_USER_DETAILS);
  const [updatedUserDetails, setUpdatedUserDetails] = useState(EMPTY_USER_DETAILS);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [removingFavoriteId, setRemovingFavoriteId] = useState(null);
  const [message, setMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!message) {
      return undefined;
    }

    const timer = window.setTimeout(() => setMessage(null), 3500);
    return () => window.clearTimeout(timer);
  }, [message]);

  useEffect(() => {
    let isActive = true;

    if (isAuthLoading) {
      return () => {
        isActive = false;
      };
    }

    if (!user?.email) {
      setIsProfileLoading(false);
      return () => {
        isActive = false;
      };
    }

    const fetchUserData = async () => {
      setIsProfileLoading(true);

      try {
        const snapshot = await getDoc(doc(db, 'users', user.email));

        if (!isActive) {
          return;
        }

        if (snapshot.exists()) {
          const data = snapshot.data();
          const details = {
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            companyName: data.companyName || '',
            phoneNumber: data.phoneNumber || '',
          };

          setFavorites(Array.isArray(data.favorites) ? data.favorites : []);
          setPoints(Number.isFinite(Number(data.points)) ? Number(data.points) : 0);
          setUserDetails(details);
          setUpdatedUserDetails(details);
        }
      } catch (error) {
        console.error('Unable to load profile:', error);
        if (isActive) {
          setMessage({ type: 'error', text: 'Your profile could not be loaded.' });
        }
      } finally {
        if (isActive) {
          setIsProfileLoading(false);
        }
      }
    };

    fetchUserData();

    return () => {
      isActive = false;
    };
  }, [isAuthLoading, user]);

  const totalPages = Math.max(1, Math.ceil(favorites.length / FAVORITES_PER_PAGE));

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  const currentFavorites = useMemo(() => {
    const firstIndex = (currentPage - 1) * FAVORITES_PER_PAGE;
    return favorites.slice(firstIndex, firstIndex + FAVORITES_PER_PAGE);
  }, [currentPage, favorites]);

  const fullName = [userDetails.firstName, userDetails.lastName]
    .filter(Boolean)
    .join(' ');

  const handleUpdateInputChange = ({ target: { name, value } }) => {
    setUpdatedUserDetails((currentDetails) => ({
      ...currentDetails,
      [name]: value,
    }));
  };

  const handleUpdateUserInfo = async (event) => {
    event.preventDefault();

    if (!user?.email || isSaving) {
      return;
    }

    const updatedData = Object.fromEntries(
      Object.entries(updatedUserDetails).map(([key, value]) => [key, value.trim()]),
    );

    setIsSaving(true);
    setMessage(null);

    try {
      await updateDoc(doc(db, 'users', user.email), updatedData);
      setUserDetails(updatedData);
      setUpdatedUserDetails(updatedData);
      setIsUpdateFormOpen(false);
      setMessage({ type: 'success', text: 'Profile updated successfully.' });
    } catch (error) {
      console.error('Unable to update profile:', error);
      setMessage({
        type: 'error',
        text: 'Your changes could not be saved. Please try again.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveFavorite = async (favorite) => {
    if (!user?.email || removingFavoriteId) {
      return;
    }

    const updatedFavorites = favorites.filter((item) => item.id !== favorite.id);
    setRemovingFavoriteId(favorite.id);
    setMessage(null);

    try {
      await updateDoc(doc(db, 'users', user.email), {
        favorites: updatedFavorites,
      });
      setFavorites(updatedFavorites);
      setMessage({ type: 'success', text: `${favorite.name} was removed from favorites.` });
    } catch (error) {
      console.error('Unable to remove favorite:', error);
      setMessage({
        type: 'error',
        text: 'The favorite could not be removed. Please try again.',
      });
    } finally {
      setRemovingFavoriteId(null);
    }
  };

  const handleProductClick = (favorite) => {
    const product = products.find((item) => item.id === favorite.id);

    if (product) {
      setSelectedProduct(product);
      return;
    }

    setMessage({ type: 'error', text: 'Product details are currently unavailable.' });
  };

  if (isAuthLoading || isProfileLoading) {
    return (
      <main className="profile-shell profile-state-shell">
        <p className="profile-page-state">Loading your profile…</p>
      </main>
    );
  }

  if (authError) {
    return (
      <main className="profile-shell profile-state-shell">
        <p className="profile-page-state profile-page-state-error" role="alert">
          Your account could not be verified. Please refresh and try again.
        </p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="profile-shell profile-state-shell">
        <div className="profile-signed-out-card">
          <p className="profile-eyebrow">K&M customer account</p>
          <h1>Sign in to view your profile.</h1>
          <p>Your account contains your rewards, posted orders, and favorite games.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="profile-shell">
      {message && (
        <div
          className={`profile-message-bubble profile-message-${message.type}`}
          role={message.type === 'error' ? 'alert' : 'status'}
        >
          <span>{message.text}</span>
          <button type="button" onClick={() => setMessage(null)} aria-label="Dismiss message">
            ×
          </button>
        </div>
      )}

      <div className="profile-container">
        <header className="profile-header">
          <div>
            <p className="profile-eyebrow">Customer dashboard</p>
            <h1 className="profile-title">
              {fullName ? `Welcome, ${fullName}` : 'My Profile'}
            </h1>
            <p className="profile-header-copy">
              Manage your account details, rewards, orders, and favorite games.
            </p>
          </div>

          <div className="profile-points-summary" aria-label={`${points} reward points`}>
            <span>Available points</span>
            <strong>{points.toLocaleString()}</strong>
          </div>
        </header>

        <aside className="profile-disclaimer">
          <span aria-hidden="true">i</span>
          <p>
            Not every order is posted automatically. Contact our team if you would
            like a specific invoice added to your profile.
          </p>
        </aside>

        <section className="profile-details-card" aria-labelledby="account-heading">
          <div className="profile-card-heading">
            <div>
              <p>Account</p>
              <h2 id="account-heading" className="profile-section-heading">
                Contact information
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsUpdateFormOpen((isOpen) => !isOpen)}
              className="profile-action-button"
              aria-expanded={isUpdateFormOpen}
              aria-controls="profile-update-form"
            >
              {isUpdateFormOpen ? 'Cancel editing' : 'Edit information'}
            </button>
          </div>

          <dl className="profile-details-grid">
            <div className="profile-detail-item">
              <dt className="profile-label">Email</dt>
              <dd className="profile-value">{user.email}</dd>
            </div>
            <div className="profile-detail-item">
              <dt className="profile-label">First name</dt>
              <dd className="profile-value">{displayValue(userDetails.firstName)}</dd>
            </div>
            <div className="profile-detail-item">
              <dt className="profile-label">Last name</dt>
              <dd className="profile-value">{displayValue(userDetails.lastName)}</dd>
            </div>
            <div className="profile-detail-item">
              <dt className="profile-label">Company</dt>
              <dd className="profile-value">{displayValue(userDetails.companyName)}</dd>
            </div>
            <div className="profile-detail-item">
              <dt className="profile-label">Phone number</dt>
              <dd className="profile-value">{displayValue(userDetails.phoneNumber)}</dd>
            </div>
          </dl>

          {isUpdateFormOpen && (
            <form
              id="profile-update-form"
              onSubmit={handleUpdateUserInfo}
              className="profile-update-form"
            >
              <div className="profile-form-grid">
                <div className="profile-form-group">
                  <label htmlFor="profile-first-name">First name</label>
                  <input
                    id="profile-first-name"
                    type="text"
                    name="firstName"
                    value={updatedUserDetails.firstName}
                    onChange={handleUpdateInputChange}
                    autoComplete="given-name"
                  />
                </div>
                <div className="profile-form-group">
                  <label htmlFor="profile-last-name">Last name</label>
                  <input
                    id="profile-last-name"
                    type="text"
                    name="lastName"
                    value={updatedUserDetails.lastName}
                    onChange={handleUpdateInputChange}
                    autoComplete="family-name"
                  />
                </div>
                <div className="profile-form-group">
                  <label htmlFor="profile-company">Company name</label>
                  <input
                    id="profile-company"
                    type="text"
                    name="companyName"
                    value={updatedUserDetails.companyName}
                    onChange={handleUpdateInputChange}
                    autoComplete="organization"
                  />
                </div>
                <div className="profile-form-group">
                  <label htmlFor="profile-phone">Phone number</label>
                  <input
                    id="profile-phone"
                    type="tel"
                    name="phoneNumber"
                    value={updatedUserDetails.phoneNumber}
                    onChange={handleUpdateInputChange}
                    autoComplete="tel"
                  />
                </div>
              </div>
              <button type="submit" className="profile-submit-button" disabled={isSaving}>
                {isSaving ? 'Saving changes…' : 'Save changes'}
              </button>
            </form>
          )}
        </section>

        <section className="profile-orders-section" aria-label="Orders">
          <Orders userEmail={user.email} />
        </section>

        <section className="profile-favorites-section" aria-labelledby="favorites-heading">
          <div className="profile-card-heading">
            <div>
              <p>Saved products</p>
              <h2 id="favorites-heading" className="profile-section-heading">
                Favorite games
              </h2>
            </div>
            <span className="profile-favorite-count">
              {favorites.length} {favorites.length === 1 ? 'favorite' : 'favorites'}
            </span>
          </div>

          {favorites.length > 0 ? (
            <>
              <ul className="profile-favorites-list">
                {currentFavorites.map((favorite) => (
                  <li key={favorite.id} className="profile-favorite-item">
                    <button
                      type="button"
                      className="profile-favorite-open"
                      onClick={() => handleProductClick(favorite)}
                      aria-label={`View ${favorite.name}`}
                    >
                      <img
                        src={favorite.image}
                        alt=""
                        className="profile-favorite-image"
                        loading="lazy"
                      />
                      <span className="profile-favorite-name">{favorite.name}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveFavorite(favorite)}
                      className="profile-remove-favorite-button"
                      disabled={Boolean(removingFavoriteId)}
                    >
                      {removingFavoriteId === favorite.id ? 'Removing…' : 'Remove'}
                    </button>
                  </li>
                ))}
              </ul>

              {totalPages > 1 && (
                <nav className="profile-pagination-controls" aria-label="Favorite games pages">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                    disabled={currentPage === 1}
                    className="profile-pagination-button"
                    aria-label="Previous page"
                  >
                    ←
                  </button>
                  <span className="profile-pagination-info">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((page) => Math.min(totalPages, page + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="profile-pagination-button"
                    aria-label="Next page"
                  >
                    →
                  </button>
                </nav>
              )}
            </>
          ) : (
            <p className="profile-empty-state">You have no favorite games yet.</p>
          )}
        </section>

        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </div>
    </main>
  );
};

export default UserProfile;
