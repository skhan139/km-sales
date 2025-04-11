import React from 'react';
import Footer from '../components/Footer'; // Ensure this path is correct
import '../assets/styles/PolicyPage.css'; // Ensure this path is correct

const ShippingPolicy = () => {
  return (
    <div className="policy-page-container">
      <div className="policy-page">
        <h1>Shipping Policy</h1>
        <p>
          <strong>Effective Date:</strong> 1/1/2025
        </p>
        <p>
          At <strong>K&M Sales</strong>, we strive to ensure that your orders are delivered to you in a timely and efficient manner. Please review our shipping policy below for details on how we handle shipping and delivery.
        </p>

        <h2>Order Processing</h2>
        <p>
          - Orders are processed within <strong>1-3 business days</strong> after payment and order confirmation.<br />
          - Orders placed on weekends or holidays will be processed on the next business day.
        </p>

        <h2>Shipping Methods</h2>
        <p>
          We offer the following shipping options:
        </p>
        <ul>
          <li><strong>Standard Shipping:</strong> Delivery within <strong>5-7 business days</strong>.</li>
          <li><strong>Expedited Shipping:</strong> Delivery within <strong>2-3 business days</strong>.</li>
          <li><strong>Local Pickup:</strong> Available for customers in MD/WV.</li>
        </ul>

        <h2>Shipping Rates</h2>
        <p>
          - Shipping rates are calculated based on the weight, dimensions, and destination of your order.<br />
          - You will see the shipping cost at checkout before completing your purchase.
        </p>

        <h2>Delivery Locations</h2>
        <p>
          - We currently ship to addresses within <strong>West Virginia</strong> and <strong>Maryland</strong>.<br />
          - For orders outside these areas, please contact us at kandmsales17@gmail.com for assistance.
        </p>

        <h2>Order Tracking</h2>
        <p>
          - Once your order is shipped, you will receive a confirmation email with a tracking number.<br />
          - You can use this tracking number to monitor the status of your shipment.
        </p>

        <h2>Damaged or Lost Shipments</h2>
        <p>
          - If your order arrives damaged or is lost during transit, please contact us within <strong>7 days</strong> of delivery at kandmsales17@gmail.com.<br />
          - We will work with the shipping carrier to resolve the issue and ensure your satisfaction.
        </p>

        <h2>Returns and Refunds</h2>
        <p>
  - Please refer to our <a href="/return-policy" className="return-policy-link">Return Policy</a> for details on how to return items and request refunds.
</p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about our shipping policy, please contact us at:<br />
          - <strong>Email:</strong> kandmsales17@gmai.com<br />
          - <strong>Phone:</strong> (304)-788-5310
        </p>
      </div>
    </div>
  );
};

export default ShippingPolicy;