import React, { useState } from 'react';
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

      {/* Search bar with calendar */}
      <div className="search-bar">
        <input type="text" placeholder="Where are you going?" className="search-input" />

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
            <div className="absolute z-50 mt-2 shadow-lg">
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

        <input type="text" placeholder="Guests" className="search-input" />
        <button className="search-button">🔍</button>
      </div>
    </div>
  );
};

export default HeroCarousel;
