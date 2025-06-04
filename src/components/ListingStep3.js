
import React from 'react';
import './ListingStep3.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './DashboardNavbar';
import Footer from './footer';

const DescriptionForm = () => {
    const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/dashboard/listings/step4');
  };

  return (
    <>
    <Navbar/>
    <div className="description-container">
      <h2>Description</h2>
      <form>
        <div className="form-group">
          <label htmlFor="listingName">Property listing Name <span className="required">*</span></label>
          <input type="text" id="listingName" placeholder="Shared room in" />
        </div>
        
        <div className="form-group">
          <label htmlFor="summary">Summary <span className="required">*</span></label>
          <textarea id="summary" rows="5"></textarea>
        </div>
        
        <p className="helper-text">
          You can add more <span className="highlight">details</span> tell travelers about your space and hosting style.
        </p>

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

export default DescriptionForm;

