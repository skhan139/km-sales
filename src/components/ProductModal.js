import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext'; // Import the Cart context
import './ProductModal.css'; // Import the CSS file for styling

const ProductModal = ({ product, onClose }) => {
  const { addItemToCart } = useCart(); // Use the Cart context
  const [selectedVariant, setSelectedVariant] = useState(product?.variants ? product.variants[0] : product);

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants ? product.variants[0] : product);
    }
  }, [product]);

  if (!product) return null;

  const handleVariantChange = (event) => {
    const variant = product.variants.find(v => v.sku === event.target.value);
    setSelectedVariant(variant);
  };

  const handleAddToCart = () => {
    addItemToCart(selectedVariant);
    onClose(); // Close the modal after adding to cart
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
        <img src={selectedVariant?.image || product.image} alt={selectedVariant?.name || product.name} className="modal-image" />
        <div className="modal-details">
          <h2 className="modal-name">{selectedVariant?.name || product.name}</h2>
          <p className="modal-description">{selectedVariant?.description || product.description}</p>
          <p className="modal-price">Price: {selectedVariant?.price || product.price}</p>
          <p className="modal-sku">SKU: {selectedVariant?.sku || product.sku}</p>
          <p className="modal-takein">Take In: {selectedVariant?.takeIn || product.takeIn}</p>
          <p className="modal-payout">Payout: {selectedVariant?.payout || product.payout}</p>
          <p className="modal-profit">Profit: {selectedVariant?.profit || product.profit}</p>
          <p className="modal-profit-percent">Profit %: {selectedVariant?.profitPercent || product.profitPercent}</p>
          <p className="modal-deals-per-case">Deals per Case: {selectedVariant?.dealsPerCase || product.dealsPerCase}</p>
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
        <button className="add-to-cart-button-modal" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductModal;