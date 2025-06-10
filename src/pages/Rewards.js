// src/pages/Rewards.js

import React from 'react';
import './AboutPage.css'; // Reuse the CSS file for styling

const RewardsPage = () => {
  return (
    <div className="page-container">
      <div className="about-page">
        {/* Add the link at the top */}
        <div className="points-link">
          <a 
            href="https://docs.google.com/document/d/1dc2rQ2FOHAb2csD-JAiol94XxVQRu-AnkYlx8c-Ac08/edit?tab=t.0" 
            style={{ color: '#0056b3', textDecoration: 'underline', fontWeight: 'bold' }}
          >
            View Our Points System
          </a>
        </div>
        <div className="about-box">
          <h3 className="at">
            At K&M Sales, we value our loyal customers and are excited to introduce our Rewards Program! 
            Earn points for every purchase and redeem them for exclusive discounts, free products, and more. 
            Our goal is to give back to our customers and make every purchase even more rewarding. <br /> <br />
            Whether you're a long-time partner or a new customer, our Rewards Program is designed to enhance your experience 
            and help you save while enjoying our high-quality gaming products.
          </h3>
        </div>
        <div className="flex-container">
          <div className="flex-item">
            <h3>How It Works</h3>
            <p>
              Earn points for every dollar spent on our products. Points can be redeemed for discounts, free items, or exclusive offers. 
              The more you shop, the more you save!
            </p>
          </div>
          <div className="flex-item">
            <h3>Exclusive Rewards</h3>
            <p>
              Enjoy access to exclusive rewards such as limited-edition products, early access to new arrivals, and special promotions 
              available only to our Rewards members.
            </p>
          </div>
          <div className="flex-item">
            <h3>Sign Up Today</h3>
            <p>
              Joining our Rewards Program is easy and free! Simply create an account or log in to your existing account to start earning points today.
            </p>
          </div>
          <div className="flex-item">
            <h3>Track Your Points</h3>
            <p>
              Keep track of your points and rewards through your account dashboard. Redeem your points whenever you're ready to enjoy the benefits.
            </p>
          </div>
          <div className="flex-item">
            <h3>Refer a Friend</h3>
            <p>
              Share the love! Refer a friend to K&M Sales and earn bonus points when they make their first purchase. It's our way of saying thank you!
            </p>
          </div>
          <div className="flex-item">
            <h3>Contact Us</h3>
            <p>
              Have questions about our Rewards Program? Contact our team for more information or assistance. We're here to help you make the most of your rewards!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;