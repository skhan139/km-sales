import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext'; // Import the Cart context
import './ProductModal.css'; // Import the CSS file for styling
import '@fortawesome/fontawesome-free/css/all.css';

const ProductModal = ({ product, onClose, onFavorite }) => {
  const { addItemToCart } = useCart(); // Use the Cart context
  const [selectedVariant, setSelectedVariant] = useState(product?.variants ? product.variants[0] : product);
  const [quantity, setQuantity] = useState(0); // Default quantity for cases is 0
  const [customQuantity, setCustomQuantity] = useState(''); // State for the custom number of games
  const [quantityType, setQuantityType] = useState('cases'); // State for the quantity type
  const [copySuccess, setCopySuccess] = useState(''); // State for copy success message
  const [showShareOptions, setShowShareOptions] = useState(false); // State for showing share options
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State for the current image index

  useEffect(() => {
    if (product) {
      // Safely set the selected variant
      setSelectedVariant(
        Array.isArray(product.variants) && product.variants.length > 0
          ? product.variants[0]
          : product
      );

      // Safely check for tags and set the quantity type
      if (Array.isArray(product.tags)) {
        if (product.tags.includes('boards')) {
          setQuantityType('boards');
        } else if (product.tags.includes('paper')) {
          setQuantityType('books');
        } else if (product.tags.includes('daubers')) {
          setQuantityType('daubers');
        } else if (product.tags.includes('packs')) {
          setQuantityType('packs');
        } else {
          setQuantityType('cases'); // Default fallback
        }
      } else {
        setQuantityType('cases'); // Default fallback if tags is not an array
      }
    }
  }, [product]);

  if (!product) return null;

  const handleVariantChange = (event) => {
    const variant = product?.variants?.find(v => v.sku === event.target.value);
    if (variant) {
      setSelectedVariant(variant);
    }
  };

  const handleAddToCart = () => {
    const quantityToAdd = customQuantity ? parseInt(customQuantity, 10) : quantity;
    addItemToCart({ ...selectedVariant, quantity: quantityToAdd, quantityType: customQuantity ? 'games' : quantityType });
    onClose(); // Close the modal after adding to cart
  };

  const handleCopyLink = () => {
    const productLink = `${window.location.origin}/product/${product.id}`;
    navigator.clipboard.writeText(productLink).then(() => {
      setCopySuccess('Link copied to clipboard!');
      setTimeout(() => setCopySuccess(''), 3000); // Clear the message after 3 seconds
    });
  };

  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };

  const handleCustomQuantityChange = (e) => {
    setCustomQuantity(e.target.value);
    setQuantity(0); // Reset cases to 0 when custom quantity is changed
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10));
    setCustomQuantity(''); // Reset custom quantity when cases are changed
  };

  const handleImageNavigation = (direction) => {
    if (direction === 'left') {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? product.images.length - 1 : prevIndex - 1));
    } else if (direction === 'right') {
      setCurrentImageIndex((prevIndex) => (prevIndex === product.images.length - 1 ? 0 : prevIndex + 1));
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
        <div className="modal-image-container">
          {product.images && product.images.length > 1 ? (
            <>
              <img
                src={product.images[currentImageIndex]}
                alt={`${product.name} - ${currentImageIndex + 1}`}
                className="modal-image"
              />
              <button
  className="image-nav single"
  onClick={() => handleImageNavigation('right')}
>
  <i className="fa fa-arrow-right" aria-hidden="true"></i>
</button>
            </>
          ) : (
            <img
              src={product.images ? product.images[0] : product.image}
              alt={product.name}
              className="modal-image"
            />
          )}
        </div>
        <div className="modal-details">
          <button onClick={() => onFavorite(product)} className="favorite-button">
            <i className="fa fa-star" aria-hidden="true"></i> Add to Favorites
          </button>
          <h2 className="modal-name">{selectedVariant?.name || product.name}</h2>
          <p className="modal-description">{selectedVariant?.description || product.description}</p>
          <p className="modal-price">Price: {selectedVariant?.price || product.price}</p>
          <p className="modal-sku">SKU: {selectedVariant?.sku || product.sku}</p>
          <p className="modal-takein">Take In: {selectedVariant?.takeIn || product.takeIn}</p>
          <p className="modal-payout">Payout: {selectedVariant?.payout || product.payout}</p>
          <p className="modal-profit">Profit: {selectedVariant?.profit || product.profit}</p>
          <p className="modal-profit-percent">Profit : {selectedVariant?.profitPercent || product.profitPercent}</p>
          <p className="modal-deals-per-case">Deals per Case: {selectedVariant?.dealsPerCase || product.dealsPerCase}</p>
          <p className="modal-seal">Seal: {selectedVariant?.seal || product.seal}</p>
          <div className="modal-buttons">
          <button className="add-to-cart-button-modal" onClick={handleAddToCart}>
  <i className="fa fa-shopping-cart" aria-hidden="true"></i> Add to Cart
</button>
{!showShareOptions && (
  <button className="share-button" onClick={handleShare}>
    <i className="fa fa-share-alt" aria-hidden="true"></i> Share
  </button>
)}
            {showShareOptions && (
              <div className="share-options">
                <button className="close-share-options" onClick={handleShare}>Close</button>
                <button onClick={handleCopyLink}>Copy Link</button>
                <button onClick={() => window.open(`sms:+1234567890?body=Check out this product: ${window.location.origin}/product/${product.id}`, '_blank')}>Text</button>
                <button onClick={() => window.open(`mailto:?subject=Check out this product&body=Check out this product: ${window.location.origin}/product/${product.id}`, '_blank')}>Email</button>
              </div>
            )}
            {copySuccess && <p className="copy-success">{copySuccess}</p>}
          </div>
        </div>
        {product.variants && (
          <div className="modal-variants">
            <label htmlFor="variant-select">Choose a variant:</label>
            <select id="variant-select" onChange={handleVariantChange}>
              {product.variants.map((variant) => (
                <option key={variant.sku} value={variant.sku}>
                  {variant.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="quantity-container">
          {Array.isArray(product.tags) && product.tags.includes('boards') ? (
            <div className="quantity-selection">
              <label htmlFor="quantity-select">Number of boards:</label>
              <select id="quantity-select" value={quantity} onChange={handleQuantityChange}>
                {[...Array(10).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1} {num + 1 === 1 ? 'board' : 'boards'}
                  </option>
                ))}
              </select>
            </div>
          ) : Array.isArray(product.tags) && product.tags.includes('paper') ? (
            <>
              <div className="custom-quantity">
                <label htmlFor="custom-quantity-input">Enter number of books:</label>
                <input
                  type="number"
                  id="custom-quantity-input"
                  value={customQuantity}
                  onChange={handleCustomQuantityChange}
                  min="1"
                />
              </div>
            </>
          ) : Array.isArray(product.tags) && product.tags.includes('daubers') ? (
            <>
              <div className="quantity-selection">
                <label htmlFor="quantity-select">Number of cases:</label>
                <select id="quantity-select" value={quantity} onChange={handleQuantityChange}>
                  {[...Array(11).keys()].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              <div className="custom-quantity">
                <label htmlFor="custom-quantity-input">Or enter number of daubers:</label>
                <input
                  type="number"
                  id="custom-quantity-input"
                  value={customQuantity}
                  onChange={handleCustomQuantityChange}
                  min="1"
                />
              </div>
            </>
          ) : Array.isArray(product.tags) && product.tags.includes('packs') ? (
            <div className="quantity-selection">
              <label htmlFor="quantity-select">Number of packs:</label>
              <select id="quantity-select" value={quantity} onChange={handleQuantityChange}>
                {[...Array(10).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1} {num + 1 === 1 ? 'pack' : 'packs'}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <>
              <div className="quantity-selection">
                <label htmlFor="quantity-select">Number of cases:</label>
                <select id="quantity-select" value={quantity} onChange={handleQuantityChange}>
                  {[...Array(11).keys()].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              <div className="custom-quantity">
                <label htmlFor="custom-quantity-input">Or enter number of games:</label>
                <input
                  type="number"
                  id="custom-quantity-input"
                  value={customQuantity}
                  onChange={handleCustomQuantityChange}
                  min="1"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;