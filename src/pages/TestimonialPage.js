import React from 'react';
import './TestimonialPage.css'; // Import the updated CSS for styling

const TestimonialPage = () => {
  // Sample testimonials data
  const testimonials = [
    { id: 1, name: "Instant Fulfilment", text: "We take pride in immediate fulfuillment and move with urgency. Being in a close radius to our customers allows us to fulfill orders on the day placed or the day after. We understand that waiting an extended period of time to fulfill orders puts our customers at a disadvantage. " },
    { id: 2, name: "No Delivery Fee", text: "We cover Mineral, Allegheny, and surrounding counties for FREE. Zero extra fees and faster fulfillment.." },
    { id: 3, name: "Customize Your Product", text: "From custom ticket games to custom card games, we can design almost anything to your desired specifications. Things like custom game names, custom themes and cartoons, and custom payouts are all available to fit your needs." },
    { id: 4, name: "Club Consultment", text: "Feel free to schedule a phone call with one of our representitves via email or cellphone to enhance your experince with us. We will reccomend specific games and help you maximize the most return possible for your events." },
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