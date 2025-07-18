// src/pages/AboutPage.js

import React from 'react';
import './AboutPage.css'; // Import the CSS file for styling

const AboutPage = () => {
  return (
    <div className="page-container">
      <div className="about-page">
        <div className="about-box">
          <h3 className='at'>At K&M Sales, we have proudly served as the leading distributor of bingo and gaming supplies in Western Maryland and West Virginia for over 40 years. Our founder Roy "Buzz" Mills has set a standard that takes pride in dedication to quality and customer satisfaction, which has made us a trusted partner in the industry! <br/> <br/>
          We collaborate with licensed charitable, fraternal, veteran, select resturaunts/bars and other organizations. Our mission is to offer quality gaming products at competitive prices to support fundraising efforts. As a full-service company, our experienced sales staff will help recommend the best products and services for your organization's growth.
          </h3>
        </div>
        <div className="flex-container">
          <div className="flex-item">
            <h3>Tip Jars</h3>
            <p>Take your gaming and promotional activities to the next level with our Tip Jars. Manufactured with precision and creativity, these jars are versatile and come in many different themes, featuring vibrant designs and engaging formats. Ideal for fundraising, giveaways, or special events, they bring an element of fun and competition to any occasion.</p>
          </div>
          <div className="flex-item">
            <h3>Instant Winner Tickets</h3>
            <p>Keep the excitement alive with our Instant Winner Tickets! Designed to engage and thrill, these tickets are perfect for quick-play games, promotions, or giveaways. With customizable options and eye-catching designs, our tickets make every moment a winner, ensuring your players enjoy an unforgettable gaming experience.</p>
          </div>
          <div className="flex-item">
            <h3>Bingo Games and Bingo Daubers</h3>
            <p>At the heart of our business are integrity, commitment, and a focus on exceeding customer expectations. We offer high-quality bingo games and a variety of bingo daubers designed to enhance your gaming experience.</p>
          </div>
          <div className="flex-item">
            <h3>Bonus Boards, Coin Boards, and Scratch Off Boards</h3>
            <p>Our product range includes a diverse selection of bingo and gaming supplies tailored to meet the needs of players and organizers alike.</p>
          </div>
          <div className="flex-item">
            <h3>Raffle Tickets, Tip Boards, And Bingo Paper</h3>
            <p>Enhance your fundraising events or community activities with our high-quality raffle tickets, bingo paper, and tip boards. We offer customizable designs to suit your specific needs, ensuring a professional look and seamless organization. Whether for charities, schools, or private events, our products are crafted to leave a lasting impression while keeping your event running smoothly.</p>
          </div>
          <div className="flex-item">
            <h3>Custom Games</h3>
            <p>Looking for something unique? We specialize in designing and manufacturing custom games that add a personal touch to any event or fundraiser. Please contact us through email or give us a call if interested.</p>
          </div>
        </div>
        <div className="video-section">
  <h2>Learn More About Our Games!</h2>
  <div className="video-container">
    <iframe
      className="video"
      src="https://www.youtube.com/watch?v=HQ0Qt3kDewc"
      title="Video 1"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
    <iframe
      className="video"
      src="https://youtu.be/yikvtkdhx_4?si=ke1f8e6XgEzTr0-O"
      title="Video 2"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
    <iframe
      className="video"
      src="https://www.youtube.com/embed/VIDEO_ID_3"
      title="Video 3"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
</div>
      </div>
    </div>
  );
};

export default AboutPage;