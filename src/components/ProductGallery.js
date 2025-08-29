import React, { useState, useEffect } from 'react';
import products from '../data/Products';
import { useCart } from '../context/CartContext';
import ProductModal from './ProductModal'; // Import the ProductModal component
import QuantitySelectionModal from './QuantitySelectionModal'; // Import the QuantitySelectionModal component
import './ProductGallery.css'; // Import the CSS file for styling
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase'; // Import Firebase configuration
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import Slider from 'react-slick'; // Import the Slider component

const itemsPerPage = 30; // Number of items to display per page

const ProductGallery = ({ searchTerm }) => {
  const [sortCriteria, setSortCriteria] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([...products]);
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const [selectedProduct, setSelectedProduct] = useState(null); // State for the selected product
  const [viewMode, setViewMode] = useState('categories'); // State for the view mode
  const [isQuantityModalOpen, setIsQuantityModalOpen] = useState(false); // State for the quantity selection modal
  const [showPopup, setShowPopup] = useState(true); // State for showing/hiding the pop-up
  const { addItemToCart } = useCart(); // Use the Cart context
  const [showSlider, setShowSlider] = useState(true); // State to control slider visibility

  const [user] = useAuthState(auth); // Get the authenticated user
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show only one image at a time
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    filterProducts(searchTerm, sortCriteria);
  }, [searchTerm, sortCriteria]);

  const handleClosePopup = () => {
    setShowPopup(false); // Hide the pop-up when the close button is clicked
  };

  const handleSortChange = (criteria) => {
    setShowSlider(false); // Hide the slider when a category is selected
    if (criteria === 'bingo paper') {
      const filteredArray = products.filter(product =>
        product.tags.includes('packs') || product.tags.includes('paper')
      );
      setFilteredProducts(filteredArray);
    } else {
      setSortCriteria(criteria);
      setViewMode('products'); // Switch to product view mode
    }
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

  const handleAddToCartClick = (product) => {
    setSelectedProduct(product); // Set the selected product to open the modal
  };

  const handleQuantityModalClose = () => {
    setIsQuantityModalOpen(false);
    setSelectedProduct(null);
  };

  const handleQuantityModalSubmit = (quantity, quantityType) => {
    addItemToCart({ ...selectedProduct, quantity, quantityType });
    setIsQuantityModalOpen(false);
    setSelectedProduct(null);
  };

  const handlePriceFilterChange = (event) => {
    const value = event.target.value;
    let min, max;
    switch (value) {
      case '10-191':
        min = 10;
        max = 191;
        break;
      case '192-500':
        min = 192;
        max = 500;
        break;
      case '501-1000':
        min = 501;
        max = 1000;
        break;
      case '1001-2000':
        min = 1001;
        max = 2000;
        break;
      case '2001+':
        min = 2001;
        max = null;
        break;
      default:
        min = 0;
        max = null;
    }
    const filteredArray = products.filter(product => {
      if (!product.takeIn) return false; // Ensure takeIn exists
      const takeIn = parseFloat(product.takeIn.replace(/[^0-9.-]+/g, ""));
      return takeIn >= min && (max === null || takeIn <= max);
    });
    setFilteredProducts(filteredArray);
    setCurrentPage(1); // Reset to the first page whenever the filter changes
  };

  const handleDenominationFilterChange = (event) => {
    const value = event.target.value;
    const filteredArray = products.filter(product => product.denomination === value);
    setFilteredProducts(filteredArray);
    setCurrentPage(1); // Reset to the first page whenever the filter changes
  };

  const handleWindowsFilterChange = (event) => {
    const value = event.target.value;
    const filteredArray = products.filter(product => product.window === value);
    setFilteredProducts(filteredArray);
    setCurrentPage(1); // Reset to the first page whenever the filter changes
  };
  const handleBundleFilterChange = (event) => {
    const value = event.target.value;
    const filteredArray = products.filter(product => product.bundle === value);
    setFilteredProducts(filteredArray);
    setCurrentPage(1); // Reset to the first page whenever the filter changes
  };

  const handleSealFilterChange = (event) => {
    const value = event.target.value;
    let min, max;
    switch (value) {
      case '50-100':
        min = 50;
        max = 100;
        break;
      case '200-300':
        min = 200;
        max = 300;
        break;
      case '400-599':
        min = 400;
        max = 599;
        break;
      case '600+':
        min = 600;
        max = null;
        break;
      default:
        min = 0;
        max = null;
    }
    const filteredArray = products.filter(product => {
      if (!product.seal) return false; // Ensure seal exists
      const seal = parseFloat(product.seal.replace(/[^0-9.-]+/g, ""));
      return seal >= min && (max === null || seal <= max);
    });
    setFilteredProducts(filteredArray);
    setCurrentPage(1); // Reset to the first page whenever the filter changes
  };

  const handleProfitPercentFilterChange = (event) => {
    const value = event.target.value;
    let min, max;
    switch (value) {
      case '15-25':
        min = 15;
        max = 25;
        break;
      case '26-35':
        min = 26;
        max = 35;
        break;
      case '36-45':
        min = 36;
        max = 45;
        break;
      case '46+':
        min = 46;
        max = null;
        break;
      default:
        min = 0;
        max = null;
    }
    const filteredArray = products.filter(product => {
      if (!product.profitPercent) return false; // Ensure profitPercent exists
      const profitPercent = parseFloat(product.profitPercent.replace(/[^0-9.-]+/g, ""));
      return profitPercent >= min && (max === null || profitPercent <= max);
    });
    setFilteredProducts(filteredArray);
    setCurrentPage(1); // Reset to the first page whenever the filter changes
  };

  const handleBottomPayoutFilterChange = (event) => {
    const value = event.target.value;
    let min, max;
    switch (value) {
      case '$0.50':
        min = 0.5;
        max = 0.5;
        break;
      case '$1':
        min = 1;
        max = 1;
        break;
      case '$2':
        min = 2;
        max = 2;
        break;
      case '$5':
        min = 5;
        max = 5;
        break;
      case '$10':
        min = 10;
        max = 10;
        break;
      case '>$10':
        min = 10.01;
        max = null;
        break;
      default:
        min = 0;
        max = null;
    }
    const filteredArray = products.filter(product => {
      if (!product.bottomPayout) return false; // Ensure bottomPayout exists
      const bottomPayout = parseFloat(product.bottomPayout.replace(/[^0-9.-]+/g, ""));
      return bottomPayout >= min && (max === null || bottomPayout <= max);
    });
    setFilteredProducts(filteredArray);
    setCurrentPage(1); // Reset to the first page whenever the filter changes
  };

  const handleFavoriteClick = async (product) => {
    if (!user) {
      alert('Please log in to favorite products.');
      return;
    }
  
    try {
      const userDoc = doc(db, 'users', user.email); // Reference to the user's document
      const docSnap = await getDoc(userDoc); // Check if the document exists
  
      if (!docSnap.exists()) {
        // Create the document if it doesn't exist
        await setDoc(userDoc, { favorites: [] });
      }
  
      // Add the product to the favorites array
      await updateDoc(userDoc, {
        favorites: arrayUnion({
          id: product.id,
          name: product.name,
          image: product.images ? product.images[0] : product.image, // Use the first image if available
        }),
      });
  
      alert(`${product.name} has been added to your favorites!`);
    } catch (error) {
      console.error('Error adding to favorites:', error);
      alert('An error occurred while adding to favorites. Please try again.');
    }
  };
  const handleThemeChange = (theme) => {
    // Filter products by theme
    const filtered = products.filter((product) => product.theme === theme);
    setFilteredProducts(filtered); // Update the state with filtered products
  };
  const handleClearFilters = () => {
    setSortCriteria('all'); // Reset the sort criteria
    setFilteredProducts([...products]); // Reset the filtered products to all products
    setCurrentPage(1); // Reset to the first page
  
    // Reset all dropdown filters to "Select"
    const filterDropdowns = document.querySelectorAll('.filter-group select');
    filterDropdowns.forEach((dropdown) => {
      dropdown.value = ''; // Reset the dropdown to its default "Select" state
    });
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
          <div className="category-card" onClick={() => handleSortChange('tabs')}>
            <img src="/assets/images/bigrig.jpg" alt="Shop Tip Jars" className="category-image" />
            <h2 className="category-name">Shop Pull Tabs</h2>
          </div>
          <div className="category-card" onClick={() => handleSortChange('instant')}>
            <img src="/assets/images/captainjacks.jpg" alt="Shop Tickets" className="category-image" />
            <h2 className="category-name">Shop Instant Winners</h2>
          </div>
          <div className="category-card" onClick={() => handleSortChange('bingo')}>
            <img src="/assets/images/bingopaper.jpg" alt="Shop Bingo Supplies" className="category-image" />
            <h2 className="category-name">Shop Bingo Supplies</h2>
          </div>
          <div className="category-card" onClick={() => handleSortChange('tip boards')}>
            <img src="/assets/images/24suretip.jpg" alt="Shop Tip Boards" className="category-image" />
            <h2 className="category-name">Shop Tip Boards</h2>
          </div>
          <div className="category-card" onClick={() => handleSortChange('tip jars')}>
            <img src="/assets/images/doublejugs.jpg" alt="Shop Tip Jars" className="category-image" />
            <h2 className="category-name">Shop Tip Jars</h2>
          </div>
          <div className="category-card" onClick={() => handleSortChange('all')}>
            <img src="/assets/images/redwhiteandblue.jpg" alt="Shop All" className="category-image" />
            <h2 className="category-name">Shop All</h2>
          </div>
        </div>
      ) : (
        <>
          <button onClick={handleBackToMainPage} className="back-button">Back to Main Page</button>
          <div className="sorting-options">
            <nav className="sort-navbar">
            <div className="sort-row">
  <h3 className="label">
    <button onClick={() => handleSortChange('all')}>All Products</button>
  </h3>
</div>
{showPopup && (
        <div className="discount-popup">
          <button className="popup-close-button" onClick={handleClosePopup}>X</button>
          <h3>Ordering For A Bash Or Large Fundraising Event?</h3>
          <p>Get 10% off your order. Use code: <strong>KMBASH</strong></p>
        </div>
      )}
<div className="sort-row">
  <div className="dropdown">
    <button className="dropdown-button">Boards</button>
    <div className="dropdown-content">
  <button onClick={() => handleSortChange('tip boards')}>Tip Boards</button>
  <button onClick={() => handleSortChange('coin boards')}>Coin Boards</button>
  <button onClick={() => handleSortChange('bonus boards')}>Bonus Boards</button>
  <button onClick={() => handleSortChange('scratch off boards')}>Scratch Off Boards</button>
  <button onClick={() => handleSortChange('merchandise boards')}>Merchandise Boards</button>
  <button onClick={() => handleSortChange('gun boards')}>Gun Boards</button> {/* New Button */}
  <button onClick={() => handleSortChange('knife boards')}>Knife Boards</button> {/* New Button */}
</div>
  </div>
</div>
<div className="sort-row">
<div className="dropdown">
  <button className="dropdown-button">Games/Tickets</button>
  <div className="dropdown-content">
  <button onClick={() => handleSortChange('pull tabs')}>Pull Tabs</button>
  <button onClick={() => handleSortChange("instant winners")}>Instant Winners</button>
  <button onClick={() => handleSortChange("strip tickets")}>Strip Tickets</button>
  <button onClick={() => handleSortChange('raffle tickets')}>Raffle Tickets</button>
  <button onClick={() => handleSortChange('elimination games')}>Elimination Games</button>
  <button onClick={() => handleSortChange('chip games')}>Chip Games</button>
  <button onClick={() => handleSortChange('variety packs')}>Variety Pack</button> {/* New button */}
  <button onClick={() => handleSortChange('tip jars')}>Tip Jars</button> {/* New button */}
</div>
</div>
</div>
<div className="sort-row">
  <div className="dropdown">
    <button className="dropdown-button">Bingo Supplies</button>
    <div className="dropdown-content">
      <button onClick={() => handleSortChange('bingo daubers')}>Bingo Daubers</button>
      <button onClick={() => handleSortChange('bingo games')}>Bingo Games</button>
      <button onClick={() => handleSortChange('bingo card games')}>Bingo Card Games</button>
      <button onClick={() => handleSortChange('bingo paper')}>Bingo Paper</button> {/* New Button */}
    </div>
  </div>
  <div className="sort-row">
        <div className="dropdown">
          <button className="dropdown-button">Sort By Theme</button>
          <div className="dropdown-content">
            <button onClick={() => handleThemeChange('sports')}>Sports</button>
            <button onClick={() => handleThemeChange('christmas')}>Christmas</button>
            <button onClick={() => handleThemeChange('halloween')}>Halloween</button>
            <button onClick={() => handleThemeChange('Easter')}>Easter</button>
            <button onClick={() => handleThemeChange('spring')}>Spring</button>
            <button onClick={() => handleThemeChange('fall')}>Fall</button>
            <button onClick={() => handleThemeChange('winter')}>Winter</button>
            <button onClick={() => handleThemeChange('summer')}>Summer</button>
            <button onClick={() => handleThemeChange('valentines')}>Valentines</button>
            <button onClick={() => handleThemeChange('st patricks')}>St. Patricks Day</button>
            <button onClick={() => handleThemeChange('usa')}>USA</button>
            <button onClick={() => handleThemeChange('police')}>Law Enforcement</button>
            <button onClick={() => handleThemeChange('firefighters')}>Fire And Rescue</button>
            <button onClick={() => handleThemeChange('military')}>Military</button>
          </div>
        </div>
</div>
  <button onClick={handleClearFilters} className="clear-filters-button">
    Clear Filters
  </button>
</div>
            </nav>
          </div>
          <div className="filter-options">
  <div className="filter-group">
    <h3>Sort By Ticket Count</h3>
    <select onChange={handlePriceFilterChange}>
      <option value="">Select</option>
      <option value="10-191">10 - 191 Ticket Count</option>
      <option value="192-500">192 - 500 Ticket Count</option>
      <option value="501-1000">501 - 1000 Ticket Count</option>
      <option value="1001-2000">1001 - 2000 Ticket Count</option>
      <option value="2001+">2000+ Ticket Count</option>
    </select>
  </div>
  <div className="filter-group">
    <h3>Sort By Game Seal</h3>
    <select onChange={handleSealFilterChange}>
      <option value="">Select</option>
      <option value="50-100">$50 - $100</option>
      <option value="200-300">$200 - $300</option>
      <option value="400-599">$400 - $599</option>
      <option value="600+">$600+</option>
    </select>
  </div>
  <div className="filter-group">
    <h3>Sort By Profit Percent</h3>
    <select onChange={handleProfitPercentFilterChange}>
      <option value="">Select</option>
      <option value="15-25">15-25%</option>
      <option value="26-35">26-35%</option>
      <option value="36-45">36-45%</option>
      <option value="46+">46% +</option>
    </select>
  </div>
  <div className="filter-group">
  <h3>Sort By Denomination</h3>
  <select onChange={handleDenominationFilterChange}>
    <option value="">Select</option>
    <option value="$0.25">$.25</option>
    <option value="$0.50">$.50</option>
    <option value="$1">$1</option>
    <option value="$2">$2</option>
  </select>
</div>
<div className="filter-group">
  <h3>Sort By Windows</h3>
  <select onChange={handleWindowsFilterChange}>
    <option value="">Select</option>
    <option value="1">1 Window</option>
    <option value="3">3 Windows</option>
    <option value="5">5 Windows</option>
  </select>
</div>
  <div className="filter-group">
  <h3>Sort By Bundle</h3>
  <select onChange={handleBundleFilterChange}>
    <option value="">Select</option>
    <option value="3">Bundle of 3</option>
    <option value="4">Bundle of 4</option>
    <option value="5">Bundle of 5</option>
  </select>
</div>
<div className="filter-group">
    <h3>Sort By Bottom Payout</h3>
    <select onChange={handleBottomPayoutFilterChange}>
      <option value="">Select</option>
      <option value="$0.50">$0.50</option>
      <option value="$1">$1</option>
      <option value="$2">$2</option>
      <option value="$5">$5</option>
      <option value="$10">$10</option>
      <option value=">$10">Over $10</option>
    </select>
  </div>
</div>
          <div className="pagination">
          <button
  onClick={() => handlePageChange(currentPage - 1)}
  className="pagination-button"
  disabled={currentPage === 1} // Disable the "Previous" button on the first page
>
  <i className="fa fa-arrow-left" aria-hidden="true"></i> Previous
</button>
  {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
    const pageNumber = currentPage <= 3 ? index + 1 : currentPage - 2 + index;
    if (pageNumber > totalPages) return null; // Don't render buttons beyond the total pages
    return (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`pagination-button ${currentPage === pageNumber ? 'active' : ''}`}
      >
        {pageNumber}
      </button>
    );
  })}
<button
  onClick={() => handlePageChange(currentPage + 1)}
  className="pagination-button"
  disabled={currentPage === totalPages} // Disable the "Next" button on the last page
>
  Next <i className="fa fa-arrow-right" aria-hidden="true"></i>
</button>
</div>
          <div className="product-gallery">
  {displayedProducts.length === 0 ? (
    <p>Sorry, there are no products in this category.</p>
  ) : (
    displayedProducts.map((product) => (
      <div key={product.id} className="product-card" onClick={() => handleProductClick(product)}>
        <img
          src={product.images ? product.images[0] : product.image} // Use the first image if multiple images exist
          alt={product.name}
          className="product-image"
        />
        <h2 className="product-name">{product.name}</h2>
        <div className="more-info">More Info</div>
        <br /> <br />
        <button
  onClick={(e) => {
    e.stopPropagation();
    handleAddToCartClick(product);
  }}
  className="add-to-cart-button"
>
  <i className="fa fa-shopping-cart" aria-hidden="true"></i> Add to Cart
</button>
      </div>
    ))
  )}
</div>
<div className="pagination">
<button
  onClick={() => handlePageChange(currentPage - 1)}
  className="pagination-button"
  disabled={currentPage === 1} // Disable the "Previous" button on the first page
>
  <i className="fa fa-arrow-left" aria-hidden="true"></i> Previous
</button>
  {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
    const pageNumber = currentPage <= 3 ? index + 1 : currentPage - 2 + index;
    if (pageNumber > totalPages) return null; // Don't render buttons beyond the total pages
    return (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`pagination-button ${currentPage === pageNumber ? 'active' : ''}`}
      >
        {pageNumber}
      </button>
    );
  })}
  <button
  onClick={() => handlePageChange(currentPage + 1)}
  className="pagination-button"
  disabled={currentPage === totalPages} // Disable the "Next" button on the last page
>
  Next <i className="fa fa-arrow-right" aria-hidden="true"></i>
</button>
</div>
        </>
      )}
      <ProductModal
  product={selectedProduct}
  onClose={handleCloseModal}
  onFavorite={handleFavoriteClick} // Pass the handleFavoriteClick function as a prop
/>
{selectedProduct && (
  <QuantitySelectionModal
    isOpen={isQuantityModalOpen}
    onRequestClose={handleQuantityModalClose}
    onSubmit={handleQuantityModalSubmit}
    product={selectedProduct}
  />
)}
    </div>
  );
};

export default ProductGallery;