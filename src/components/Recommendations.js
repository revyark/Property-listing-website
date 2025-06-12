import React from "react";
import './rec.css';
import PropertyCard from "./PropertyCard.js";
import p1 from "./images/p1.jpg";
import p2 from "./images/p2.jpg";
import p3 from "./images/p3.jpg";
import p4 from "./images/p4.jpg";
import p5 from "./images/p5.jpg";
function Recommendations() {
  const properties = [
    {
      title: "K+K Picasso",
      image: p1,
      location: "Barcelona",
      bedrooms: 10,
      bathrooms: 8,
      area: 3200,
      price: 529.92,
    },
    {
      title: "Galaxy",
      image: p2,
      location: "Mumbai Near Juhu",
      bedrooms: 1,
      bathrooms: 1,
      area: 3200,
      price: 1499,
    },
    {
      title: "Private room",
      image: p3,
      location: "Pathancheru",
      bedrooms: 1,
      bathrooms: 1,
      area: 3200,
      price: 500,
    },
    {
      title: "Contact Apex Hotels",
      image: p4,
      location: "London",
      bedrooms: 5,
      bathrooms: 8,
      area: 3200,
      price: 1324.8,
    },
    {
      title:"Entire home/05",
      image: p5,
      location: "Delhi",
      bedrooms: 1,
      bathrooms: 1,
      area: 3200,
      price: 39744,
    },
    {
        title:"Entire home/05",
        image: p5,
        location: "Delhi",
        bedrooms: 1,
        bathrooms: 1,
        area: 3200,
        price: 39744,
    },
    {
        title:"Entire home/05",
        image: p5,
        location: "Delhi",
        bedrooms: 1,
        bathrooms: 1,
        area: 3200,
        price: 39744,
    },
    {
        title:"Entire home/05",
        image: p5,
        location: "Delhi",
        bedrooms: 1,
        bathrooms: 1,
        area: 3200,
        price: 39744,
    }
    
  ];

  return (
    <div className="app">
      <h1>Best Recommendations</h1>
      <p className="subtitle-rec">
        Discover the top rated properties by our users
      </p>
      <div className="card-container">
        {properties.map((prop, index) => (
          <PropertyCard key={index} {...prop} />
        ))}
      </div>
      <button className="btn">View More</button>
    </div>
  );
}

export default Recommendations;
