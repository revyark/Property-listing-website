import React from 'react';
import './TestimonialsCarousel.css';
import bgImage from './images/p1.jpg';
import user from './images/user.jpg';

const testimonials = [
  { id: 1, name: 'John Doe 1', text: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”', image: user },
  { id: 2, name: 'Jane Smith', text: '“Pellentesque fermentum dolor sit amet, consectetur adipiscing elit. Quisque mollis dolor non tellus placerat vitae.”', image: user },
  { id: 3, name: 'Alex Johnson', text: '“Adipiscing elit. Pellentesque fermentum dolor sit amet.”', image: user },
  { id: 4, name: 'Sophia Lee', text: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.”', image: user },
  { id: 5, name: 'Michael Brown', text: '“Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.”', image: user },
  { id: 6, name: 'Emily Davis', text: '“Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.”', image: user },
];

const TestimonialsCarousel = () => {
  return (
    <section
      className="testimonials-section"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="overlay" />
      <div className="testimonials-content">
        <h2 className="section-title">What Our Clients Say</h2>
        <div className="cards-container">
          {testimonials.map((item) => (
            <div key={item.id} className="testimonial-card">
              <img src={item.image} alt={item.name} className="avatar" />
              <h3 className="reviewer-name">{item.name}</h3>
              <div className="stars">★★★★★</div>
              <p className="review-text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default TestimonialsCarousel;
