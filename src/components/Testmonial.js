import React from 'react';
import './TestimonialsCarousel.css';
import user from './images/user.jpg';
const testimonials = [
  { id: 1, name: 'John Doe 1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: user },
  { id: 2, name: 'John Doe 2', text: 'Pellentesque fermentum dolor sit amet.', image: user },
  { id: 3, name: 'John Doe 3', text: 'Adipiscing elit. Pellentesque fermentum.', image: user },
  { id: 4, name: 'John Doe 4', text: 'Lorem ipsum dolor sit amet.', image: user },
];

// Repeat 5x to simulate infinite scroll feel
const repeatedTestimonials = Array(5).fill(testimonials).flat();

const TestimonialsCarousel = () => {
  return (
    <div className="carousel-wrapper">
      <h2 className="carousel-title">What Our Clients Say About Us</h2>
      <div className="carousel-grid-scroll">
        {repeatedTestimonials.map((item, index) => (
          <div key={index} className="testimonial-card">
            <img src={item.image} alt="avatar" className="avatar" />
            <h3>{item.name}</h3>
            <div className="stars"><br/>★★★★★</div>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
