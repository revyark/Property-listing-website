import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './User_listing.css';

export default function User_listing() {
  const [listings, setListings] = useState([]);
  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();

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
          console.log(data);
          setListings(data.listings || []); // Safeguard if listings is undefined
        } else {
          console.error(data.error || 'Failed to fetch listings');
        }
      } catch (err) {
        console.error('Error fetching listings:', err);
      }
    };

    fetchListings();
  }, [token]);

  const handleView = async (id) => {
    try {
      const response = await fetch('http://localhost:5000/api/dashboard/property/view', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ property: id }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/dashboard/listings/step2', {
          state: {
            mode: 'view',
            allSteps: data.listings,
            listingID: id,
          },
        });
      } else {
        console.error(data.error || 'View failed');
      }
    } catch (err) {
      console.error('Error in viewing listing:', err);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch('http://localhost:5000/api/dashboard/property/view', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ property: id }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/dashboard/listings/step2', {
          state: {
            mode: 'edit',
            allSteps: data.listings,
            listingId: id,
          },
        });
      } else {
        console.error(data.error || 'Update failed');
      }
    } catch (err) {
      console.error('Error in updating listing:', err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this property?');
    if (!confirmDelete) return;

    try {
      const response = await fetch('http://localhost:5000/api/dashboard/property/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ property: id }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Deleted:', data);
        // Remove from UI after deletion
        setListings(prev => prev.filter(item => item.id !== id));
      } else {
        console.error(data.error || 'Delete failed');
      }
    } catch (err) {
      console.error('Error deleting listing:', err);
    }
  };
  const handleOnClick =()=>{
    navigate('/dashboard/listings/step8')
  }
  return (
    <div className="user-listings-container">
      {listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        listings.map((listing) => (
          <div className="user_list" key={listing.id}>
            <img
              src={`http://localhost:5000/${listing.image || 'default.jpg'}`}
              className="user-list-img"
              alt={listing.name}
            />
            <div className="user_list_desc">
              <h3>{listing.name}</h3>
              <p>{listing.description}</p>
              <p>{listing.location}</p>
            </div>
            <div className="user_list_btn">
              <button className="ul1-btn" onClick={() => handleView(listing.id)}>View</button>
              <button className="ul1-btn" onClick={() => handleUpdate(listing.id)}>Update</button>
              <button className="ul1-btn" onClick={() => handleDelete(listing.id)}>Delete</button>
              <button className="ul1-btn" onClick={() => handleOnClick()}><span className="spric">Set pricing</span></button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
