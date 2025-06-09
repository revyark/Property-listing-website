import React, { useState } from 'react';
import './ListingStep7.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './DashboardNavbar';
import Footer from './footer';

const PricingForm = () => {
  const navigate = useNavigate();

  const [nightlyPrice, setNightlyPrice] = useState('');
  const [currency, setCurrency] = useState('INR');

  const [options, setOptions] = useState({
    cleaningFee: true,
    additionalGuests: false,
    securityDeposit: true,
    weekendPricing: true,
  });

  const [values, setValues] = useState({
    cleaningFee: 0,
    additionalGuests: 0,
    addnlAfter: 0, // ✅ New field
    securityDeposit: 0,
    weekendPricing: 0,
    weeklyDiscount: 0,
    monthlyDiscount: 0,
  });

  const [showWeeklyDiscount, setShowWeeklyDiscount] = useState(false);
  const [showMonthlyDiscount, setShowMonthlyDiscount] = useState(false);

  const toggleOption = (key) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const toggleWeeklyDiscount = () => setShowWeeklyDiscount(prev => !prev);
  const toggleMonthlyDiscount = () => setShowMonthlyDiscount(prev => !prev);

  const handleContinue = async () => {
    const token = localStorage.getItem("access_token");

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

    try {
      const response = await fetch("http://localhost:5000/api/dashboard/pricing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Pricing saved!");
        console.log(data);
        navigate('/dashboard/listings/step8');
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
    navigate('/dashboard/listings/step6')
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
                />
              </div>
            </div>
            <div className="input-group">
              <label>Currency</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
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
                />
              </div>
            </div>
          </div>
        </div>

        <div className="button-group">
          <button className="btn back" onClick={handleBack}>Back</button>
          <button className="btn next" onClick={handleContinue}>Next</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PricingForm;
