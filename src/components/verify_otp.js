import React, {useState} from 'react'
import { useNavigate,useParams } from 'react-router-dom';
export default function Verify() {
    const {flag}=useParams()
    const [Otp,setOtp]=useState({
        otp:''
    });
    const [error,setError]=useState('');
    const navigate=useNavigate();
    const handleOtp=(e)=>{
        setOtp({...Otp,otp:e.target.value})
    }
    const handleSubmit= async (e)=>{
        e.preventDefault();
        setError('');
        try{
            const response = await fetch('http://localhost:5000/api/verify_otp',{
                method:'POST',
                credentials: "include",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(Otp),
            });
            const data=await response.json();
            if (response.status==201){
                navigate(`/login/${flag}`);
            }else{
                setError(data.error || 'Invalid OTP');
            }
        }catch(err){
            setError('Network error');
        }
    };
  return (
    <div> 
    <h2>Enter the OTP sent to your email</h2>
    <form onSubmit={handleSubmit}>
        <input type="text" name="otp" placeholder="6-digit OTP" onChange={handleOtp} required/>
        <button type="submit">Verify</button>
    </form>
    {error && <p className="error">{error}</p>}
    </div>
  )
}
