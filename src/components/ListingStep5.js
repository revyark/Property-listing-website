
import React, { useState } from 'react';
import './ListingStep5.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './DashboardNavbar';
import Footer from './footer';
const commonAmenities = [
  "Essentials", "Air Conditioning", "Internet", "Indoor Fireplace", "Shampoo",
  "Washer", "Breakfast", "Smoking Allowed", "Pets live on this property",
  "TV", "Heating", "Gym", "Buzzer/Wireless Intercom", "Wireless Internet",
  "Pool", "Free Parking on Premises", "Suitable for Events", "Wheelchair Accessible",
  "Cable TV", "Kitchen", "Elevator in Building", "Doorman", "Hot Tub",
  "Dryer", "Family/Kid Friendly", "Pets Allowed"
];

const safetyAmenities = [
  "Smoke Detector", "Safety Card", "Carbon Monoxide Detector", "Fire Extinguisher", "First Aid Kit"
];

const AmenitiesForm = () => {

    const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/dashboard/listings/step6');
  };
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedAmenities((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  return (
    <>
    <Navbar/>
    <div className="amenities-form">
      <div className="section">
        <h3>Common Amenities <span className="required">*</span></h3>
        <div className="grid">
          {commonAmenities.map((item, index) => (
            <label key={index} className="checkbox-label">
              <input
                type="checkbox"
                value={item}
                onChange={handleCheckboxChange}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      <div className="section">
        <h3>Safety Amenities</h3>
        <div className="grid">
          {safetyAmenities.map((item, index) => (
            <label key={index} className="checkbox-label">
              <input
                type="checkbox"
                value={item}
                onChange={handleCheckboxChange}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      <div className="button-group">
        <button className="btn back">Back</button>
        <button className="btn next" onClick={handleContinue}>Next</button>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AmenitiesForm;
