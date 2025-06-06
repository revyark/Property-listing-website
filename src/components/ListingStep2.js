import {React,useState} from 'react';
import './ListingStep2.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './DashboardNavbar';
import Footer from './footer';

const RoomAndListingForm = () => {
  const navigate = useNavigate();
  const [error,setError]=useState('');
  const [formData,setFormData]=useState(
    {
      bedrooms:0,
      beds:0,
      bathrooms:0,
      bed_type:'',
      kitchens:0,
      prop_type:'',
      Coastal_Area:'',
      Accomodates:0
    }
  );
  const handleChange =(e) =>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };
  const handleSubmit= async(e)=>{
    e.preventDefault();
    setError('');
    const token=localStorage.getItem("access_token");
    try {
      const response = await fetch('http://localhost:5000/api/dashboard/property', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data)
      if (response.ok) {
        // After successful login:
        console.log(data)
        navigate('/dashboard/listings/step3');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Network error');
    }
  };
  return (
    <>
      <Navbar />
      <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>Rooms and Beds</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Bedrooms</label>
              <input name="bedrooms" type="number" min="0" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Beds</label>
              <input  name="beds" type="number" min="0" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Bed Type</label>
              <select  name="bed_type" onChange={handleChange} >
                <option>King</option>
                <option>Queen</option>
                <option>Double</option>
                <option>Single</option>
              </select>
            </div>
            <div className="form-group">
              <label>Bathrooms</label>
              <input  name="bathrooms" type="number" min="0" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Kitchens</label>
              <input  name="kitchens" type="number" min="0" onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Listings */}
        <div className="form-section">
          <h2>Listings</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Property Type</label>
              <select name="prop_type" id="hometype" className="sel1" onChange={handleChange}>
                <option value="Apartments">Apartments</option>
                <option value="Compounds">Compounds</option>
                <option value="Cabins">Cabins</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Open Terrace">Open Terrace</option>
              </select>
            </div>
            <div className="form-group">
              <label>Coastal Area</label>
              <select name="Coastal_area" id="coastalarea" className="sel1" onChange={handleChange}>
                <option value="North-Coast">North-Coast</option>
                <option value="South-Coast">South-Coast</option>
                <option value="South-Sinai">South-Sinai</option>
              </select>
            </div>
            <div className="form-group">
              <label>Accommodates</label>
              <input name="Accomodates" type="number" min="1" onChange={handleChange}/>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="form-buttons">
          <button className="btn back-btn">Back</button>
          <button className="btn next-btn" type="submit">Next</button>
        </div>
      </form>
      </div>
      <Footer />
    </>
  );
};

export default RoomAndListingForm;
