import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useCart } from '../context/CartContext';
import './ProductModal.css';

const quantityOptions = Array.from(
  { length: 11 },
  (_, index) => index + 1
);

const ProductModal = ({
  product,
  onClose,
  onFavorite,
  favoriteLoading = false,
}) => {
  const { addItemToCart } = useCart();

  const [selectedVariant, setSelectedVariant] =
    useState(null);
  const [quantity, setQuantity] = useState(1);
  const [customQuantity, setCustomQuantity] =
    useState('');
  const [quantityType, setQuantityType] =
    useState('cases');
  const [copySuccess, setCopySuccess] = useState('');
  const [favoriteSuccess, setFavoriteSuccess] =
    useState('');
  const [showShareOptions, setShowShareOptions] =
    useState(false);
  const [currentImageIndex, setCurrentImageIndex] =
    useState(0);
  const [zoomPosition, setZoomPosition] = useState({
    x: 50,
    y: 50,
  });
  const [isZooming, setIsZooming] = useState(false);

  const productTags = useMemo(() => {
    if (!Array.isArray(product?.tags)) {
      return [];
    }

    return product.tags.map((tag) =>
      String(tag).toLowerCase()
    );
  }, [product]);

  const productImages = useMemo(() => {
    if (Array.isArray(product?.images)) {
      return product.images.filter(Boolean);
    }

    return product?.image ? [product.image] : [];
  }, [product]);

  const isBoard = productTags.includes('boards');
  const isPaper = productTags.includes('paper');
  const isDauber = productTags.includes('daubers');
  const isPack = productTags.includes('packs');

  useEffect(() => {
    if (!product) {
      return;
    }

    const firstVariant =
      Array.isArray(product.variants) &&
      product.variants.length > 0
        ? product.variants[0]
        : product;

    setSelectedVariant(firstVariant);
    setQuantity(1);
    setCustomQuantity('');
    setCurrentImageIndex(0);
    setShowShareOptions(false);
    setCopySuccess('');
    setFavoriteSuccess('');
    setIsZooming(false);

    if (productTags.includes('boards')) {
      setQuantityType('boards');
    } else if (productTags.includes('paper')) {
      setQuantityType('packs');
    } else if (productTags.includes('daubers')) {
      setQuantityType('daubers');
    } else if (productTags.includes('packs')) {
      setQuantityType('packs');
    } else {
      setQuantityType('cases');
    }
  }, [product, productTags]);

  useEffect(() => {
    if (!product) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener(
        'keydown',
        handleEscape
      );
    };
  }, [product, onClose]);

  if (!product) {
    return null;
  }

  const displayedProduct = {
    ...product,
    ...selectedVariant,
  };

  const normalizeQuantity = (value) => {
    const parsedValue = Number.parseInt(value, 10);

    return Number.isFinite(parsedValue)
      ? Math.max(parsedValue, 1)
      : 1;
  };

  const handleVariantChange = (event) => {
    const variant = product.variants?.find(
      (item) => item.sku === event.target.value
    );

    if (variant) {
      setSelectedVariant(variant);
    }
  };

  const handleQuantityChange = (event) => {
    setQuantity(normalizeQuantity(event.target.value));
    setCustomQuantity('');
  };

  const handleCustomQuantityChange = (event) => {
    setCustomQuantity(event.target.value);
  };

  const decreaseQuantity = () => {
    setCustomQuantity('');
    setQuantity((currentQuantity) =>
      Math.max(currentQuantity - 1, 1)
    );
  };

  const increaseQuantity = () => {
    setCustomQuantity('');
    setQuantity(
      (currentQuantity) => currentQuantity + 1
    );
  };

  const handleAddToCart = () => {
    const hasCustomQuantity =
      String(customQuantity).trim() !== '';

    const quantityToAdd = hasCustomQuantity
      ? normalizeQuantity(customQuantity)
      : normalizeQuantity(quantity);

    let selectedQuantityType = quantityType;

    if (hasCustomQuantity) {
      if (isBoard) {
        selectedQuantityType = 'boards';
      } else if (isPaper || isPack) {
        selectedQuantityType = 'packs';
      } else if (isDauber) {
        selectedQuantityType = 'daubers';
      } else {
        selectedQuantityType = 'games';
      }
    }

    addItemToCart({
      ...product,
      ...selectedVariant,
      quantity: quantityToAdd,
      quantityType: selectedQuantityType,
    });

    onClose();
  };

  const handleImageNavigation = (direction) => {
    if (productImages.length <= 1) {
      return;
    }

    setCurrentImageIndex((currentIndex) => {
      if (direction === 'previous') {
        return currentIndex === 0
          ? productImages.length - 1
          : currentIndex - 1;
      }

      return currentIndex === productImages.length - 1
        ? 0
        : currentIndex + 1;
    });
  };

  const handleMouseMove = (event) => {
    const bounds =
      event.currentTarget.getBoundingClientRect();

    const x =
      ((event.clientX - bounds.left) / bounds.width) *
      100;

    const y =
      ((event.clientY - bounds.top) / bounds.height) *
      100;

    setZoomPosition({ x, y });
  };

  const getProductLink = () =>
    `${window.location.origin}/product/${product.id}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        getProductLink()
      );

      setCopySuccess('Product link copied');
      setTimeout(() => setCopySuccess(''), 3000);
    } catch (error) {
      console.error(
        'Unable to copy the product link:',
        error
      );

      setCopySuccess('Unable to copy the link');
    }
  };

  const handleNativeShare = async () => {
    if (!navigator.share) {
      setShowShareOptions(true);
      return;
    }

    try {
      await navigator.share({
        title: product.name,
        text: `Take a look at ${product.name} from K&M Sales.`,
        url: getProductLink(),
      });
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error(
          'Unable to share the product:',
          error
        );
      }
    }
  };

  const handleAddToFavorites = async () => {
    if (!onFavorite || favoriteLoading) {
      return;
    }

    try {
      await onFavorite(product);
      setFavoriteSuccess('Added to your favorites');
      setTimeout(() => setFavoriteSuccess(''), 3000);
    } catch (error) {
      console.error(
        'Unable to add the product to favorites:',
        error
      );
    }
  };

  const handlePrint = () => {
    const printWindow = window.open(
      '',
      '_blank',
      'noopener,noreferrer'
    );

    if (!printWindow) {
      window.alert(
        'Please allow popups to print product details.'
      );
      return;
    }

    const printImage = productImages[0] || '';
    const safeValue = (value) =>
      String(value ?? 'N/A')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;');

    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>${safeValue(displayedProduct.name)}</title>
          <style>
            body {
              margin: 0;
              padding: 40px;
              color: #172033;
              font-family: Arial, sans-serif;
            }

            .print-container {
              max-width: 760px;
              margin: 0 auto;
            }

            img {
              display: block;
              max-width: 360px;
              max-height: 360px;
              margin: 0 0 30px;
              object-fit: contain;
            }

            h1 {
              margin-bottom: 22px;
            }

            p {
              margin: 9px 0;
              line-height: 1.5;
            }
          </style>
        </head>

        <body>
          <main class="print-container">
            ${
              printImage
                ? `<img src="${safeValue(
                    printImage
                  )}" alt="${safeValue(product.name)}" />`
                : ''
            }

            <h1>${safeValue(displayedProduct.name)}</h1>
            <p><strong>SKU:</strong> ${safeValue(
              displayedProduct.sku
            )}</p>
            <p><strong>Take In:</strong> ${safeValue(
              displayedProduct.takeIn
            )}</p>
            <p><strong>Payout:</strong> ${safeValue(
              displayedProduct.payout
            )}</p>
            <p><strong>Profit:</strong> ${safeValue(
              displayedProduct.profit
            )}</p>
            <p><strong>Profit Percentage:</strong> ${safeValue(
              displayedProduct.profitPercent
            )}</p>
            <p><strong>Deals Per Case:</strong> ${safeValue(
              displayedProduct.dealsPerCase
            )}</p>
            <p><strong>Seal:</strong> ${safeValue(
              displayedProduct.seal
            )}</p>
          </main>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
    }, 300);
  };

  const currentImage =
    productImages[currentImageIndex] || '';

  return (
    <div
      className="product-modal-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="product-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
      >
        <button
          type="button"
          className="product-modal-close"
          onClick={onClose}
          aria-label="Close product details"
        >
          ×
        </button>

        <div className="product-modal-media">
          <div
            className="product-zoom-container"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
          >
            {currentImage ? (
              <img
                src={currentImage}
                alt={`${product.name}${
                  productImages.length > 1
                    ? `, image ${currentImageIndex + 1}`
                    : ''
                }`}
                className={`product-modal-image ${
                  isZooming ? 'is-zooming' : ''
                }`}
                style={{
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }}
              />
            ) : (
              <div className="product-image-placeholder">
                No image available
              </div>
            )}
          </div>

          {productImages.length > 1 && (
            <>
              <button
                type="button"
                className="product-image-nav product-image-nav--previous"
                onClick={() =>
                  handleImageNavigation('previous')
                }
                aria-label="View previous product image"
              >
                ←
              </button>

              <button
                type="button"
                className="product-image-nav product-image-nav--next"
                onClick={() =>
                  handleImageNavigation('next')
                }
                aria-label="View next product image"
              >
                →
              </button>

              <div className="product-image-count">
                {currentImageIndex + 1} /{' '}
                {productImages.length}
              </div>
            </>
          )}
        </div>

        <div className="product-modal-information">
          <div className="product-modal-heading">
            <div>
              <p className="product-modal-eyebrow">
                K&amp;M Product
              </p>

              <h2 id="product-modal-title">
                {displayedProduct.name || product.name}
              </h2>
            </div>

            <button
              type="button"
              className="product-favorite-button"
              onClick={handleAddToFavorites}
              disabled={favoriteLoading}
              aria-label={`Add ${product.name} to favorites`}
            >
              <span aria-hidden="true">★</span>
              {favoriteLoading ? 'Saving…' : 'Favorite'}
            </button>
          </div>

          {favoriteSuccess && (
            <p
              className="product-modal-message success"
              role="status"
            >
              {favoriteSuccess}
            </p>
          )}

          {displayedProduct.description && (
            <p className="product-modal-description">
              {displayedProduct.description}
            </p>
          )}

          <dl className="product-specifications">
            <ProductDetail
              label="SKU"
              value={displayedProduct.sku}
            />
            <ProductDetail
              label="Take In"
              value={displayedProduct.takeIn}
            />
            <ProductDetail
              label="Payout"
              value={displayedProduct.payout}
            />
            <ProductDetail
              label="Profit"
              value={displayedProduct.profit}
            />
            <ProductDetail
              label="Profit Percentage"
              value={displayedProduct.profitPercent}
            />
            <ProductDetail
              label="Deals Per Case"
              value={displayedProduct.dealsPerCase}
            />
            <ProductDetail
              label="Seal"
              value={displayedProduct.seal}
            />
          </dl>

          {Array.isArray(product.variants) &&
            product.variants.length > 0 && (
              <div className="product-modal-field">
                <label htmlFor="product-variant">
                  Choose a variant
                </label>

                <select
                  id="product-variant"
                  value={selectedVariant?.sku || ''}
                  onChange={handleVariantChange}
                >
                  {product.variants.map((variant) => (
                    <option
                      key={variant.sku}
                      value={variant.sku}
                    >
                      {variant.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

          <div className="product-order-panel">
            <div className="product-order-heading">
              <div>
                <p>Order quantity</p>
                <h3>
                  {isBoard
                    ? 'Select boards'
                    : isPaper || isPack
                      ? 'Select packs'
                      : isDauber
                        ? 'Select daubers'
                        : 'Select cases or games'}
                </h3>
              </div>

              {(isBoard || isDauber) && (
                <span>12 included per pack</span>
              )}
            </div>

            {isPaper ? (
              <div className="product-modal-field">
                <label htmlFor="paper-quantity">
                  Number of packs
                </label>

                <input
                  id="paper-quantity"
                  type="number"
                  min="1"
                  inputMode="numeric"
                  value={customQuantity}
                  placeholder="Enter quantity"
                  onChange={handleCustomQuantityChange}
                />
              </div>
            ) : isPack ? (
              <div className="product-modal-field">
                <label htmlFor="pack-quantity">
                  Number of packs
                </label>

                <select
                  id="pack-quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                >
                  {quantityOptions.slice(0, 10).map(
                    (option) => (
                      <option
                        key={option}
                        value={option}
                      >
                        {option}{' '}
                        {option === 1 ? 'pack' : 'packs'}
                      </option>
                    )
                  )}
                </select>
              </div>
            ) : isBoard || isDauber ? (
              <QuantityStepper
                id={
                  isBoard
                    ? 'board-quantity'
                    : 'dauber-quantity'
                }
                label={
                  isBoard
                    ? 'Number of boards'
                    : 'Number of daubers'
                }
                quantity={quantity}
                onDecrease={decreaseQuantity}
                onIncrease={increaseQuantity}
                onChange={handleQuantityChange}
              />
            ) : (
              <div className="product-quantity-grid">
                <div className="product-modal-field">
                  <label htmlFor="case-quantity">
                    Number of cases
                  </label>

                  <select
                    id="case-quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                  >
                    {quantityOptions.map((option) => (
                      <option
                        key={option}
                        value={option}
                      >
                        {option}{' '}
                        {option === 1 ? 'case' : 'cases'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="product-modal-field">
                  <label htmlFor="game-quantity">
                    Or individual games
                  </label>

                  <input
                    id="game-quantity"
                    type="number"
                    min="1"
                    inputMode="numeric"
                    value={customQuantity}
                    placeholder="Enter quantity"
                    onChange={handleCustomQuantityChange}
                  />
                </div>
              </div>
            )}

            <button
              type="button"
              className="product-add-button"
              onClick={handleAddToCart}
            >
              <span>Add to Cart</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="product-modal-actions">
            <button type="button" onClick={handlePrint}>
              <span aria-hidden="true">⌑</span>
              Print details
            </button>

            <button
              type="button"
              onClick={handleNativeShare}
            >
              <span aria-hidden="true">↗</span>
              Share
            </button>
          </div>

          {showShareOptions && (
            <div className="product-share-panel">
              <div className="product-share-heading">
                <strong>Share this product</strong>

                <button
                  type="button"
                  onClick={() =>
                    setShowShareOptions(false)
                  }
                  aria-label="Close sharing options"
                >
                  ×
                </button>
              </div>

              <div className="product-share-options">
                <button
                  type="button"
                  onClick={handleCopyLink}
                >
                  Copy link
                </button>

                <a
                  href={`sms:?body=${encodeURIComponent(
                    `Check out ${product.name}: ${getProductLink()}`
                  )}`}
                >
                  Text
                </a>

                <a
                  href={`mailto:?subject=${encodeURIComponent(
                    `Check out ${product.name}`
                  )}&body=${encodeURIComponent(
                    `Take a look at this product: ${getProductLink()}`
                  )}`}
                >
                  Email
                </a>
              </div>

              {copySuccess && (
                <p
                  className="product-modal-message"
                  role="status"
                >
                  {copySuccess}
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const ProductDetail = ({ label, value }) => {
  if (
    value === undefined ||
    value === null ||
    value === ''
  ) {
    return null;
  }

  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
};

const QuantityStepper = ({
  id,
  label,
  quantity,
  onDecrease,
  onIncrease,
  onChange,
}) => (
  <div className="product-modal-field">
    <label htmlFor={id}>{label}</label>

    <div className="product-quantity-stepper">
      <button
        type="button"
        onClick={onDecrease}
        aria-label={`Decrease ${label.toLowerCase()}`}
      >
        −
      </button>

      <input
        id={id}
        type="number"
        min="1"
        inputMode="numeric"
        value={quantity}
        onChange={onChange}
      />

      <button
        type="button"
        onClick={onIncrease}
        aria-label={`Increase ${label.toLowerCase()}`}
      >
        +
      </button>
    </div>
  </div>
);

export default ProductModal;