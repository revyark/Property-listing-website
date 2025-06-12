
import React,{useState,useEffect} from 'react';
import './ListingStep3.css';
import { useNavigate,useLocation } from 'react-router-dom';
import Navbar from './DashboardNavbar';
import Footer from './footer';

const DescriptionForm = () => {
  const location=useLocation();
  const {mode='create',allSteps:rawSteps=[],listingId=null}=location.state || {};
  const allSteps=Array.isArray(rawSteps)? rawSteps:[];
  const step3Data=allSteps.find(step => step.step3)?.step3 || {};
  console.log('mode:',mode);
  console.log('Steps:',step3Data);
  const [formData,setFormData]=useState({
    listing_name: step3Data.listing_name||'',
    Summary:step3Data.Summary||'',
  })
  const [error,setError]=useState('');
  const navigate = useNavigate();
  const handleChange=(e)=>{
    if (mode === 'view') return;
    setFormData({...formData,[e.target.name]:e.target.value});
  };
  const handleContinue = async(e) => {
    e.preventDefault();

    if (mode === 'view'){
      navigate('/dashboard/listings/step4',{
        state:{
          mode,
          allSteps,
          listingId
        }
      });
      return;
    } 


    setError('');
    const token = localStorage.getItem("access_token");
    const url =mode==='edit'
      ? `http://localhost:5000/api/dashboard/description/update`
      :  'http://localhost:5000/api/dashboard/description';
    
    const method ='POST';
    const prop_id=listingId;
    let requestBody={ ...formData };
    if (mode === 'edit'){
      requestBody ={...requestBody,'property_id':listingId};
    }
    try{
      const response = await fetch(url, {
        method,
        headers:{
          'Content-Type':'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include', 
        body:JSON.stringify(requestBody),
      });
      const data=await response.json();
      if (response.ok){
        navigate('/dashboard/listings/step4',{
          state:{
            mode: mode === 'edit' ? 'edit' : 'create',
            allSteps: allSteps,
            listingId: data.listingId || listingId
          }
        });
      } else{
        setError(data.error || 'Failed to submit');
      }
    } catch(err){
      setError('Network Error')
    }
  };
  const handleBack=(e)=>{
   if (mode === 'create') {
      navigate('/dashboard/listings/step2');
    } else {
      navigate(-1); // Go back to previous page
    }
  };
  return (
    <>
    <Navbar/>
    <div className="description-container">
      <h2>Description</h2>
      <form onSubmit={handleContinue}>
        <div className="form-group">
          <label htmlFor="listingName">Property listing Name <span className="required">*</span></label>
          <input type="text" name="listing_name" id="listingName" placeholder="Shared room in" onChange={handleChange} value={formData.listing_name} readOnly={mode==='view'}/>
        </div>
        
        <div className="form-group">
          <label htmlFor="summary">Summary <span className="required">*</span></label>
          <textarea name="Summary" id="summary" rows="5" onChange={handleChange} value={formData.Summary} readOnly={mode === 'view'}></textarea>
        </div>
        
        <p className="helper-text">
          You can add more <span className="highlight-list-det">details</span> tell travelers about your space and hosting style.
        </p>

        <div className="button-group">
          <button type="button" className="back-button" onClick={handleBack}>Back</button>
          <button type="submit" className="next-button" >{mode === 'edit' ? 'Update' : mode === 'view' ? 'Next' : 'Next'}</button>
        </div>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default DescriptionForm;

