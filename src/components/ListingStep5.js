import React, { useState } from 'react';
import './ListingStep5.css';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const { mode = 'create', allSteps: rawSteps = [], listingId = null } = location.state || {};
  const allSteps = Array.isArray(rawSteps) ? rawSteps : [];
  const step5Data = allSteps.find(step => step.step5)?.step5 || {};

  const [amenities, setAmenities] = useState(
  Array.isArray(step5Data.amenities)
    ? step5Data.amenities
    : typeof step5Data.amenities === 'string'
      ? step5Data.amenities.split(',')
      : []
);

const [safetyFeatures, setSafetyFeatures] = useState(
  Array.isArray(step5Data.safety_features)
    ? step5Data.safety_features
    : typeof step5Data.safety_features === 'string'
      ? step5Data.safety_features.split(',')
      : []
);

  const [error, setError] = useState('');

  const handleAmenityChange = (event) => {
    const { value, checked } = event.target;
    if (mode === 'view') return;
    setAmenities((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleSafetyChange = (event) => {
    const { value, checked } = event.target;
    if (mode === 'view') return;
    setSafetyFeatures((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const token = localStorage.getItem('access_token');

  const handleContinue = async (e) => {
    e.preventDefault();
    if (mode === 'view') {
      navigate('/dashboard/listings/step6', {
        state: { mode, allSteps, listingId }
      });
      return;
    }

    setError('');
    const url=mode==='edit'
    ? `http://localhost:5000/api/dashboard/amenities/update`
    : 'http://localhost:5000/api/dashboard/amenities'

    const method ='POST';
    let requestBody={amenities: amenities.join(','),safety_features: safetyFeatures.join(','),}
    if (mode === 'edit'){
      requestBody= {...requestBody,'property_id':listingId}
    }
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/dashboard/listings/step6', {
          state: {
            mode,
            allSteps: [
              ...allSteps.filter(step => !step.step5),
              {
                step5: {
                  amenities: amenities.join(','),
                  safety_features: safetyFeatures.join(','),
                }
              }
            ],
            listingId: data.listingId || listingId
          }
        });
      } else {
        setError(data.error || 'Failed to submit');
      }
    } catch (err) {
      setError("Network error occurred");
    }
  };

  const handleBack = () => {
    if (mode === 'create') {
      navigate('/dashboard/listings/step4');
    } else {
      navigate(-1);
    }
  };

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
                  name="amenities"
                  onChange={handleAmenityChange}
                  checked={amenities.includes(item)}
                  disabled={mode === 'view'}
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
                  name="safety_features"
                  onChange={handleSafetyChange}
                  checked={safetyFeatures.includes(item)}
                  disabled={mode === 'view'}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        <div className="button-group">
          <button className="btn back" onClick={handleBack}>Back</button>
          <button className="btn next" onClick={handleContinue}>
            {mode === 'edit' ? 'Update' : mode === 'view' ? 'Next' : 'Next'}
          </button>
        </div>

        {error && <p className="error">{error}</p>}
      </div>
      <Footer />
    </>
  );
};

export default AmenitiesForm;
