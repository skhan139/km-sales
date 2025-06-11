import React, { useState } from 'react';
import Modal from 'react-modal';
import './CheckoutFormModal.css'; // Import the CSS file

Modal.setAppElement('#root');

const CheckoutFormModal = ({
  isOpen,
  onRequestClose,
  onSubmit,
  discountCode,
  setDiscountCode,
  handleApplyDiscount,
  discountApplied
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    license: '',
    phone: '',
    email: '',
    organization: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    specialInstructions: '',
    subscribeToEmailList: 'No', // Default value for email subscription
    usePoints: false, // Default value for using points
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value // Handle checkbox and other inputs
    }));

    // Disable discount code if "Use Points" is checked
    if (name === 'usePoints' && checked) {
      setDiscountCode(''); // Clear discount code
    }
  };

  const handleDiscountCodeChange = (e) => {
    setDiscountCode(e.target.value);

    // Disable "Use Points" if discount code is entered
    if (e.target.value.trim() !== '') {
      setFormData((prevData) => ({
        ...prevData,
        usePoints: false, // Uncheck "Use Points"
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Checkout Form Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name *
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </label>
        <label>
          Last Name
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </label>
        <label>
          License #
          <input type="text" name="license" value={formData.license} onChange={handleChange} />
        </label>
        <label>
          Phone *
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>
        <label>
          Email *
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Organization Name *
          <input type="text" name="organization" value={formData.organization} onChange={handleChange} required />
        </label>
        <label>
          Address *
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </label>
        <label>
          City *
          <input type="text" name="city" value={formData.city} onChange={handleChange} required />
        </label>
        <label>
          State *
          <input type="text" name="state" value={formData.state} onChange={handleChange} required />
        </label>
        <label>
          Zip Code *
          <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
        </label>
        <label>
          Notes/Delivery Instructions
          <textarea name="specialInstructions" value={formData.specialInstructions} onChange={handleChange}></textarea>
        </label>
        <div className="discount-section">
          <label>
            Discount Code
            <input
              type="text"
              placeholder="Enter discount code"
              value={discountCode}
              onChange={handleDiscountCodeChange}
              disabled={formData.usePoints || discountApplied} // Disable if "Use Points" is checked or discount is applied
            />
          </label>
          <button
            type="button"
            onClick={handleApplyDiscount}
            disabled={formData.usePoints || discountApplied} // Disable if "Use Points" is checked or discount is applied
            className="apply-discount-button"
          >
            {discountApplied ? 'Discount Applied' : 'Apply Discount'}
          </button>
          {discountApplied && <p className="success-message">Discount applied: 10% off</p>}
        </div>
        <div className="email-subscription">
          <p>Subscribe to our email list? (Receive exclusive discounts and updates on our new games)</p>
          <label>
            <input
              type="radio"
              name="subscribeToEmailList"
              value="Yes"
              checked={formData.subscribeToEmailList === 'Yes'}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="subscribeToEmailList"
              value="No"
              checked={formData.subscribeToEmailList === 'No'}
              onChange={handleChange}
            />
            No
          </label>
        </div>
        <div className="use-points-section">
          <p>Use Points?</p>
          <label>
            <input
              type="checkbox"
              name="usePoints"
              checked={formData.usePoints}
              onChange={handleChange}
              disabled={discountCode.trim() !== '' || discountApplied} // Disable if discount code is entered or discount is applied
            />
            Check For Yes. ** Note, Discount Code And Points Cannot Be Used Simultaneously **
          </label>
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={onRequestClose} className="close-button">Close Checkout</button>
      </form>
    </Modal>
  );
};

export default CheckoutFormModal;