import React from 'react';
import './Regions.css';
import im1 from './images/1.jpeg';
import im2 from './images/2.jpg';
import im3 from './images/3.jpeg';

const Regions = () => {
const regions = [
    {
      name: 'East Coast',
      image: im1,
      description: 'Beautiful beaches and vibrant cities along the East Coast.',
      properties: 120,
      visitors: 3500
    },
    {
      name: 'North Coast',
      image: im2,
      description: 'Scenic views and relaxing resorts on the North Coast.',
      properties: 80,
      visitors: 2700
    },
    {
      name: 'South Sinai',
      image: im3,
      description: 'Stunning desert landscapes and coral reefs in South Sinai.',
      properties: 95,
      visitors: 3100
    }
  ];

  return (
    <div className="regions-container">
      <h2 className="regions-heading">Our top locations</h2>
      <div className="regions-grid">
        {regions.map((region, idx) => (
          <div key={idx} className="region-card">
            <div
              className="region-image"
              style={{ backgroundImage: `url(${region.image})` }}
            />
            <div className="region-info">
              <span className="region-name">{region.name}</span>
              <p className="region-description">{region.description}</p>
              <div className="region-stats">
                <span>{region.properties} properties listed</span>
                <span>{region.visitors} visitors</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Regions;
