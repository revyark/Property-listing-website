import React from "react";
import "./PropertyCard.css";

const PropertyCard = ({ image, title, location, area, price, bedrooms, bathrooms }) => {
  return (
    <div className="property-card">
      <img src={image} alt={title} className="property-image" />
      <div className="property-content">
        <h4>{title}</h4>
        <p className="location">📍 {location}</p>
        <div className="details">
          <p>🛏 {bedrooms} Bedrooms 🛁 {bathrooms} Bathrooms <br/>📐 {area} Sqft.</p>
        </div>
        <hr />
        <p className="price">₹ {price} <span className="night">Per Night</span></p>
      </div>
    </div>
  );
};

export default PropertyCard;
