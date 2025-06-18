import React,{useEffect,useState} from 'react';
import {useNavigate,useParams} from 'react-router-dom';

export default function User_Booking_details() {
    const [myBookingsDetails, setMyBookingsDetails]=useState([]);
    const navigate=useNavigate()
    const token=localStorage.getItem('access_token')
    const {param1,param2}=useParams()
    useEffect(()=>{
        const fetchBookingDetails =async()=>{
            try{
                const resp=await fetch('http://localhost:5000/api/dashboard/sidebar/user/booking/viewmore',{
                    method:'POST',
                    headers:{
                        'Authorization':`Bearer ${token}`,
                        'Content-Type':'application/json',
                    },
                    credentials:'include',
                    body:JSON.stringify({'prop_id':param1,'Book_id':param2})
                });
                const data=await resp.json()
                if (resp.ok){
                    setMyBookingsDetails(data);
                }
                else{
                    console.log(data.error);
                }
            } catch(err){
                console.log(err);
            }
        };
        fetchBookingDetails();
    },[token]);
  return (
    <div className="billing-container">
      <h2 className="billing-title">Review Your Stay</h2>

      <div className="property-summary">
        <img src={myBookingsDetails.prop_photo_url} alt="Property" className="property-image" />
        <div className="property-description">
          <h3>{myBookingsDetails.prop_name}</h3>

          <div className="room-info">
            <span>{myBookingsDetails.bedrooms} Bedrooms</span>
            <span>{myBookingsDetails.bathrooms} Bathrooms</span>
            <span>{myBookingsDetails.beds} Beds</span>
            <span>{myBookingsDetails.kitchens} Kitchens</span>
            <span>{myBookingsDetails.guests} Guests</span>
          </div>
        </div>
      </div>

      <div className="date-info">
        <p><strong>Check-in:</strong> {myBookingsDetails.Check_in}</p>
        <p><strong>Check-out:</strong> {myBookingsDetails.Check_out}</p>
      </div>

      <div className="billing-breakdown">
        <h3>Primary Guest</h3>
        <p><span>Username:</span> {myBookingsDetails.user_fname}{myBookingsDetails.user_lname}</p>
        <p><span>Email:</span><span>{myBookingsDetails.email}</span></p>
        <p><span>Phone:</span><span>{myBookingsDetails.phone}</span></p> 
      </div><br/><br/>
      <div className="billing-breakdown">
        <h3>Billing Breakdown</h3>
        <p><span>Service Fee</span><span>₹{myBookingsDetails.service_fee}</span></p>
        <p><span>Additional Guest Fee</span><span>₹{myBookingsDetails.addnl_guest_fee}</span></p>
        <p><span>Security Fee</span><span>₹{myBookingsDetails.security_fee}</span></p>
        <p><span>Cleaning Fee</span><span>₹{myBookingsDetails.cleaning_fee}</span></p>
        <p><span>IVA Tax (22%)</span><span>₹{myBookingsDetails.iva_tax}</span></p>
        <p><span>Accommodation Tax (12%)</span><span>₹{myBookingsDetails.acc_tax}</span></p>
        <p><span>Discount</span><span>-₹{myBookingsDetails.discount}</span></p>
        <hr />
        <h3><span>Total</span><span>₹{myBookingsDetails.total}</span></h3>
      </div>
    </div>
  );
};