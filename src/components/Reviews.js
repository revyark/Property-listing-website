import React from 'react';
import { FaStar } from 'react-icons/fa';
import './DashboardComponents.css';

export default function Reviews() {
  return (
    <div className="dashboard-component">
      <div className="icon-placeholder"><FaStar /></div>
      <h1>Reviews</h1>
      <p>Read and respond to your reviews here.</p>
    </div>
  );
}
