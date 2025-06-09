
import {React,useState} from 'react';
import './ListingStep3.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './DashboardNavbar';
import Footer from './footer';

const DescriptionForm = () => {
  const [formData,setFormData]=useState({
    listing_name:'',
    Summary:'',
  })
  const [error,setError]=useState('');
  const navigate = useNavigate();
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }
  const handleContinue = async(e) => {
    e.preventDefault();
    setError('');
    const token = localStorage.getItem("access_token");
    try{
      const response = await fetch('http://localhost:5000/api/dashboard/description', {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include', 
        body:JSON.stringify(formData),
      });
      const data=await response.json();
      if (response.ok){
        console.log(data);
        navigate('/dashboard/listings/step4')
      } else{
        setError(data.error);
      }
    } catch(err){
      setError('Network Error')
    }
  };
  const handleBack=(e)=>{
    navigate('/dashboard/listings/step2')
  }
  return (
    <>
    <Navbar/>
    <div className="description-container">
      <h2>Description</h2>
      <form onSubmit={handleContinue}>
        <div className="form-group">
          <label htmlFor="listingName">Property listing Name <span className="required">*</span></label>
          <input type="text" name="listing_name" id="listingName" placeholder="Shared room in" onChange={handleChange} />
        </div>
        
        <div className="form-group">
          <label htmlFor="summary">Summary <span className="required">*</span></label>
          <textarea name="Summary" id="summary" rows="5" onChange={handleChange}></textarea>
        </div>
        
        <p className="helper-text">
          You can add more <span className="highlight-list-det">details</span> tell travelers about your space and hosting style.
        </p>

        <div className="button-group">
          <button type="button" className="back-button" onClick={handleBack}>Back</button>
          <button type="submit" className="next-button" >Next</button>
        </div>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default DescriptionForm;

