import React, { useState } from "react";
import "./ListingStep8.css";
import { useNavigate } from 'react-router-dom';
import Navbar from './DashboardNavbar';
import Footer from './footer';
import { DateRange } from 'react-date-range';
import { enUS } from 'date-fns/locale';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const SetPriceModal = ({ isOpen, onClose, onSubmit, selectedRange }) => {
  const [formData, setFormData] = useState({
    startDate: selectedRange.startDate.toISOString().split('T')[0],
    endDate: selectedRange.endDate.toISOString().split('T')[0],
    price: '',
    minimumStay: '',
    status: 'available'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");

    const payload = {
      Check_in: formData.startDate,
      Check_out: formData.endDate,
      Price: parseInt(formData.price),
      Min_stay: parseInt(formData.minimumStay),
      Status: formData.status
    };

    try {
      const response = await fetch("http://localhost:5000/api/dashboard/dynamic_pricing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        credentials: "include",
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Price set successfully!");
        onSubmit(data);
        onClose();
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error("Request failed:", err);
      alert("Failed to set price.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h2>Set price for particular dates</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Start Date<span>*</span>
            <input
              type="date"
              name="startDate"
              required
              value={formData.startDate}
              onChange={handleChange}
            />
          </label>

          <label>
            End Date<span>*</span>
            <input
              type="date"
              name="endDate"
              required
              value={formData.endDate}
              onChange={handleChange}
            />
          </label>

          <label>
            Price<span>*</span>
            <input
              type="number"
              name="price"
              required
              value={formData.price}
              onChange={handleChange}
            />
          </label>

          <label>
            Minimum Stay
            <input
              type="number"
              name="minimumStay"
              value={formData.minimumStay}
              onChange={handleChange}
            />
          </label>

          <label>
            Status<span>*</span>
            <select
              name="status"
              required
              value={formData.status}
              onChange={handleChange}
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </label>

          <div className="modal-actions">
            <button type="button" className="btn-close" onClick={onClose}>Close</button>
            <button type="submit" className="btn-submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function ListingStep8() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const handleSelect = (ranges) => {
    setSelectedRange(ranges.selection);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (data) => {
    console.log('Backend response:', data);
    setModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="listing-step8-container">
        <h1>Select Dates to Set Price</h1>
        <DateRange
          editableDateInputs={true}
          onChange={handleSelect}
          moveRangeOnFirstSelection={false}
          ranges={[selectedRange]}
          locale={enUS}
        />
        <SetPriceModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          selectedRange={selectedRange}
        />
      </div>
      <Footer />
    </>
  );
}
