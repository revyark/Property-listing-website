import React from 'react';
import './Regions.css';
import im1 from './images/1.jpeg';
import im2 from './images/2.jpg';
import im3 from './images/3.jpeg';

const Regions = () => {
  const regions = [
    {
      name: 'East Coast',
      image: im1 
    },
    {
      name: 'North Coast',
      image: im2 
    },
    {
      name: 'South Sinai',
      image: im3 
    }
  ];

  return (
    <div className="regions-container">
      <h2 className="regions-heading">Find Spaces that Suit Your Style</h2>
      <div className="regions-grid">
        {regions.map((region, idx) => (
          <div
            key={idx}
            className="region-card"
            style={{ backgroundImage: `url(${region.image})` }}
          >
            <div className="region-overlay">
              <span className="region-name">{region.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Regions;
