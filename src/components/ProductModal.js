import React from 'react';
import './ProductModal.css'; // Import the CSS file for styling

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
        <img src={product.image} alt={product.name} className="modal-image" />
        <div className="modal-details">
          <h2 className="modal-name">{product.name}</h2>
          <p className="modal-description">{product.description}</p>
          <p className="modal-price">Price: {product.price}</p>
          <p className="modal-sku">SKU: {product.sku}</p>
          <p className="modal-takein">Take In: {product.takeIn}</p>
          <p className="modal-payout">Payout: {product.payout}</p>
          <p className="modal-profit">Profit: {product.profit}</p>
          <p className="modal-profit-percent">Profit %: {product.profitPercent}</p>
          <p className="modal-deals-per-case">Deals per Case: {product.dealsPerCase}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;