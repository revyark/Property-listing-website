import React,{useEffect,useState} from 'react';
import './PaymentSuccess.css';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const token=localStorage.getItem('access_token')

  useEffect(()=>{
    const StatusSet=async()=>{
        try{
            const response=await fetch("http://localhost:5000/api/payment/success/process",{
                method:'POST',
                headers:{
                    'Authorization':`Bearer ${token}`,
                },
                credentials:'include',
            });
            const data=await response.json()
            if (response.ok){
                console.log(data)
            }
            else{
                console.log(data.error)
            }
        } catch(err){
            console.log(err)
        }
    }
    StatusSet();
  },[])
  return (
    <div className="success-container">
      <div className="checkmark-circle">
        <div className="checkmark">&#10004;</div>
      </div>
      <h1>Payment Successful</h1>
      <p>Thank you! Your transaction has been completed successfully.</p>
      <button className="success-button" onClick={() => navigate('/dashboard')}>Go to Homepage</button>
    </div>
  );
};

export default PaymentSuccess;
