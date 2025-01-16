import React from 'react';
import './TestimonialPage.css'; // Import the updated CSS for styling

const TestimonialPage = () => {
  // Sample testimonials data
  const testimonials = [
    { id: 1, name: "John Doe", text: "This is an amazing service!" },
    { id: 2, name: "Jane Doe", text: "I had a great experience with this company." },
    { id: 3, name: "Sam Smith", text: "Highly recommended for everyone." },
    { id: 4, name: "Samantha Lee", text: "Fantastic products and great support." },
    { id: 5, name: "Chris Johnson", text: "I am very satisfied with my purchase." },
    { id: 6, name: "Patricia Brown", text: "The best service I've ever used!" }
  ];

  return (
    <div className="testimonial-page page-container">
      <h1>Testimonials</h1>
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