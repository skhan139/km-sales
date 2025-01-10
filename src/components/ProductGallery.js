// src/components/ProductGallery.js

import React, { useState, useEffect } from 'react';
import products from '../data/Products';
import { useCart } from '../context/CartContext';
import './ProductGallery.css'; // Import the CSS file for styling

const ProductGallery = ({ searchTerm }) => {
  const [sortCriteria, setSortCriteria] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([...products]);
  const { addItemToCart } = useCart(); // Use the Cart context

  useEffect(() => {
    filterProducts(searchTerm, sortCriteria);
  }, [searchTerm, sortCriteria]);

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const filterProducts = (searchTerm, criteria) => {
    let filteredArray = products.filter(product => {
      const matchesCategory = product.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCriteria = criteria === 'all' || product.category === criteria;
      return (matchesCategory || matchesTag) && matchesCriteria;
    });

    setFilteredProducts(filteredArray);
  };

  return (
    <div className="product-gallery-container">
      <div className="sorting-options">
        <label htmlFor="sort">Sort By: </label>
        <select id="sort" value={sortCriteria} onChange={handleSortChange}>
          <option value="all">All</option>
          <option value="tip boards">Tip Boards</option>
          <option value="coin boards">Coin Boards</option>
          <option value="tip jars">Tip Jars</option>
          <option value="instant winners">Instant Winners</option>
          <option value="bingo dobbers">Bingo Dobbers</option>
          <option value="bonus boards">Bonus Boards</option> {/* New sorting option */}
          <option value="bingo games">Bingo Games</option> {/* New sorting option */}
          <option value="scratch off boards">Scratch Off Boards</option> {/* New sorting option */}
          <option value="bingo card games">Bingo Card Games</option> {/* New sorting option */}
          <option value="raffle tickets">Raffle Tickets</option> {/* New sorting option */}
        </select>
      </div>
      <div className="product-gallery">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">{product.price}</p>
            <button onClick={() => addItemToCart(product)} className="add-to-cart-button">Add to Cart</button> {/* Add to Cart button */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;