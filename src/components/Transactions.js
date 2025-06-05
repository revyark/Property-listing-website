import React from 'react';
import { FaMoneyBillAlt } from 'react-icons/fa';
import './DashboardComponents.css';

export default function Transactions() {
  return (
    <div className="dashboard-component">
      <div className="icon-placeholder"><FaMoneyBillAlt /></div>
      <h1>Transactions</h1>
      <p>Review your transaction history and details here.</p>
    </div>
  );
}
