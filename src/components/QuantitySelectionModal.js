import React, { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import './QuantitySelectionModal.css';

const paperVariants = [
  '12 on Bingo Paper',
  '9 on Bingo Paper',
  '6 on Bingo Paper',
  '3 on Bingo Paper',
  '2 on Bingo Paper',
  '1 on Bingo Paper',
];

const quantityOptions = Array.from(
  { length: 11 },
  (_, index) => index + 1
);

const QuantitySelectionModal = ({
  isOpen,
  onRequestClose,
  onSubmit,
  product,
}) => {
  const [caseQuantity, setCaseQuantity] = useState(1);
  const [customQuantity, setCustomQuantity] = useState(1);
  const [quantityType, setQuantityType] =
    useState('cases');
  const [selectedPaper, setSelectedPaper] = useState(
    paperVariants[0]
  );

  const productTags = useMemo(() => {
    if (!Array.isArray(product?.tags)) {
      return [];
    }

    return product.tags.map((tag) =>
      String(tag).toLowerCase()
    );
  }, [product]);

  const isPack = productTags.includes('packs');
  const isBoard = productTags.includes('boards');
  const isPaper = productTags.includes('paper');
  const isDauber = productTags.includes('daubers');

  /*
   * Reset the form whenever a new product is opened.
   */
  useEffect(() => {
    if (!isOpen || !product) {
      return;
    }

    setCaseQuantity(1);
    setCustomQuantity(1);
    setSelectedPaper(paperVariants[0]);

    if (productTags.includes('paper')) {
      setQuantityType('books');
    } else if (productTags.includes('packs')) {
      setQuantityType('packs');
    } else if (productTags.includes('boards')) {
      setQuantityType('boards');
    } else if (productTags.includes('daubers')) {
      setQuantityType('cases');
    } else {
      setQuantityType('cases');
    }
  }, [isOpen, product, productTags]);

  /*
   * All hooks must remain above this guard.
   */
  if (!isOpen || !product) {
    return null;
  }

  const normalizeQuantity = (value) => {
    const parsedValue = Number.parseInt(value, 10);

    if (!Number.isFinite(parsedValue)) {
      return 1;
    }

    return Math.max(parsedValue, 1);
  };

  const handleCustomQuantityChange = (
    event,
    selectedType
  ) => {
    setCustomQuantity(
      normalizeQuantity(event.target.value)
    );
    setQuantityType(selectedType);
  };

  const handleCaseQuantityChange = (event) => {
    setCaseQuantity(
      normalizeQuantity(event.target.value)
    );
    setQuantityType('cases');
  };

  const handleSubmit = () => {
    let submittedQuantity = customQuantity;
    let submittedType = quantityType;

    if (quantityType === 'cases') {
      submittedQuantity = caseQuantity;
    }

    if (isPaper) {
      submittedQuantity = customQuantity;
      submittedType = 'books';
    } else if (isPack) {
      submittedQuantity = customQuantity;
      submittedType = 'packs';
    } else if (isBoard) {
      submittedQuantity = customQuantity;
      submittedType = 'boards';
    }

    onSubmit({
      quantity: normalizeQuantity(submittedQuantity),
      quantityType: submittedType,
      caseQuantity: normalizeQuantity(caseQuantity),
      customQuantity: normalizeQuantity(customQuantity),
      selectedPaper: isPaper ? selectedPaper : null,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={`Select quantity for ${product.name}`}
      className="modal-content"
      overlayClassName="modal-overlay"
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
    >
      <button
        type="button"
        className="close-button"
        onClick={onRequestClose}
        aria-label="Close quantity selection"
      >
        ×
      </button>

      <p className="quantity-modal-eyebrow">
        Add to cart
      </p>

      <h2>Select Quantity</h2>

      <p className="quantity-product-name">
        {product.name}
      </p>

      {isPack ? (
        <div className="quantity-selection">
          <label htmlFor="pack-quantity">
            Number of packs
          </label>

          <input
            type="number"
            id="pack-quantity"
            value={customQuantity}
            onChange={(event) =>
              handleCustomQuantityChange(
                event,
                'packs'
              )
            }
            min="1"
            inputMode="numeric"
          />
        </div>
      ) : isBoard ? (
        <div className="quantity-selection">
          <label htmlFor="board-quantity">
            Number of boards
          </label>

          <select
            id="board-quantity"
            value={customQuantity}
            onChange={(event) =>
              handleCustomQuantityChange(
                event,
                'boards'
              )
            }
          >
            {quantityOptions.slice(0, 10).map(
              (quantity) => (
                <option
                  key={quantity}
                  value={quantity}
                >
                  {quantity}{' '}
                  {quantity === 1
                    ? 'board'
                    : 'boards'}
                </option>
              )
            )}
          </select>
        </div>
      ) : isPaper ? (
        <>
          <div className="quantity-selection">
            <label htmlFor="paper-type">
              Type of bingo paper
            </label>

            <select
              id="paper-type"
              value={selectedPaper}
              onChange={(event) =>
                setSelectedPaper(event.target.value)
              }
            >
              {paperVariants.map((variant) => (
                <option
                  key={variant}
                  value={variant}
                >
                  {variant}
                </option>
              ))}
            </select>
          </div>

          <div className="quantity-selection">
            <label htmlFor="book-quantity">
              Number of books
            </label>

            <select
              id="book-quantity"
              value={customQuantity}
              onChange={(event) =>
                handleCustomQuantityChange(
                  event,
                  'books'
                )
              }
            >
              {quantityOptions.map((quantity) => (
                <option
                  key={quantity}
                  value={quantity}
                >
                  {quantity}{' '}
                  {quantity === 1 ? 'book' : 'books'}
                </option>
              ))}
            </select>
          </div>
        </>
      ) : isDauber ? (
        <>
          <div className="quantity-selection">
            <label htmlFor="dauber-case-quantity">
              Number of cases
            </label>

            <select
              id="dauber-case-quantity"
              value={caseQuantity}
              onChange={handleCaseQuantityChange}
            >
              {quantityOptions.map((quantity) => (
                <option
                  key={quantity}
                  value={quantity}
                >
                  {quantity}{' '}
                  {quantity === 1 ? 'case' : 'cases'}
                </option>
              ))}
            </select>
          </div>

          <div className="custom-quantity">
            <label htmlFor="dauber-quantity">
              Or enter the number of individual daubers
            </label>

            <input
              type="number"
              id="dauber-quantity"
              value={customQuantity}
              onChange={(event) =>
                handleCustomQuantityChange(
                  event,
                  'daubers'
                )
              }
              min="1"
              inputMode="numeric"
            />
          </div>
        </>
      ) : (
        <>
          <div className="quantity-selection">
            <label htmlFor="case-quantity">
              Number of cases
            </label>

            <select
              id="case-quantity"
              value={caseQuantity}
              onChange={handleCaseQuantityChange}
            >
              {quantityOptions.map((quantity) => (
                <option
                  key={quantity}
                  value={quantity}
                >
                  {quantity}{' '}
                  {quantity === 1 ? 'case' : 'cases'}
                </option>
              ))}
            </select>
          </div>

          <div className="custom-quantity">
            <label htmlFor="game-quantity">
              Or enter the number of individual games
            </label>

            <input
              type="number"
              id="game-quantity"
              value={customQuantity}
              onChange={(event) =>
                handleCustomQuantityChange(
                  event,
                  'games'
                )
              }
              min="1"
              inputMode="numeric"
            />
          </div>
        </>
      )}

      <button
        type="button"
        className="quantity-submit-button"
        onClick={handleSubmit}
      >
        <span>Add to Cart</span>
        <span aria-hidden="true">→</span>
      </button>
    </Modal>
  );
};

export default QuantitySelectionModal;