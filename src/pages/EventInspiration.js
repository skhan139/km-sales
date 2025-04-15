// src/pages/EventInspiration.js

import React from 'react';
import './EventInspiration.css'; // Import the CSS file for styling

const EventInspiration = () => {
  return (
    <div className="event-inspiration-container">
      <h1 className="event-inspiration-title">Event Inspiration</h1>
      <p className="event-inspiration-description">
        Looking for ideas to make your next event unforgettable? K&M Sales has you covered! 
        Explore our wide range of products and creative ideas to host successful bingo nights, 
        fundraising events, and more.
      </p>
      <div className="event-inspiration-content">
        <div className="event-card">
          <h2>Bingo Night</h2>
          <p>Host a fun-filled bingo night with our premium bingo supplies and games. 
    Whether you're planning a casual gathering or a large-scale event, bingo is a timeless classic 
    that brings people together for an evening of excitement and friendly competition. 
    With customizable cards, daubers, and engaging game variations, you can create a unique experience 
    tailored to your audience. Perfect for community events, family nights, or just a fun way to unwind 
    with friends, bingo nights are guaranteed to be a hit!</p>
        </div>
        <div className="event-card">
          <h2>Fundraising Events</h2>
          <p>Raise funds for your organization with our exciting pull tabs, tip jars, and other gaming products. 
    Fundraising events are a fantastic way to engage your community while supporting a meaningful cause. 
    From raffles and silent auctions to interactive games and themed nights, we provide everything you need 
    to make your event a success. Our products are designed to maximize participation and profits, ensuring 
    your fundraiser is both enjoyable and impactful. Let us help you turn your vision into a memorable event 
    that leaves a lasting impression!</p>
        </div>
        <div className="event-card">
          <h2>Drag Queen Bingos</h2>
          <p>
  Add flair and excitement to your bingo night with a Drag Queen Bingo event! 
  Featuring fabulous performances, lively entertainment, and interactive hosting, 
  this unique twist on traditional bingo is sure to leave your guests laughing and 
  talking about it for weeks. Perfect for fundraisers, parties, or just a fun night out!
</p>
        </div>
      </div>
    </div>
  );
};

export default EventInspiration;