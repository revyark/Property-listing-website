import React, { useEffect, useState } from 'react';
import './Billing.css';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
const Billing = () => {
  const [billData, setBillData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();
  const stripePromise=loadStripe(process.env.REACT_APP_STRIPE_API_KEY);
  useEffect(() => {
    const fetchBill = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard/user/billing', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
          credentials: 'include'
        });
        const data = await response.json();
        if (response.ok) {
          setBillData(data);
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error('Error fetching billing info:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBill();
  }, []);

  if (loading) return <div>Loading billing info...</div>;
  if (!billData) return <div>No billing data found.</div>;
  const handleCheckout= async()=>{
        const response=await fetch("http://localhost:5000/api/create_payment",{
            method:'POST',
            headers:{
                Authorization:`Bearer ${token}`
            },
            credentials:'include',
        });

        const data= await response.json();
        const stripe= await stripePromise;
        const result= await stripe.redirectToCheckout({
            sessionId:data.id
        });
        if (result.error){
            console.log(result.error)
        }
    };
  const handleCancel=async()=>{
    try{
        const res=await fetch('http://localhost:5000/api/dashboard/user/bookingbilling/delete',{
            method:'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            credentials:'include',
        });
        const data=await res.json()
        if(res.ok){
            console.log(data)
        }
        else{
            console.error(data.error)
        }
    } catch(err){
        console.error('Error cancelling billing:', err);
    }
  };
  return (
    <div className="billing-container">
      <h2 className="billing-title">Review Your Stay</h2>

      <div className="property-summary">
        <img src={billData.photo_url} alt="Property" className="property-image" />
        <div className="property-description">
          <h3>{billData.listing_name}</h3>
          <p>{billData.summary}</p>

          <div className="room-info">
            <span>{billData.bedrooms} Bedrooms</span>
            <span>{billData.bathrooms} Bathrooms</span>
            <span>{billData.beds} Beds</span>
            <span>{billData.kitchens} Kitchens</span>
            <span>{billData.Guests} Guests</span>
          </div>
        </div>
      </div>

      <div className="date-info">
        <p><strong>Check-in:</strong> {billData.Check_in}</p>
        <p><strong>Check-out:</strong> {billData.Check_out}</p>
      </div>

      <div className="billing-breakdown">
        <h3>Billing Breakdown</h3>
        <p><span>Service Fee</span><span>₹{billData.service_fee}</span></p>
        <p><span>Additional Guest Fee</span><span>₹{billData.addnl_guests}</span></p>
        <p><span>Security Fee</span><span>₹{billData.security_fee}</span></p>
        <p><span>Cleaning Fee</span><span>₹{billData.cleaning_fee}</span></p>
        <p><span>IVA Tax (22%)</span><span>₹{billData.iva_tax}</span></p>
        <p><span>Accommodation Tax (12%)</span><span>₹{billData.acc_tax}</span></p>
        <p><span>Discount</span><span>-₹{billData.discount}</span></p>
        <hr />
        <h3><span>Total</span><span>₹{billData.total}</span></h3>
      </div>
      <button className="generate-bill-button" onClick={handleCancel}>Cancel Booking</button>
      <button className="generate-bill-button" onClick={handleCheckout}>Confirm & Pay</button>
    </div>
  );
};

export default Billing;
