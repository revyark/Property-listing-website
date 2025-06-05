import React from 'react';
import { FaInbox } from 'react-icons/fa';
import './DashboardComponents.css';

export default function Inbox() {
  return (
    <div className="dashboard-component">
      <div className="icon-placeholder"><FaInbox /></div>
      <h1>Inbox</h1>
      <p>Check your messages and notifications here.</p>
    </div>
  );
}
