import React, { useState } from 'react';
import './ListingStep7.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './DashboardNavbar';
import Footer from './footer';
const PricingForm = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/dashboard/listings/step8');
  };

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

  return (
    <>
    <Navbar/>
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

export default PricingForm;
