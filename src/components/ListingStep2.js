import React, { useState, useEffect } from 'react';
import './ListingStep2.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './DashboardNavbar';
import Footer from './footer';

const RoomAndListingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode = 'create', allSteps: rawSteps = [], listingId = null } = location.state || {};
  const allSteps = Array.isArray(rawSteps) ? rawSteps : [];
  const step2Data = allSteps.find(step => step.step2)?.step2 || {};
  console.log('mode:', mode);
  console.log('allSteps:', allSteps);
  console.log(listingId);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    bedrooms: step2Data.bedrooms || 0,
    beds: step2Data.beds || 0,
    bathrooms: step2Data.bathrooms || 0,
    bed_type: step2Data.bed_type || 'King',
    kitchens: step2Data.kitchens || 0,
    prop_type: step2Data.prop_type || 'Apartments',
    Coastal_Area: step2Data.Coastal_Area || 'North Coast',
    Accomodates: step2Data.Accomodates || 0,
  });

  const handleChange = (e) => {
    if (mode === 'view') return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === 'view') {
      // Just move to step3 with same data
      navigate('/dashboard/listings/step3', {
        state: {
          mode,
          allSteps,
          listingId
        }
      });
      return;
    }

    const token = localStorage.getItem("access_token");
    const url = mode === 'edit'
      ? `http://localhost:5000/api/dashboard/property/update`
      : 'http://localhost:5000/api/dashboard/property';

    const method = 'POST'; // Both create and update use POST in your current setup
    const prop_id=listingId
    // Prepare the body for the request
    let requestBody = { ...formData };
    if (mode === 'edit') {
      requestBody = { ...requestBody, 'property_id': prop_id }; // Add property_id for edit mode
    }

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(requestBody), // Use the modified requestBody
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/dashboard/listings/step3', {
          state: {
            mode: mode === 'edit' ? 'edit' : 'create', // Preserve mode for next step
            allSteps: allSteps,
            listingId: data.listingId || listingId 
          }
        });
      } else {
        console.log(data.error)
        setError(data.error || 'Failed to submit');
      }
    } catch (err) {
      setError(err);
    }
  };

  const handleBack = () => {
    if (mode === 'create') {
      navigate('/dashboard/listings/step1');
    } else {
      navigate(-1); // Go back to previous page
    }
  };
  return (
    <>
      <Navbar />
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          {/* ROOMS SECTION */}
          <div className="form-section">
            <h2>Rooms and Beds</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Bedrooms</label>
                <input name="bedrooms" type="number" min="0" value={formData.bedrooms} onChange={handleChange} readOnly={mode === 'view'} />
              </div>
              <div className="form-group">
                <label>Beds</label>
                <input name="beds" type="number" min="0" value={formData.beds} onChange={handleChange} readOnly={mode === 'view'} />
              </div>
              <div className="form-group">
                <label>Bed Type</label>
                <select name="bed_type" value={formData.bed_type} onChange={handleChange} disabled={mode === 'view'}>
                  <option>King</option>
                  <option>Queen</option>
                  <option>Double</option>
                  <option>Single</option>
                </select>
              </div>
              <div className="form-group">
                <label>Bathrooms</label>
                <input name="bathrooms" type="number" min="0" value={formData.bathrooms} onChange={handleChange} readOnly={mode === 'view'} />
              </div>
              <div className="form-group">
                <label>Kitchens</label>
                <input name="kitchens" type="number" min="0" value={formData.kitchens} onChange={handleChange} readOnly={mode === 'view'} />
              </div>
            </div>
          </div>

          {/* LISTING SECTION */}
          <div className="form-section">
            <h2>Listings</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Property Type</label>
                <select name="prop_type" value={formData.prop_type} onChange={handleChange} disabled={mode === 'view'}>
                  <option>Apartments</option>
                  <option>Compounds</option>
                  <option>Cabins</option>
                  <option>Townhouse</option>
                  <option>Open Terrace</option>
                </select>
              </div>
              <div className="form-group">
                <label>Coastal Area</label>
                <select name="Coastal_Area" value={formData.Coastal_Area} onChange={handleChange} disabled={mode === 'view'}>
                  <option>North-Coast</option>
                  <option>South-Coast</option>
                  <option>South-Sinai</option>
                </select>
              </div>
              <div className="form-group">
                <label>Accommodates</label>
                <input name="Accomodates" type="number" min="1" value={formData.Accomodates} onChange={handleChange} readOnly={mode === 'view'} />
              </div>
            </div>
          </div>

          {/* BUTTONS - Always visible */}
<div className="form-buttons">
  <button className="btn back-btn" type="button" onClick={handleBack}>
    Back
  </button>
  <button className="btn next-btn" type="submit">
    {mode === 'edit' ? 'Update' : mode === 'view' ? 'Next' : 'Next'}
  </button>
</div>

        </form>
      </div>
      <Footer />
    </>
  );
};

export default RoomAndListingForm;
