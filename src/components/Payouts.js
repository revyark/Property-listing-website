import React from 'react';
import { FaCreditCard } from 'react-icons/fa';
import './DashboardComponents.css';

export default function Payouts() {
  return (
    <div className="dashboard-component">
      <div className="icon-placeholder"><FaCreditCard /></div>
      <h1>Payouts</h1>
      <p>Manage your payout methods and history here.</p>
    </div>
  );
}
