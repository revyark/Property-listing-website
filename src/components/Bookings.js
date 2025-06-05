import React from 'react';
import { FaBookmark } from 'react-icons/fa';
import './DashboardComponents.css';

export default function Bookings() {
  return (
    <div className="dashboard-component">
      <div className="icon-placeholder"><FaBookmark /></div>
      <h1>Bookings</h1>
      <p>View and manage your bookings here.</p>
    </div>
  );
}
