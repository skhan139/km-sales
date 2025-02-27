import React, { useState } from 'react';
import './Orders.css'; // Import the CSS file for styling

const ordersData = [
  {
    email: 'skhan139@icloud.com',
    orders: [
      { id: 'order1', name: 'Order 1', imageUrl: '/assets/images/shoot-the-moon.jpg' },
      { id: 'order2', name: 'Order 2', imageUrl: '/assets/images/captainjacks.jpg' },
    ],
  },
  {
    email: 'user2@example.com',
    orders: [
      { id: 'order1', name: 'Order 1', imageUrl: '/assets/images/order1.jpg' },
    ],
  },
  // Add more user orders here
];

const Orders = ({ userEmail }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const userOrders = ordersData.find((user) => user.email === userEmail);

  if (!userOrders) {
    return <p>No orders found for this user.</p>;
  }

  const handleImageClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="orders-section">
      <h3>My Orders</h3>
      <ul className="orders-list">
        {userOrders.orders.map((order) => (
          <li key={order.id}>
            <img
              src={order.imageUrl}
              alt={order.name}
              className="order-image"
              onClick={() => handleImageClick(order)}
            />
            <p>{order.name}</p>
            <a href={order.imageUrl} download>
              <button className="download-button">Download</button>
            </a>
          </li>
        ))}
      </ul>
      {selectedOrder && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <img src={selectedOrder.imageUrl} alt={selectedOrder.name} className="modal-image" />
            <p>{selectedOrder.name}</p>
            <a href={selectedOrder.imageUrl} download>
              <button className="download-button">Download</button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;