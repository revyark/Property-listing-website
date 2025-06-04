import React from "react";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="summary-cards">
        <div className="card">
          <div className="icon">📋</div>
          <div className="label">My Lists</div>
          <div className="value">3</div>
        </div>
        <div className="card">
          <div className="icon">🧳</div>
          <div className="label">Trips</div>
          <div className="value">0</div>
        </div>
        <div className="card">
          <div className="icon">💼</div>
          <div className="label">My Wallet</div>
          <div className="value">₹ 0.00</div>
        </div>
      </div>

      <div className="details">
        <div className="detail-card">
          <div className="header">📑 Latest Bookings</div>
          <div className="body">
            You don’t have any Bookings yet—but when you do, you’ll find them here.
          </div>
        </div>
        <div className="detail-card">
          <div className="header orange">🔁 Latest Transactions</div>
          <div className="body">
            No Transaction History.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
