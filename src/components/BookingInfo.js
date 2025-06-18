import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingInfo.css';

const BookingInfo = () => {
  const [bookingData, setBookingData] = useState({
    check_in: '',
    check_out: '',
    guests: '',
    nights: '',
    email: '',
    phone: '',
    firstname: '',
    lastname: '',
    listing_name: '',
    photo_url: '',
    Accomodates: '',
    Summary: '',
    bedrooms: '',
    bathrooms: '',
    bed_type: '',
    beds: '',
    kitchens: '',
    amenities: [],
    safety_features: [],
    addr_line1: '',
    addr_line2: '',
    country: '',
    city: '',
    region: '',
    zip: ''
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard/user/booking/info', {
          headers: { 'Authorization': `Bearer ${token}` },
          method: 'GET',
          credentials: 'include'
        });
        const data = await response.json();
        if (response.ok) {
          console.log(data)
          setBookingData(data);
        } else {
          console.log(data.error);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching booking info:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...bookingData, [name]: value };

    // Dynamically calculate nights
    if (name === 'check_in' || name === 'check_out') {
      const checkInDate = new Date(name === 'check_in' ? value : bookingData.check_in);
      const checkOutDate = new Date(name === 'check_out' ? value : bookingData.check_out);
      const diffTime = checkOutDate - checkInDate;
      const nights = diffTime > 0 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : '';
      updated.nights = nights;
    }

    setBookingData(updated);
  };

  const handleSave = async(e) => {
    try {
        const response = await fetch('http://localhost:5000/api/dashboard/user/booking/proceed', {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
         },
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(bookingData)
        });
        const data = await response.json();
        if (response.ok) {
          alert('Changes saved successfully!');
        } else {
          console.log(data.error);
        }
      } catch (error) {
        console.error('Error fetching booking info:', error);
        
      }
    // POST bookingData if needed
  };

  const handleProceed = async() => {
    try {
      const response = await fetch('http://localhost:5000/api/dashboard/user/billing', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include'
      });
      const data = await response.json();
      if (response.ok) {
        alert('Billing successfully created!');
        navigate('/billing'); // or billing summary page
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error('Error creating billing:', err);
    }
    
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="booking-form-container">
      <h2>Review & Update Your Booking</h2>

      <div className="property-header">
        <img src={bookingData.photo_url} alt="Property" className="property-photo" />
        <div>
          <h3>{bookingData.listing_name}</h3>
          <p>{bookingData.Summary}</p>
        </div>
      </div>

      <form className="booking-form">
        <fieldset>
          <legend>Stay Details</legend>
          <div className="form-row">
            <label>Check-In</label>
            <input type="date" name="check_in" value={bookingData.check_in} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label>Check-Out</label>
            <input type="date" name="check_out" value={bookingData.check_out} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label>Guests</label>
            <input type="number" name="guests" value={bookingData.guests} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label>Nights</label>
            <input type="number" name="nights" value={bookingData.nights} disabled />
          </div>
        </fieldset>

        <fieldset>
          <legend>Your Info</legend>
          <div className="form-row">
            <label>First Name</label>
            <input type="text" value={bookingData.firstname} readOnly />
          </div>
          <div className="form-row">
            <label>Last Name</label>
            <input type="text" value={bookingData.lastname} readOnly />
          </div>
          <div className="form-row">
            <label>Email</label>
            <input type="email" value={bookingData.email} readOnly />
          </div>
          <div className="form-row">
            <label>Phone</label>
            <input type="tel" value={bookingData.phone} readOnly />
          </div>
        </fieldset>

        <fieldset>
          <legend>Property Details</legend>
          <div className="form-row">
            <label>Bedrooms</label>
            <input type="number" value={bookingData.bedrooms} readOnly />
          </div>
          <div className="form-row">
            <label>Bathrooms</label>
            <input type="number" value={bookingData.bathrooms} readOnly />
          </div>
          <div className="form-row">
            <label>Beds</label>
            <input type="text" value={`${bookingData.beds} (${bookingData.bed_type})`} readOnly />
          </div>
          <div className="form-row">
            <label>Kitchens</label>
            <input type="number" value={bookingData.kitchens} readOnly />
          </div>
          <div className="form-row">
            <label>Accommodates</label>
            <input type="number" value={bookingData.Accomodates} readOnly />
          </div>
          <div className="form-row">
            <label>Amenities</label>
            <textarea value={bookingData.amenities.join(', ')} readOnly />
          </div>
          <div className="form-row">
            <label>Safety Features</label>
            <textarea value={bookingData.safety_features.join(', ')} readOnly />
          </div>
          <div className="form-row">
            <label>Address</label>
            <textarea
              value={`${bookingData.addr_line1}, ${bookingData.addr_line2}, ${bookingData.city}, ${bookingData.region}, ${bookingData.country} - ${bookingData.zip}`}
              readOnly
            />
          </div>
        </fieldset>

        <div className="booking-form-buttons">
          <button type="button" className="save-button" onClick={handleSave}>Save Changes</button>
          <button type="button" className="proceed-button" onClick={handleProceed}>Proceed to Billing</button>
        </div>
      </form>
    </div>
  );
};

export default BookingInfo;
