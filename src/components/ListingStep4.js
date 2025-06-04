
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ListingStep4.css';
import Navbar from './DashboardNavbar';
import Footer from './footer';
const LocationForm = () => {
    const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/dashboard/listings/step5');
  };

  return (
    <>
    <Navbar/>
    <div className="location-container">
      <h2>Location</h2>

      <p className="map-helper">You can move the pointer to set the correct map position</p>

      <form className="location-form">
        <div className="form-group">
          <label htmlFor="country">Country <span className="required">*</span></label>
          <select id="country">
            <option value="Afghanistan">Afghanistan</option>
            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="address1">Address Line 1 <span className="required">*</span></label>
          <input type="text" id="address1" placeholder="House name/number + street/road" />
        </div>

        <div className="form-group">
          <label htmlFor="address2">Address Line 2</label>
          <input type="text" id="address2" placeholder="Apt, suite, building access code" />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">City / Town / District <span className="required">*</span></label>
            <input type="text" id="city" />
          </div>

          <div className="form-group">
            <label htmlFor="zip">ZIP / Postal Code</label>
            <input type="text" id="zip" />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="state">State / Province / County / Region</label>
          <input type="text" id="state" />
        </div>

        <div className="button-group">
          <button type="button" className="back-button">Back</button>
          <button type="submit" className="next-button" onClick={handleContinue}>Next</button>
        </div>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default LocationForm;
