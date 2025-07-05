import React from 'react';
import './PaymentFailed.css';
import { useNavigate } from 'react-router-dom';

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="failed-container">
      <div className="cross-circle">
        <div className="cross">&#10006;</div>
      </div>
      <h1>Payment Failed</h1>
      <p>Oops! Something went wrong with your transaction.</p>
      <button className="failed-button" onClick={() => navigate('/billing')}>Try Again</button>
    </div>
  );
};

export default PaymentFailed;
