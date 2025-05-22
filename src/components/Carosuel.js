// components/HeroCarousel.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CarosuelStyles.css';
import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';

const carouselItems = [
  {
    image: image1,
    title: 'Discover Your Perfect Getaway',
    subtitle: 'Discover Your Perfect Getaway',
  },
  {
    image: image2,
    title: 'Relax at the Beachfront',
    subtitle: 'Explore beautiful beach homes',
  },
  {
    image: image3,
    title: 'Escape to the Mountains',
    subtitle: 'Cozy cabins & scenic views',
  },
];

const HeroCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {carouselItems.map((item, index) => (
          <div key={index} className="relative">
            <img
              src={item.image}
              alt="carousel"
              className="carousel-image"
            />
            <div className="carousel-overlay">
              <h2 className="carousel-title">{item.title}</h2>
              <p className="carousel-subtitle">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </Slider>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Where are you going?"
          className="search-input"
        />
        <input
          type="text"
          placeholder="Add dates"
          className="search-input"
        />
        <input
          type="text"
          placeholder="Guests"
          className="search-input"
        />
        <button className="search-button">
          🔍
        </button>
      </div>
    </div>
  );
};

export default HeroCarousel;
