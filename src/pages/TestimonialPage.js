import React from 'react';
import './TestimonialPage.css'; // Import the updated CSS for styling

const TestimonialPage = () => {
  // Sample testimonials data
  const testimonials = [
    { id: 1, name: "Instant Fulfilment", text: "We take pride in immediate fulfuillment and move with urgency. Being in a close radius to our customers allows us to fulfill orders on the day placed or the day after. We understand that waiting an extended period of time to fulfill orders puts our customers at a disadvantage. " },
    { id: 2, name: "No Delivery Fee", text: "We cover Mineral, Allegheny, and surrounding counties for FREE. We refuse to charge extra fees, as our goal is to help YOUR club first before anything else." },
    { id: 3, name: "Customize Your Product", text: "From custom ticket games to custom card games, we can design almost anything to your desired specifications. Things like custom game names, custom themes and cartoons, and custom payouts are all available to fit your needs." },
    { id: 4, name: "Find The Right Fit", text: "We offer product guidance to every single one of our customers. This can be done both online and in person. Our goal is to find the products that fit your needs the best while helping you generate revenue for your club or event. We understand that the amount of options to choose from may be overwhelming, which is why we’re here to help!" },
    { id: 5, name: "Commitment To Community", text: "We take pride in giving back to our customers. We proudly support our customers events and believe that giving back is crucial to developing strong relationships." },
    { id: 6, name: "On-Site Customer Support", text: "We will attend your bash, fundraiser, or charity event and cater to any extra needs you may have. This includes bringing extra inventory for the day, assisting with the distribution of any of our products, or any other of your needs to ensure you have a positive experience with us. Our goal is to make your fundraising process as efficient as possible and we are willing to help in any way that we can." },
    { id: 7, name: "Web And Software Development", text: "We can build websites and mobile apps for your club, bash, or event! With a professional software developer on our team, we can enhance your digital presence and help you thrive! Existing customers are eligible for discounted rates." },
  ];

  return (
    <div className="testimonial-page page-container">
      <h1>Why Choose K&M?</h1>
      <div className="testimonials-container">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <h3>{testimonial.name}</h3>
            <p>{testimonial.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialPage;