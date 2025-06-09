import React, { useState,useRef } from 'react';
import Slider from 'react-slick';
import { DateRange } from 'react-date-range';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './CarosuelStyles.css';
import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';
import { enUS } from 'date-fns/locale';

const HeroCarousel = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection'
    }
  ]);

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

  const formatDisplay = () => {
    const { startDate, endDate } = dateRange[0];
    if (!startDate || !endDate) {
      return '';
    }
    return `${startDate.toDateString()} - ${endDate.toDateString()}`;
  };
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0 });
  const [petsAllowed, setPetsAllowed] = useState(false);

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {[image1, image2, image3].map((img, i) => (
          <div key={i} className="relative">
            <img src={img} alt="carousel" className="carousel-image" />
            <div className="carousel-overlay">
              <h2 className="carousel-title">Discover Your Perfect Getaway</h2>
              <p className="carousel-subtitle">Plan your dream vacation</p>
            </div>
          </div>
        ))}
      </Slider>

<div className="search-bar">
  <div className="search-input-wrapper">
    <input type="text" placeholder="Where are you going?" className="search-input" />
  </div>

  <div className="search-input-wrapper">
    <div className="relative">
      <input
        type="text"
        placeholder="Add dates"
        className="search-input"
        onClick={() => setShowCalendar(!showCalendar)}
        readOnly
        value={formatDisplay()}
      />
      {showCalendar && (
        <div className="carosuel-calendar-dropdown">
          <DateRange
            locale={enUS}
            editableDateInputs={true}
            onChange={item => setDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={[{
              ...dateRange[0],
              startDate: dateRange[0].startDate || new Date(),
              endDate: dateRange[0].endDate || new Date(),
            }]}
          />
        </div>
      )}
    </div>
  </div>

<div className="search-input-wrapper relative">
  <input
    type="text"
    placeholder="Guests"
    className="search-input"
    onClick={() => setShowGuestDropdown(!showGuestDropdown)}
    readOnly
    value={
      guests.adults === 1 && guests.children === 0 && guests.infants === 0
        ? 'Guests'
        : `${guests.adults} Adult${guests.adults > 1 ? 's' : ''}, ` +
          `${guests.children} Child${guests.children !== 1 ? 'ren' : ''}, ` +
          `${guests.infants} Infant${guests.infants !== 1 ? 's' : ''}`
    }
  />

  {showGuestDropdown && (
    <div className="guest-dropdown absolute top-full left-0 z-50 bg-white shadow-md p-4 rounded-md mt-2 w-80">
      {['adults', 'children', 'infants'].map(type => (
        <div className="guest-row" key={type}>
          <div className="guest-label">
            <span className="guest-title capitalize">{type}</span>
            <span className="guest-subtitle">
              {type === 'adults' ? 'Ages 13 or above' :
               type === 'children' ? 'Ages 2–12' :
               'Under 2'}
            </span>
          </div>
          <div className="guest-controls">
            <button onClick={() => setGuests(prev => ({ ...prev, [type]: Math.max(0, prev[type] - 1) }))} className="guest-button">-</button>
            <span className="guest-count">{guests[type]}</span>
            <button onClick={() => setGuests(prev => ({ ...prev, [type]: prev[type] + 1 }))} className="guest-button">+</button>
          </div>
        </div>
      ))}

      <div className="guest-row border-top mt-4 pt-2">
        <div className="guest-label">
          <span className="guest-title">Travelling with pets?</span>
          <span className="guest-subtitle">Service animals allowed</span>
        </div>
        <label className="switch">
          <input
            type="checkbox"
            checked={petsAllowed}
            onChange={() => setPetsAllowed(prev => !prev)}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  )}
</div>


  <button className="search-button">🔍</button>
</div>
</div>
  );
};

export default HeroCarousel;
