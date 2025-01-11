// src/pages/AboutPage.js

import React from 'react';
import './AboutPage.css'; // Import the CSS file for styling

const AboutPage = () => {
  return (
    <div className="page-container">
      <div className="about-page">
        <div className="about-box">
          <h3 className='at'>At K&M Sales, we have proudly served as the leading distributor of bingo and gaming supplies in Western Maryland and West Virginia for over 40 years. Our dedication to quality and customer satisfaction has made us a trusted partner in the industry!</h3>
        </div>
        <div className="flex-container">
          <div className="flex-item">
            <h3>Tip and Coin Boards</h3>
            <p>Take your gaming and promotional activities to the next level with our Tip and Coin Boards. Manufactured with precision and creativity, these boards are versatile and highly customizable, featuring vibrant designs and engaging formats. Ideal for fundraising, giveaways, or special events, they bring an element of fun and competition to any occasion.</p>
          </div>
          <div className="flex-item">
            <h3>Instant Winner Tickets</h3>
            <p>Keep the excitement alive with our Instant Winner Tickets! Designed to engage and thrill, these tickets are perfect for quick-play games, promotions, or giveaways. With customizable options and eye-catching designs, our tickets make every moment a winner, ensuring your players enjoy an unforgettable gaming experience.</p>
          </div>
          <div className="flex-item">
            <h3>Bingo Games and Bingo Dobbers</h3>
            <p>At the heart of our business are integrity, commitment, and a focus on exceeding customer expectations. We offer high-quality bingo games and a variety of bingo dobbers designed to enhance your gaming experience.</p>
          </div>
          <div className="flex-item">
            <h3>Bonus Boards and Scratch Off Boards</h3>
            <p>Our product range includes a diverse selection of bingo and gaming supplies tailored to meet the needs of players and organizers alike.</p>
          </div>
          <div className="flex-item">
            <h3>Raffle Tickets</h3>
            <p>Enhance your fundraising events or community activities with our high-quality raffle tickets. We offer customizable designs to suit your specific needs, ensuring a professional look and seamless organization. Whether for charities, schools, or private events, our tickets are crafted to leave a lasting impression while keeping your event running smoothly.</p>
          </div>
          <div className="flex-item">
            <h3>Custom Games</h3>
            <p>Looking for something unique? We specialize in designing and manufacturing custom games that add a personal touch to any event or fundraiser.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;