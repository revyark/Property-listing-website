
import React from 'react';
import './ListingStep2.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './DashboardNavbar';
import Footer from './footer';

const RoomAndListingForm = () => {
    const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/dashboard/listings/step3');
  };

  return (
    <>
      <Navbar />
      <div className="form-wrapper">
        {/* Rooms and Beds */}
        <div className="form-section">
          <h2>Rooms and Beds</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Bedrooms</label>
              <select><option>1</option></select>
            </div>
            <div className="form-group">
              <label>Beds</label>
              <select><option>1</option></select>
            </div>
            <div className="form-group">
              <label>Bed Type</label>
              <select><option>King</option></select>
            </div>
            <div className="form-group">
              <label>Bathrooms</label>
              <select><option>1</option></select>
            </div>
          </div>
        </div>

        {/* Listings */}
        <div className="form-section">
          <h2>Listings</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Property Type</label>
              <select><option>Apartments</option></select>
            </div>
            <div className="form-group">
              <label>Coastal Area</label>
              <select><option>NORTH COAST</option></select>
            </div>
            <div className="form-group">
              <label>Accommodates</label>
              <select><option>1</option></select>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="form-buttons">
          <button className="btn back-btn">Back</button>
          <button className="btn next-btn" onClick={handleContinue}>Next</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RoomAndListingForm;
