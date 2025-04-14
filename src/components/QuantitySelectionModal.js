import React, { useState } from 'react';
import Modal from 'react-modal';
import './QuantitySelectionModal.css';

const paperVariants = [
  "12 on Bingo Paper",
  "9 on Bingo Paper",
  "6 on Bingo Paper",
  "3 on Bingo Paper",
  "2 on Bingo Paper",
  "1 on Bingo Paper"
];

const QuantitySelectionModal = ({ isOpen, onRequestClose, onSubmit, product }) => {
  const [caseQuantity, setCaseQuantity] = useState(0); // Separate state for cases
  const [customQuantity, setCustomQuantity] = useState(0); // Separate state for games, books, etc.
  const [quantityType, setQuantityType] = useState('cases');
  const [selectedPaper, setSelectedPaper] = useState(paperVariants[0]);

  const handleSubmit = () => {
    onSubmit({ caseQuantity, customQuantity, quantityType, selectedPaper });
    onRequestClose();
  };

  const handleCustomQuantityChange = (e, type) => {
    setCustomQuantity(parseInt(e.target.value, 10) || 0); // Update custom quantity
    setQuantityType(type);
  };

  const handleCaseQuantityChange = (e) => {
    setCaseQuantity(parseInt(e.target.value, 10) || 0); // Update case quantity
    setQuantityType('cases');
  };

  const getLabel = (type) => {
    if (product.tags && product.tags.includes('paper')) {
      return 'books';
    }
    return type === 'cases' ? 'cases' : 'games';
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Select Quantity"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <button className="close-button" onClick={onRequestClose}>×</button>
      <h2>Select Quantity</h2>
      {product.tags && product.tags.includes('packs') ? (
        <div className="quantity-selection">
          <label htmlFor="quantity-select">Number of packs:</label>
          <input
            type="number"
            id="quantity-select"
            value={customQuantity}
            onChange={(e) => handleCustomQuantityChange(e, 'packs')}
            min="1"
          />
        </div>
      ) : product.tags && product.tags.includes('boards') ? (
        <div className="quantity-selection">
          <label htmlFor="quantity-select">Number of boards:</label>
          <select
            id="quantity-select"
            value={customQuantity}
            onChange={(e) => handleCustomQuantityChange(e, 'boards')}
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1} {num + 1 === 1 ? 'board' : 'boards'}
              </option>
            ))}
          </select>
        </div>
      ) : product.tags && product.tags.includes('paper') ? (
        <>
          <div className="quantity-selection">
            <label htmlFor="paper-select">Select type of paper:</label>
            <select
              id="paper-select"
              value={selectedPaper}
              onChange={(e) => setSelectedPaper(e.target.value)}
            >
              {paperVariants.map((variant) => (
                <option key={variant} value={variant}>
                  {variant}
                </option>
              ))}
            </select>
          </div>
          <div className="quantity-selection">
            <label htmlFor="quantity-select">Number of {getLabel('books')}:</label>
            <select
              id="quantity-select"
              value={customQuantity}
              onChange={(e) => handleCustomQuantityChange(e, 'books')}
            >
              {[...Array(11).keys()].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </>
      ) : product.tags && product.tags.includes('daubers') ? (
        <>
          <div className="quantity-selection">
            <label htmlFor="quantity-select">Number of cases:</label>
            <select
              id="quantity-select"
              value={caseQuantity}
              onChange={handleCaseQuantityChange}
            >
              {[...Array(11).keys()].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          <div className="custom-quantity">
            <label htmlFor="custom-quantity-input">Or enter number of daubers:</label>
            <input
              type="number"
              id="custom-quantity-input"
              value={customQuantity}
              onChange={(e) => handleCustomQuantityChange(e, 'daubers')}
              min="1"
            />
          </div>
        </>
      ) : (
        <>
          <div className="quantity-selection">
            <label htmlFor="quantity-select">Number of cases:</label>
            <select
              id="quantity-select"
              value={caseQuantity}
              onChange={handleCaseQuantityChange}
            >
              {[...Array(11).keys()].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          <div className="custom-quantity">
            <label htmlFor="custom-quantity-input">Or enter number of games:</label>
            <input
              type="number"
              id="custom-quantity-input"
              value={customQuantity}
              onChange={(e) => handleCustomQuantityChange(e, 'games')}
              min="1"
            />
          </div>
        </>
      )}
      <button onClick={handleSubmit}>Add to Cart</button>
    </Modal>
  );
};

export default QuantitySelectionModal;