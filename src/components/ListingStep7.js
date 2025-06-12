import React, { useState,useEffect } from 'react';
import './ListingStep7.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './DashboardNavbar';
import Footer from './footer';

const PricingForm = () => {
  const navigate = useNavigate();
  const location =useLocation();

  const {mode ='create',allSteps:rawSteps=[],listingId=null}=location.state || {};
  const allSteps = Array.isArray(rawSteps) ? rawSteps : [];
  const step7Data = allSteps.find(step => step.step7)?.step7 || {};
  console.log('mode:', mode);
  console.log('allSteps:', allSteps);
  const [nightlyPrice, setNightlyPrice] = useState(step7Data.nightly_price||0);
  const [currency, setCurrency] = useState(step7Data.currency||'INR');

  const [options, setOptions] = useState({
    cleaningFee: true,
    additionalGuests: false,
    securityDeposit: true,
    weekendPricing: true,
  });

  const [values, setValues] = useState({
    cleaningFee: step7Data.cleaning_fee|| 0,
    additionalGuests: step7Data.addnl_guests|| 0,
    addnlAfter: step7Data.addnl_after|| 0, // ✅ New field
    securityDeposit: step7Data.security_deposit|| 0,
    weekendPricing: step7Data.weekend_pricing|| 0,
    weeklyDiscount: step7Data.weekly_discount_percentage|| 0,
    monthlyDiscount: step7Data.monthly_discount_percentage|| 0,
  });

  const [showWeeklyDiscount, setShowWeeklyDiscount] = useState(false);
  const [showMonthlyDiscount, setShowMonthlyDiscount] = useState(false);

  const toggleOption = (key) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (key, value) => {
    if (mode === 'view') return;
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const toggleWeeklyDiscount = () => setShowWeeklyDiscount(prev => !prev);
  const toggleMonthlyDiscount = () => setShowMonthlyDiscount(prev => !prev);

  const handleContinue = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    if (mode === 'view'){
      navigate('/dashboard');
      return;
    }
    const payload = {
      nightly_price: parseInt(nightlyPrice),
      currency: currency,
      weekly_discount_percentage: parseInt(values.weeklyDiscount),
      monthly_discount_percentage: parseInt(values.monthlyDiscount),
      cleaning_fee: options.cleaningFee ? parseInt(values.cleaningFee) : 0,
      addnl_guests: options.additionalGuests ? parseInt(values.additionalGuests) : 0,
      addnl_after: parseInt(values.addnlAfter), // ✅ Send this value
      security_deposit: options.securityDeposit ? parseInt(values.securityDeposit) : 0,
      weekend_pricing: options.weekendPricing ? parseInt(values.weekendPricing) : 0
    };
    
    const url=mode==='edit'
     ?`http://localhost:5000/api/dashboard/pricing/update`
     : 'http://localhost:5000/api/dashboard/pricing'
    let requestBody={...payload};
    if(mode==='edit'){
      requestBody= {...payload,'property_id':listingId}
    }
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        credentials: "include",
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Pricing saved!");
        console.log(data);
        navigate('/dashboard')
      } else {
        console.error(data);
        alert("Error saving pricing: " + data.error);
      }
    } catch (err) {
      console.error("Request failed:", err);
      alert("Something went wrong while saving pricing.");
    }
  };
  const handleBack=(e)=>{
    if (mode === 'create'){
      navigate('/dashboard/listings/step6')
    }else{
      navigate(-1);
    }
  }
  return (
    <>
      <Navbar />
      <div className="pricing-form">
        <div className="section">
          <h3>Base price</h3>
          <div className="row">
            <div className="input-group">
              <label>Nightly Price<span className="required">*</span></label>
              <div className="price-input">
                <span className="symbol">₹</span>
                <input
                  type="number"
                  value={nightlyPrice}
                  onChange={(e) => setNightlyPrice(e.target.value)}
                  readOnly={mode === "view"}
                />
              </div>
            </div>
            <div className="input-group">
              <label>Currency</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)}  disabled={mode === 'view'}>
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>

          <p className="note">
            You can offer discounts for longer stays by setting
            <span className="highlight"> weekly</span> and
            <span className="highlight"> monthly</span> prices.
            {' '}
            <a href="#" onClick={toggleWeeklyDiscount}>Set Weekly Prices</a> |
            <a href="#" onClick={toggleMonthlyDiscount}> Set Monthly Prices</a>
          </p>

          {showWeeklyDiscount && (
            <div className="input-group">
              <label>Weekly Discount (%)</label>
              <div className="price-input">
                <input
                  type="number"
                  value={values.weeklyDiscount}
                  onChange={(e) => handleChange('weeklyDiscount', e.target.value)}
                  readOnly={mode === "view"}
                />
              </div>
            </div>
          )}

          {showMonthlyDiscount && (
            <div className="input-group">
              <label>Monthly Discount (%)</label>
              <div className="price-input">
                <input
                  type="number"
                  value={values.monthlyDiscount}
                  onChange={(e) => handleChange('monthlyDiscount', e.target.value)}
                  readOnly={mode === "view"}
                />
              </div>
            </div>
          )}
        </div>

        <div className="section">
          <h3>Additional Pricing Options</h3>
          <div className="options">
            {['cleaningFee', 'additionalGuests', 'securityDeposit', 'weekendPricing'].map((key) => (
              <div key={key} className="option-item">
                <label>
                  <input
                    type="checkbox"
                    checked={options[key]}
                    onChange={() => toggleOption(key)}
                    readOnly={mode === "view"}
                  />
                  {key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, (str) => str.toUpperCase())}
                </label>
                {options[key] && (
                  <div className="price-input">
                    <span className="symbol">₹</span>
                    <input
                      type="number"
                      value={values[key]}
                      onChange={(e) => handleChange(key, e.target.value)}
                      readOnly={mode === "view"}
                    />
                  </div>
                )}
              </div>
            ))}

            {/* ✅ Addnl After input field */}
            <div className="option-item">
              <label>Additional Guests After (Count)</label>
              <div className="price-input">
                <input
                  type="number"
                  value={values.addnlAfter}
                  onChange={(e) => handleChange('addnlAfter', e.target.value)}
                  readOnly={mode === "view"}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="button-group">
          <button className="btn back" onClick={handleBack}>Back</button>
          <button className="btn next" onClick={handleContinue}>
            {mode === 'edit'?'Update':mode ==='view'?'Next':'Next'}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PricingForm;
