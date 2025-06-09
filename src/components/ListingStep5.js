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
  const [amenities, setAmenities] = useState([]);
  const [safetyFeatures, setSafetyFeatures] = useState([]);
  const [error, setError] = useState('');

  const handleAmenityChange = (event) => {
    const { value, checked } = event.target;
    setAmenities((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleSafetyChange = (event) => {
    const { value, checked } = event.target;
    setSafetyFeatures((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };
  const token=localStorage.getItem('access_token')
  console.log(token)
  const handleContinue = async () => {
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/dashboard/amenities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
        },
        credentials:'include',
        body: JSON.stringify({
          amenities: amenities.join(','),
          safety_features: safetyFeatures.join(',')
        })
      });
      console.log({
  amenities: amenities.join(','),
  safety_features: safetyFeatures.join(',')
});

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        navigate('/dashboard/listings/step6');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Network error occurred");
    }
  };
  const handleBack=(e)=>{
    navigate('/dashboard/listings/step4')
  }
  return (
    <>
      <Navbar />
      <div className="amenities-form">
        <div className="section">
          <h3>Common Amenities <span className="required">*</span></h3>
          <div className="grid">
            {commonAmenities.map((item, index) => (
              <label key={index} className="checkbox-label">
                <input
                  type="checkbox"
                  value={item}
                  onChange={handleAmenityChange}
                  name="amenities"
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
                  onChange={handleSafetyChange}
                  name="safety_features"
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        <div className="button-group">
          <button className="btn back" onClick={handleBack}>Back</button>
          <button className="btn next" onClick={handleContinue}>Next</button>
        </div>

        {error && <p className="error">{error}</p>}
      </div>
      <Footer />
    </>
  );
};

export default AmenitiesForm;
