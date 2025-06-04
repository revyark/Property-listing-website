

import React from "react";
import "./ListingStep8.css";
import { useNavigate } from 'react-router-dom';
import Navbar from './DashboardNavbar';
import Footer from './footer';
const SetPriceModal = ({ isOpen, onClose, onSubmit }) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    // For now, navigate to dashboard home or show alert
    navigate('/dashboard');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    const data = new FormData(e.target);
    const formData = Object.fromEntries(data.entries());
    onSubmit(formData);
  };

  return (
    <>
    <Navbar/>
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h2>Set price for particular dates</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Start Date<span>*</span>
            <input type="date" name="startDate" required defaultValue="2025-06-04" />
          </label>

          <label>
            End Date<span>*</span>
            <input type="date" name="endDate" required defaultValue="2025-06-04" />
          </label>

          <label>
            Price<span>*</span>
            <input type="number" name="price" required defaultValue="0" />
          </label>

          <label>
            Minimum Stay
            <input type="number" name="minimumStay" defaultValue="0" />
          </label>

          <label>
            Status<span>*</span>
            <select name="status" required>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </label>

          <div className="modal-actions">
            <button type="button" className="btn-close" onClick={onClose}>Close</button>
            <button type="submit" className="btn-submit" onClick={handleContinue}>Submit</button>
          </div>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default SetPriceModal;
