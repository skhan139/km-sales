import React from 'react';
import './Orders.css'; // Import the CSS file for styling

const ordersData = [
  {
    email: 'skhan139@icloud.com',
    orders: [
      { id: 'order1', name: 'Order 1', fileUrl: '/assets/files/invoice_Jeremy Shipway_2025-02-25.pdf' }, // Example PDF file
      { id: 'order2', name: 'Order 2', fileUrl: '/assets/files/sample.pdf' }, // Another example PDF file
    ],
  },
  {
    email: 'kristal.ibeautyschool@gmail.com',
    orders: [
      { id: 'order1', name: 'Order 1', fileUrl: '/assets/files/invoice_Frankfort Booster Club_2025-02-12 (9)' },
      { id: 'order2', name: 'Order 2', fileUrl: '/assets/files/invoice_Frankfort Booster Club_2025-02-28' },
    ],
  },
  // Add more user orders here
];

const Orders = ({ userEmail }) => {
  const userOrders = ordersData.find((user) => user.email === userEmail);

  if (!userOrders) {
    return <p>No orders found for this user.</p>;
  }

  return (
    <div className="orders-section">
      <h3>
  <i className="fa fa-shopping-bag" aria-hidden="true"></i> My Orders
</h3>
      <ul className="orders-list">
        {userOrders.orders.map((order) => (
          <li key={order.id}>
            <p>{order.name}</p>
            <div className="button-group">
              <a href={order.fileUrl} target="_blank" rel="noopener noreferrer">
                <button className="download-button">View PDF</button>
              </a>
              <a href={order.fileUrl} download>
                <button className="download-button">Download PDF</button>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;