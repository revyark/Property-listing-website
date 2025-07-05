import React, {useState,useEffect}from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise=loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

const PaymentPage =()=>{
    const token=localStorage.getItem('access_token')
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
            console.error(result.error)
        }
    };
    return(
        <div style={{ padding:"2em",textAlign:"center"}}>
            <div className="billing-breakdown">
        <h3>Billing Breakdown</h3>
      </div>
            <button
               onClick={handleCheckout}
               style={{
                  backgroundColor: "#6772e5",
                  color: "white",
                  padding: "10px 20px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  border: "None",
                  cursor: "pointer",
               }}
            >
                Pay Now
            </button>
        </div>
    );
};
export default PaymentPage;