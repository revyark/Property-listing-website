import React from 'react';
import { FaSuitcase } from 'react-icons/fa';
import './DashboardComponents.css';

export default function Trips() {
  return (
    <div className="dashboard-component">
      <div className="icon-placeholder"><FaSuitcase /></div>
      <h1>Trips</h1>
      <p>Manage your upcoming and past trips here.</p>
    </div>
  );
}
