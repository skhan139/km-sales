// src/pages/CustomGamePage.js

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './CustomGamePage.css'; // Import the CSS file for styling

const CustomGamePage = () => {
  return (
    <div className="page-container">
      <div className="about-page">
        <div className="about-box">
          <h3 className='at'> Looking to design a custom game for your club? We specialize in creating unique games that add a personal touch to meet any of your needs. Here's how it works.
          </h3>
        </div>
        <div className="flex-container">
          <div className="flex-item">
            <h3>Game Selection</h3>
            <p>First, choose what type of game you would like to customize. Tip jar/pull tab, bundle ticket (4/1, 3/1, etc), or bingo card game. In some ocassions we can also do custom boards for fundraising events.  </p>
          </div>
          <div className="flex-item">
            <h3>Choose Ticket Count</h3>
            <p>Next, determine the ticket count for your game. The larger the seal and payouts, the larger the ticket count should be. Knowing your crowd, traffic, and turnouts will be key in finding the right amount.</p>
          </div>
          <div className="flex-item">
            <h3>Choose Game Illustrations/Cartoons</h3>
            <p>We can create an illustration for you or you can design your own. From an illustration of your club, to a theme that matches your town, we can cover any game art specs that you would need. Tickets will be more limited in terms of design and tip jars/cards will be more open. </p>
          </div>
          <div className="flex-item">
            <h3>Choose Payouts</h3>
            <p>Determine the top seal prize along with other winners. You can split the top seal, have a bunch of smaller payouts, etc. Games can have both instant winners as well as holders. Similar to the ticket count, knowing the tendencies of your club traffic will yield the best decision possible.</p>
          </div>
          <div className="flex-item">
            <h3> Choose Your Profit</h3>
            <p>We reccomend a profit percent in the 20-40% range to keep the payouts aedequte while allowing the club to still profit from the game. This is completely up to the customer, but we will provide assistance based off the other game specifications.</p>
          </div>
          <div className="flex-item">
            <h3>Choose Amount Of Games You Need Per Case</h3>
            <p>We require a minimum of 10 cases for your first custom order with us. The amount of games per case will soley depend on ticket count. The larger the ticket count per game, the less games amount of games that come per case. Larger orders will also be priced more competitively than smaller ones.</p>
          </div>
        </div>
        <h3>Here are some examples of custom games</h3>
        <div className="custom-game-images-container">
          <img src="/assets/images/deerparkvets.jpg" alt="Examples of custom games" className="custom-game-image" />
          <img src="/assets/images/oaklandlegion.jpg" alt="Examples of custom games" className="custom-game-image" />
          <img src="/assets/images/customticket.jpg" alt="Examples of custom games" className="custom-game-image" />
        </div>
        <div className="button-container">
          <Link to="/custom-game-creator" className="custom-game-button">
            Start Creating Your Game
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomGamePage;