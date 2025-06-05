import React from 'react';
import { FaHeart } from 'react-icons/fa';
import './DashboardComponents.css';

export default function Favourite() {
  return (
    <div className="dashboard-component">
      <div className="icon-placeholder"><FaHeart /></div>
      <h1>Favourite</h1>
      <p>View your favorite listings and saved items here.</p>
    </div>
  );
}
