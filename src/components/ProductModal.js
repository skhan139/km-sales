// src/components/ProductModal.js
import React from 'react';
import './ProductModal.css'; // Import the CSS file for styling

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
        <img src={product.image} alt={product.name} className="modal-image" />
        <h2 className="modal-name">{product.name}</h2>
        <p className="modal-description">{product.description}</p>
        <p className="modal-price">{product.price}</p>
      </div>
    </div>
  );
};

export default ProductModal;