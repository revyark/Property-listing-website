import React, { useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import './User_listing.css';

export default function User_listing() {
  const [listings, setListings] = useState([]);
  const token = localStorage.getItem('access_token');
  const navigate=useNavigate();
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard/user/listings', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await response.json();
        if (response.ok) {
          setListings(data.listings); // Adjust if your response format is different
        } else {
          console.error(data.error || 'Failed to fetch listings');
        }
      } catch (err) {
        console.error('Error fetching listings:', err);
      }
    };

    fetchListings();
  }, []);
  const handleView = async(prop_id)=>{
    try{
      const response=await fetch('http://localhost:5000/api/dashboard/property/view',{
        method:'GET',
        headers:{
          'content-type':'application.json',
          Authorization:`Bearer ${token}`,
          
        },
        credentials:'include',
        body:JSON.stringify({'property':prop_id}),
      })
      const data=await response.json()
      if (response.ok){
        console.log(data)
        navigate('/dashboard')
      }
    } catch(err){
      console.error(err)
    }
  }
  return (
    <div>
      {listings.map((listing, idx) => (
        <div className="user_list" key={idx}>
          <img src={`http://localhost:5000/${listing.image}`} className="user-list-img" />
          <div className="user_list_desc">
            <h3>{listing.name}</h3>
            <p>{listing.description}</p>
            <p>{listing.location}</p>
          </div>
          <div className="user_list_btn">
            <button className="ul1-btn" onClick={()=>handleView(listing.prop_id)}>View</button>
            <button className="ul1-btn">Update</button>
            <button className="ul1-btn">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
