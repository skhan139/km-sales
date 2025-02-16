import React, { useState } from 'react';
import Modal from 'react-modal';
import './QuantitySelectionModal.css';

const QuantitySelectionModal = ({ isOpen, onRequestClose, onSubmit, product }) => {
  const [quantity, setQuantity] = useState(1);
  const [customQuantity, setCustomQuantity] = useState('');
  const [quantityType, setQuantityType] = useState('cases');

  const handleSubmit = () => {
    const quantityToAdd = customQuantity ? parseInt(customQuantity, 10) : quantity;
    onSubmit(quantityToAdd, quantityType);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Select Quantity"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2>Select Quantity</h2>
      {product.tags && product.tags.includes('boards') ? (
        <div className="quantity-selection">
          <label htmlFor="quantity-select">Number of boards:</label>
          <select id="quantity-select" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value, 10))}>
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
            <label htmlFor="quantity-select">Number of cases:</label>
            <select id="quantity-select" value={quantity} onChange={(e) => {
              setQuantity(parseInt(e.target.value, 10));
              setQuantityType('cases');
            }}>
              {[...Array(11).keys()].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          <div className="custom-quantity">
            <label htmlFor="custom-quantity-input">Or enter number of books:</label>
            <input
              type="number"
              id="custom-quantity-input"
              value={customQuantity}
              onChange={(e) => {
                setCustomQuantity(e.target.value);
                setQuantityType('books');
              }}
              min="1"
            />
          </div>
        </>
      ) : product.tags && product.tags.includes('daubers') ? (
        <>
          <div className="quantity-selection">
            <label htmlFor="quantity-select">Number of cases:</label>
            <select id="quantity-select" value={quantity} onChange={(e) => {
              setQuantity(parseInt(e.target.value, 10));
              setQuantityType('cases');
            }}>
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
              onChange={(e) => {
                setCustomQuantity(e.target.value);
                setQuantityType('daubers');
              }}
              min="1"
            />
          </div>
        </>
      ) : (
        <>
          <div className="quantity-selection">
            <label htmlFor="quantity-select">Number of cases:</label>
            <select id="quantity-select" value={quantity} onChange={(e) => {
              setQuantity(parseInt(e.target.value, 10));
              setQuantityType('cases');
            }}>
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
              onChange={(e) => {
                setCustomQuantity(e.target.value);
                setQuantityType('games');
              }}
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