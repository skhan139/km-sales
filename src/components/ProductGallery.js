import React, { useState, useEffect } from 'react';
import products from '../data/Products';
import { useCart } from '../context/CartContext';
import ProductModal from './ProductModal'; // Import the ProductModal component
import './ProductGallery.css'; // Import the CSS file for styling

const itemsPerPage = 30; // Number of items to display per page

const ProductGallery = ({ searchTerm }) => {
  const [sortCriteria, setSortCriteria] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([...products]);
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const [selectedProduct, setSelectedProduct] = useState(null); // State for the selected product
  const { addItemToCart } = useCart(); // Use the Cart context

  useEffect(() => {
    filterProducts(searchTerm, sortCriteria);
  }, [searchTerm, sortCriteria]);

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const filterProducts = (searchTerm, criteria) => {
    let filteredArray = products.filter(product => {
      const matchesName = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = product.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCriteria = criteria === 'all' || product.category === criteria;
      return (matchesName || matchesCategory || matchesTag) && matchesCriteria;
    });

    setFilteredProducts(filteredArray);
    setCurrentPage(1); // Reset to the first page whenever the filter changes
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="product-gallery-container">
      <div className="sorting-options">
        <label htmlFor="sort">Sort By: </label>
        <select id="sort" value={sortCriteria} onChange={handleSortChange}>
          <option value="all">All</option>
          <option value="tip boards">Tip Boards</option>
          <option value="coin boards">Coin Boards</option>
          <option value="tip jars">Tip Jars</option>
          <option value="instant winner 180's">Instant Winner 180's</option>
          <option value="instant winner 220's">Instant Winner 220's</option>
          <option value="bingo dobbers">Bingo Dobbers</option>
          <option value="bonus boards">Bonus Boards</option>
          <option value="bingo games">Bingo Games</option>
          <option value="scratch off boards">Scratch Off Boards</option>
          <option value="bingo card games">Bingo Card Games</option>
          <option value="raffle tickets">Raffle Tickets</option>
        </select>
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className="product-gallery">
        {displayedProducts.map((product) => (
          <div key={product.id} className="product-card" onClick={() => handleProductClick(product)}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">{product.price}</p>
            <button onClick={(e) => { e.stopPropagation(); addItemToCart(product); }} className="add-to-cart-button">Add to Cart</button> {/* Add to Cart button */}
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <ProductModal product={selectedProduct} onClose={handleCloseModal} />
    </div>
  );
};

export default ProductGallery;