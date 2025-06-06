import {React,useState} from 'react';
import { FaUser } from 'react-icons/fa';
import './DashboardComponents.css';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  console.log(localStorage.getItem("access_token"))
  const [hostData,setHostData]=useState({Member_since:'',Languages:''})
  const [error,setError]=useState('');
  const handleChange=(e)=>{
    setHostData({...hostData,[e.target.name]:e.target.value });
  };
  console.log("Sending data:", hostData);
  const navigate=useNavigate()
  const handleSubmit= async(e)=>{
    e.preventDefault();
    setError('');
    const token = localStorage.getItem("access_token");
    try{
      const response = await fetch('http://localhost:5000/api/dashboard/profile', {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include', 
        body:JSON.stringify(hostData),
      });
      const data=await response.json();
      if (response.ok){
        console.log(data);
        navigate('/dashboard')
      } else{
        setError(data.error);
      }
    } catch(err){
      setError('Network Error')
    }
  }
  return (
    <div className="dashboard-component">
      <h2>Enter Basic Host Details</h2>
    <form onSubmit={handleSubmit}>
        <label htmlFor="Member_since">Member Since (YYYY-MM-DD):</label>
        <input id="Member_since" type="date" name="Member_since" onChange={handleChange} required/><br/><br/>

        <label htmlFor="Languages">Languages Spoken (comma separated):</label>
        <input id="Languages" type="text" name="Languages" onChange={handleChange} required/><br/><br/>
        <button>Submit</button>
    </form>
    {error && <p className="error">{error}</p>}
    </div>
  );
}
