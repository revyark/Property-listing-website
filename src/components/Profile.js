import React from 'react';
import { FaUser } from 'react-icons/fa';
import './DashboardComponents.css';

export default function Profile() {
  return (
    <div className="dashboard-component">
      <div className="icon-placeholder"><FaUser /></div>
      <h1>Profile</h1>
      <p>Update your personal information and settings here.</p>
    </div>
  );
}
