import React, { useEffect, useMemo, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

import products from '../data/Products';
import { useCart } from '../context/CartContext';
import ProductModal from './ProductModal';
import QuantitySelectionModal from './QuantitySelectionModal';
import { auth, db } from '../firebase';
import './ProductGallery.css';

const ITEMS_PER_PAGE = 30;

const categories = [
  {
    name: 'Boards',
    description: 'Browse all game and merchandise boards.',
    criteria: 'boards',
    image: 'hogsandkisses.jpg',
  },
  {
    name: 'Pull Tabs',
    description: 'Explore our complete pull-tab selection.',
    criteria: 'tabs',
    image: 'bigrig.jpg',
  },
  {
    name: 'Instant Winners',
    description: 'Find instant-win games and tickets.',
    criteria: 'instant',
    image: 'captainjacks.jpg',
  },
  {
    name: 'Bingo Supplies',
    description: 'Paper, daubers, games, and more.',
    criteria: 'bingo',
    image: 'bingopaper.jpg',
  },
  {
    name: 'Tip Boards',
    description: 'Browse tip boards for your organization.',
    criteria: 'tip boards',
    image: '24suretip.jpg',
  },
  {
    name: 'Tip Jars',
    description: 'Shop popular tip-jar games.',
    criteria: 'tip jars',
    image: 'doublejugs.jpg',
  },
  {
    name: 'All Products',
    description: 'View the complete K&M product catalog.',
    criteria: 'all',
    image: 'redwhiteandblue.jpg',
  },
];

const menuGroups = [
  {
    label: 'Boards',
    options: [
      ['Tip Boards', 'tip boards'],
      ['Coin Boards', 'coin boards'],
      ['Bonus Boards', 'bonus boards'],
      ['Scratch-Off Boards', 'scratch off boards'],
      ['Merchandise Boards', 'merchandise boards'],
      ['Gun Boards', 'gun boards'],
      ['Knife Boards', 'knife boards'],
    ],
  },
  {
    label: 'Games and Tickets',
    options: [
      ['Pull Tabs', 'pull tabs'],
      ['Instant Winners', 'instant winners'],
      ['Strip Tickets', 'strip tickets'],
      ['Raffle Tickets', 'raffle tickets'],
      ['Elimination Games', 'elimination games'],
      ['Chip Games', 'chip games'],
      ['Variety Packs', 'variety packs'],
      ['Tip Jars', 'tip jars'],
    ],
  },
  {
    label: 'Bingo Supplies',
    options: [
      ['Bingo Daubers', 'bingo daubers'],
      ['Bingo Games', 'bingo games'],
      ['Bingo Card Games', 'bingo card games'],
      ['Bingo Paper', 'bingo paper'],
    ],
  },
];

const themes = [
  ['Sports', 'sports'],
  ['Christmas', 'christmas'],
  ['Halloween', 'halloween'],
  ['Easter', 'easter'],
  ['Spring', 'spring'],
  ['Fall', 'fall'],
  ['Winter', 'winter'],
  ['Summer', 'summer'],
  ['Valentine’s Day', 'valentines'],
  ['St. Patrick’s Day', 'st patricks'],
  ['USA', 'usa'],
  ['Law Enforcement', 'police'],
  ['Fire and Rescue', 'firefighters'],
  ['Military', 'military'],
];

const initialFilters = {
  ticketCount: '',
  seal: '',
  profitPercent: '',
  denomination: '',
  windows: '',
  bundle: '',
  bottomPayout: '',
  theme: '',
};

const parseNumber = (value) => {
  if (value === undefined || value === null) {
    return null;
  }

  const parsedValue = Number.parseFloat(
    String(value).replace(/[^0-9.-]+/g, '')
  );

  return Number.isFinite(parsedValue) ? parsedValue : null;
};

const isWithinRange = (number, range) => {
  if (number === null || !range) {
    return !range;
  }

  const [minimum, maximum] = range;

  return (
    number >= minimum &&
    (maximum === null || number <= maximum)
  );
};

const getNumericRange = (value) => {
  const ranges = {
    '10-191': [10, 191],
    '192-500': [192, 500],
    '501-1000': [501, 1000],
    '1001-2000': [1001, 2000],
    '2001+': [2001, null],
    '50-100': [50, 100],
    '200-300': [200, 300],
    '400-599': [400, 599],
    '600+': [600, null],
    '15-25': [15, 25],
    '26-35': [26, 35],
    '36-45': [36, 45],
    '46+': [46, null],
    '$0.50': [0.5, 0.5],
    '$1': [1, 1],
    '$2': [2, 2],
    '$5': [5, 5],
    '$10': [10, 10],
    '>$10': [10.01, null],
  };

  return ranges[value] || null;
};

const ProductGallery = ({ searchTerm = '' }) => {
  const [user] = useAuthState(auth);
  const { addItemToCart } = useCart();

  const [viewMode, setViewMode] = useState('categories');
  const [category, setCategory] = useState('all');
  const [filters, setFilters] = useState(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] =
    useState(null);
  const [cartProduct, setCartProduct] = useState(null);
  const [isQuantityModalOpen, setIsQuantityModalOpen] =
    useState(false);
  const [favoriteProductId, setFavoriteProductId] =
    useState(null);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const productName = String(
        product.name || ''
      ).toLowerCase();

      const productCategory = String(
        product.category || ''
      ).toLowerCase();

      const productTags = Array.isArray(product.tags)
        ? product.tags.map((tag) =>
            String(tag).toLowerCase()
          )
        : [];

      const productTheme = String(
        product.theme || ''
      ).toLowerCase();

      const matchesSearch =
        !normalizedSearch ||
        productName.includes(normalizedSearch) ||
        productCategory.includes(normalizedSearch) ||
        productTags.some((tag) =>
          tag.includes(normalizedSearch)
        );

      const matchesCategory =
        category === 'all' ||
        (category === 'bingo paper'
          ? productTags.includes('packs') ||
            productTags.includes('paper')
          : productTags.includes(category) ||
            productCategory === category);

      const matchesTheme =
        !filters.theme ||
        productTheme === filters.theme.toLowerCase();

      const matchesTicketCount =
        !filters.ticketCount ||
        isWithinRange(
          parseNumber(product.takeIn),
          getNumericRange(filters.ticketCount)
        );

      const matchesSeal =
        !filters.seal ||
        isWithinRange(
          parseNumber(product.seal),
          getNumericRange(filters.seal)
        );

      const matchesProfit =
        !filters.profitPercent ||
        isWithinRange(
          parseNumber(product.profitPercent),
          getNumericRange(filters.profitPercent)
        );

      const matchesBottomPayout =
        !filters.bottomPayout ||
        isWithinRange(
          parseNumber(product.bottomPayout),
          getNumericRange(filters.bottomPayout)
        );

      const matchesDenomination =
        !filters.denomination ||
        String(product.denomination) ===
          filters.denomination;

      const matchesWindows =
        !filters.windows ||
        String(product.window) === filters.windows;

      const matchesBundle =
        !filters.bundle ||
        String(product.bundle) === filters.bundle;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesTheme &&
        matchesTicketCount &&
        matchesSeal &&
        matchesProfit &&
        matchesBottomPayout &&
        matchesDenomination &&
        matchesWindows &&
        matchesBundle
      );
    });
  }, [searchTerm, category, filters]);

  useEffect(() => {
    setCurrentPage(1);

    if (searchTerm.trim()) {
      setViewMode('products');
    }
  }, [searchTerm, category, filters]);

  const totalPages = Math.ceil(
    filteredProducts.length / ITEMS_PER_PAGE
  );

  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const visiblePageNumbers = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }

    const firstPage = Math.min(
      Math.max(currentPage - 2, 1),
      totalPages - 4
    );

    return Array.from(
      { length: 5 },
      (_, index) => firstPage + index
    );
  }, [currentPage, totalPages]);

  const activeFilterCount =
    Object.values(filters).filter(Boolean).length +
    (category !== 'all' ? 1 : 0);

  const handleCategoryChange = (criteria) => {
    setCategory(criteria);
    setViewMode('products');
    setCurrentPage(1);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [filterName]: value,
    }));
  };

  const handleClearFilters = () => {
    setCategory('all');
    setFilters(initialFilters);
    setCurrentPage(1);
  };

  const handleBackToCategories = () => {
    setViewMode('categories');
    handleClearFilters();
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }

    setCurrentPage(pageNumber);

    document
      .querySelector('.members-catalog')
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
  };

  const handleAddToCartClick = (event, product) => {
    event.stopPropagation();
    setCartProduct(product);
    setIsQuantityModalOpen(true);
  };

  const handleQuantityModalClose = () => {
    setIsQuantityModalOpen(false);
    setCartProduct(null);
  };

 const handleQuantityModalSubmit = (selection) => {
  if (!cartProduct) {
    return;
  }

  addItemToCart({
    ...cartProduct,
    ...selection,
  });

  handleQuantityModalClose();
};

  const handleFavoriteClick = async (product) => {
    if (!user) {
      window.alert(
        'Please sign in before adding favorites.'
      );
      return;
    }

    setFavoriteProductId(product.id);

    try {
      const userDocument = doc(db, 'users', user.email);
      const userSnapshot = await getDoc(userDocument);

      if (!userSnapshot.exists()) {
        await setDoc(userDocument, {
          favorites: [],
        });
      }

      await updateDoc(userDocument, {
        favorites: arrayUnion({
          id: product.id,
          name: product.name,
          image: product.images?.[0] || product.image,
        }),
      });

      window.alert(
        `${product.name} was added to your favorites.`
      );
    } catch (error) {
      console.error(
        'Error adding product to favorites:',
        error
      );

      window.alert(
        'The product could not be added to your favorites.'
      );
    } finally {
      setFavoriteProductId(null);
    }
  };

  const renderPagination = (location) => {
    if (totalPages <= 1) {
      return null;
    }

    return (
      <nav
        className="product-pagination"
        aria-label={`${location} product pagination`}
      >
        <button
          type="button"
          className="pagination-button pagination-direction"
          disabled={currentPage === 1}
          onClick={() =>
            handlePageChange(currentPage - 1)
          }
        >
          <span aria-hidden="true">←</span>
          Previous
        </button>

        <div className="pagination-pages">
          {visiblePageNumbers.map((pageNumber) => (
            <button
              type="button"
              key={pageNumber}
              className={`pagination-button ${
                currentPage === pageNumber
                  ? 'active'
                  : ''
              }`}
              aria-label={`Go to page ${pageNumber}`}
              aria-current={
                currentPage === pageNumber
                  ? 'page'
                  : undefined
              }
              onClick={() =>
                handlePageChange(pageNumber)
              }
            >
              {pageNumber}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="pagination-button pagination-direction"
          disabled={currentPage === totalPages}
          onClick={() =>
            handlePageChange(currentPage + 1)
          }
        >
          Next
          <span aria-hidden="true">→</span>
        </button>
      </nav>
    );
  };

  return (
    <div className="product-gallery-container">
      {viewMode === 'categories' ? (
        <section
          className="category-gallery"
          aria-label="Product categories"
        >
          {categories.map((categoryItem, index) => (
            <button
              type="button"
              className="category-card"
              key={categoryItem.criteria}
              onClick={() =>
                handleCategoryChange(
                  categoryItem.criteria
                )
              }
            >
              <img
                src={`/assets/images/${categoryItem.image}`}
                alt=""
                className="category-image"
              />

              <span className="category-shade" />

              <span className="category-number">
                {String(index + 1).padStart(2, '0')}
              </span>

              <span className="category-copy">
                <strong className="category-name">
                  {categoryItem.name}
                </strong>

                <small>
                  {categoryItem.description}
                </small>

                <span className="category-action">
                  Browse products
                  <span aria-hidden="true">→</span>
                </span>
              </span>
            </button>
          ))}
        </section>
      ) : (
        <>
          <div className="gallery-toolbar">
            <button
              type="button"
              className="gallery-back-button"
              onClick={handleBackToCategories}
            >
              <span aria-hidden="true">←</span>
              Product categories
            </button>

            <div className="gallery-result-count">
              <strong>{filteredProducts.length}</strong>
              <span>
                {filteredProducts.length === 1
                  ? 'product'
                  : 'products'}
              </span>
            </div>
          </div>

          <div className="products-layout">
            <aside className="filters-sidebar">
              <div className="filter-sidebar-header">
                <div>
                  <p>Refine catalog</p>
                  <h2>Filters</h2>
                </div>

                {activeFilterCount > 0 && (
                  <span>{activeFilterCount}</span>
                )}
              </div>

              <div className="sorting-options">
                <button
                  type="button"
                  className={`all-products-button ${
                    category === 'all' ? 'active' : ''
                  }`}
                  onClick={() =>
                    handleCategoryChange('all')
                  }
                >
                  All Products
                  <span aria-hidden="true">→</span>
                </button>

                {menuGroups.map((group) => (
                  <details
                    className="filter-disclosure"
                    key={group.label}
                  >
                    <summary>
                      {group.label}
                      <span aria-hidden="true">+</span>
                    </summary>

                    <div className="filter-menu">
                      {group.options.map(
                        ([label, value]) => (
                          <button
                            type="button"
                            key={value}
                            className={
                              category === value
                                ? 'active'
                                : ''
                            }
                            onClick={() =>
                              handleCategoryChange(value)
                            }
                          >
                            {label}
                          </button>
                        )
                      )}
                    </div>
                  </details>
                ))}

                <details className="filter-disclosure">
                  <summary>
                    Themes
                    <span aria-hidden="true">+</span>
                  </summary>

                  <div className="filter-menu">
                    {themes.map(([label, value]) => (
                      <button
                        type="button"
                        key={value}
                        className={
                          filters.theme === value
                            ? 'active'
                            : ''
                        }
                        onClick={() =>
                          handleFilterChange(
                            'theme',
                            value
                          )
                        }
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </details>
              </div>

              <div className="filter-options">
                <FilterSelect
                  label="Ticket Count"
                  value={filters.ticketCount}
                  onChange={(value) =>
                    handleFilterChange(
                      'ticketCount',
                      value
                    )
                  }
                  options={[
                    ['10–191 tickets', '10-191'],
                    ['192–500 tickets', '192-500'],
                    ['501–1,000 tickets', '501-1000'],
                    ['1,001–2,000 tickets', '1001-2000'],
                    ['2,001+ tickets', '2001+'],
                  ]}
                />

                <FilterSelect
                  label="Game Seal"
                  value={filters.seal}
                  onChange={(value) =>
                    handleFilterChange('seal', value)
                  }
                  options={[
                    ['$50–$100', '50-100'],
                    ['$200–$300', '200-300'],
                    ['$400–$599', '400-599'],
                    ['$600+', '600+'],
                  ]}
                />

                <FilterSelect
                  label="Profit Percentage"
                  value={filters.profitPercent}
                  onChange={(value) =>
                    handleFilterChange(
                      'profitPercent',
                      value
                    )
                  }
                  options={[
                    ['15–25%', '15-25'],
                    ['26–35%', '26-35'],
                    ['36–45%', '36-45'],
                    ['46%+', '46+'],
                  ]}
                />

                <FilterSelect
                  label="Denomination"
                  value={filters.denomination}
                  onChange={(value) =>
                    handleFilterChange(
                      'denomination',
                      value
                    )
                  }
                  options={[
                    ['$0.25', '$0.25'],
                    ['$0.50', '$0.50'],
                    ['$1', '$1'],
                    ['$2', '$2'],
                  ]}
                />

                <FilterSelect
                  label="Windows"
                  value={filters.windows}
                  onChange={(value) =>
                    handleFilterChange(
                      'windows',
                      value
                    )
                  }
                  options={[
                    ['1 window', '1'],
                    ['3 windows', '3'],
                    ['5 windows', '5'],
                  ]}
                />

                <FilterSelect
                  label="Bundle"
                  value={filters.bundle}
                  onChange={(value) =>
                    handleFilterChange('bundle', value)
                  }
                  options={[
                    ['Bundle of 3', '3'],
                    ['Bundle of 4', '4'],
                    ['Bundle of 5', '5'],
                  ]}
                />

                <FilterSelect
                  label="Bottom Payout"
                  value={filters.bottomPayout}
                  onChange={(value) =>
                    handleFilterChange(
                      'bottomPayout',
                      value
                    )
                  }
                  options={[
                    ['$0.50', '$0.50'],
                    ['$1', '$1'],
                    ['$2', '$2'],
                    ['$5', '$5'],
                    ['$10', '$10'],
                    ['Over $10', '>$10'],
                  ]}
                />
              </div>

              <button
                type="button"
                className="clear-filters-button"
                onClick={handleClearFilters}
                disabled={activeFilterCount === 0}
              >
                Clear all filters
              </button>
            </aside>

            <section className="products-content">
              {renderPagination('Top')}

              {displayedProducts.length === 0 ? (
                <div className="gallery-empty-state">
                  <span aria-hidden="true">?</span>
                  <h2>No products found</h2>
                  <p>
                    Try changing your search or removing
                    some filters.
                  </p>

                  <button
                    type="button"
                    onClick={handleClearFilters}
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="product-gallery">
                  {displayedProducts.map((product) => (
                    <article
                      key={product.id}
                      className="product-card"
                    >
                      <button
                        type="button"
                        className="product-image-button"
                        aria-label={`View details for ${product.name}`}
                        onClick={() =>
                          setSelectedProduct(product)
                        }
                      >
                        <img
                          src={
                            product.images?.[0] ||
                            product.image
                          }
                          alt={product.name}
                          className="product-image"
                          loading="lazy"
                        />

                        <span className="more-info">
                          View details
                          <span aria-hidden="true">→</span>
                        </span>
                      </button>

                      <div className="product-card-content">
                        <p className="product-card-label">
                          K&amp;M Product
                        </p>

                        <h2 className="product-name">
                          {product.name}
                        </h2>

                        {product.denomination && (
                          <p className="product-meta">
                            Denomination:{' '}
                            {product.denomination}
                          </p>
                        )}

                        <button
                          type="button"
                          className="add-to-cart-button"
                          onClick={(event) =>
                            handleAddToCartClick(
                              event,
                              product
                            )
                          }
                        >
                          <span>Add to cart</span>
                          <span aria-hidden="true">+</span>
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {renderPagination('Bottom')}
            </section>
          </div>
        </>
      )}

     <ProductModal
  product={selectedProduct}
  onClose={() => setSelectedProduct(null)}
  onFavorite={handleFavoriteClick}
  favoriteLoading={
    favoriteProductId === selectedProduct?.id
  }
/>

{isQuantityModalOpen && cartProduct && (
  <QuantitySelectionModal
    isOpen={isQuantityModalOpen}
    onRequestClose={handleQuantityModalClose}
    onSubmit={handleQuantityModalSubmit}
    product={cartProduct}
  />
)}

      <QuantitySelectionModal
        isOpen={isQuantityModalOpen}
        onRequestClose={handleQuantityModalClose}
        onSubmit={handleQuantityModalSubmit}
        product={cartProduct}
      />
    </div>
  );
};

const FilterSelect = ({
  label,
  value,
  options,
  onChange,
}) => {
  const selectId = `filter-${label
    .toLowerCase()
    .replace(/\s+/g, '-')}`;

  return (
    <div className="filter-group">
      <label htmlFor={selectId}>{label}</label>

      <select
        id={selectId}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
      >
        <option value="">Any</option>

        {options.map(([optionLabel, optionValue]) => (
          <option
            value={optionValue}
            key={optionValue}
          >
            {optionLabel}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductGallery;