// src/components/ProductGallery.js

import React from 'react';
import products from '../data/Products';
import './ProductGallery.css'; // Create a CSS file for styling

const ProductGallery = () => {
  return (
    <div className="product-gallery">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} className="product-image" />
          <h2 className="product-name">{product.name}</h2>
          <p className="product-price">{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductGallery;