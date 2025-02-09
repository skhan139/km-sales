import React, { useState, useEffect } from 'react';
import products from '../data/Products';
import { useCart } from '../context/CartContext';
import ProductModal from './ProductModal'; // Import the ProductModal component
import './ProductGallery.css'; // Import the CSS file for styling

const itemsPerPage = 20; // Number of items to display per page

const ProductGallery = ({ searchTerm }) => {
  const [sortCriteria, setSortCriteria] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([...products]);
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const [selectedProduct, setSelectedProduct] = useState(null); // State for the selected product
  const [viewMode, setViewMode] = useState('categories'); // State for the view mode
  const { addItemToCart } = useCart(); // Use the Cart context

  useEffect(() => {
    filterProducts(searchTerm, sortCriteria);
  }, [searchTerm, sortCriteria]);

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
    setViewMode('products'); // Switch to product view mode
  };

  const filterProducts = (searchTerm, criteria) => {
    let filteredArray = products.filter(product => {
      const matchesName = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = product.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCriteria = criteria === 'all' || product.tags.includes(criteria) || product.category.toLowerCase() === criteria.toLowerCase();
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

  const handleBackToMainPage = () => {
    setViewMode('categories');
    setSortCriteria('all');
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="product-gallery-container">
      {viewMode === 'categories' ? (
        <div className="category-gallery">
          <div className="category-card" onClick={() => handleSortChange('boards')}>
            <img src="/assets/images/hogsandkisses.jpg" alt="Shop Boards" className="category-image" />
            <h2 className="category-name">Shop Boards</h2>
          </div>
          <div className="category-card" onClick={() => handleSortChange('jars')}>
            <img src="/assets/images/bigrig.jpg" alt="Shop Tip Jars" className="category-image" />
            <h2 className="category-name">Shop Tip Jars</h2>
          </div>
          <div className="category-card" onClick={() => handleSortChange('instant')}>
            <img src="/assets/images/captainjacks.jpg" alt="Shop Tickets" className="category-image" />
            <h2 className="category-name">Shop Tickets</h2>
          </div>
          <div className="category-card" onClick={() => handleSortChange('bingo')}>
            <img src="/assets/images/50csitipboard.jpg" alt="Shop Bingo Supplies" className="category-image" />
            <h2 className="category-name">Shop Bingo Supplies</h2>
          </div>
          <div className="category-card" onClick={() => handleSortChange('all')}>
            <img src="/assets/images/doubledeal.jpg" alt="Shop All" className="category-image" />
            <h2 className="category-name">Shop All</h2>
          </div>
        </div>
      ) : (
        <>
          <button onClick={handleBackToMainPage} className="back-button">Back to Main Page</button>
          <div className="sorting-options">
            <nav className="sort-navbar">
              <button onClick={() => handleSortChange('all')}>All</button>
              <button onClick={() => handleSortChange('tip boards')}>Tip Boards</button>
              <button onClick={() => handleSortChange('coin boards')}>Coin Boards</button>
              <button onClick={() => handleSortChange('tip jars')}>Tip Jars</button>
              <button onClick={() => handleSortChange("instant winner 180's")}>Instant Winner 180's</button>
              <button onClick={() => handleSortChange("instant winner 220's")}>Instant Winner 220's</button>
              <button onClick={() => handleSortChange('bingo dobbers')}>Bingo Dobbers</button>
              <button onClick={() => handleSortChange('bonus boards')}>Bonus Boards</button>
              <button onClick={() => handleSortChange('bingo games')}>Bingo Games</button>
              <button onClick={() => handleSortChange('scratch off boards')}>Scratch Off Boards</button>
              <button onClick={() => handleSortChange('bingo card games')}>Bingo Card Games</button>
              <button onClick={() => handleSortChange('raffle tickets')}>Raffle Tickets</button>
            </nav>
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
            {displayedProducts.length === 0 ? (
              <p>Sorry, there are no products in this category.</p>
            ) : (
              displayedProducts.map((product) => (
                <div key={product.id} className="product-card" onClick={() => handleProductClick(product)}>
                  <img src={product.image} alt={product.name} className="product-image" />
                  <h2 className="product-name">{product.name}</h2>
                  <p className="product-price">{product.price}</p>
                  <button onClick={(e) => { e.stopPropagation(); addItemToCart(product); }} className="add-to-cart-button">Add to Cart</button> {/* Add to Cart button */}
                </div>
              ))
            )}
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
        </>
      )}
      <ProductModal product={selectedProduct} onClose={handleCloseModal} />
    </div>
  );
};

export default ProductGallery;