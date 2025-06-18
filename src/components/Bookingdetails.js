import React, { useState, useRef, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import { addDays, differenceInCalendarDays, format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './BookingDetails.css';
import { enUS } from 'date-fns/locale';
import { useNavigate, useParams } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";

const Bookingdetails = () => {
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { property_id } = useParams();
  const [showCalendar, setShowCalendar] = useState(false);
  const navigate=useNavigate()
  const id=useParams()
  let f=0
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection',
    },
  ]);

  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const check_in = format(dateRange[0].startDate, 'yyyy-MM-dd');
  const check_out = format(dateRange[0].endDate, 'yyyy-MM-dd');
  const nights = differenceInCalendarDays(dateRange[0].endDate, dateRange[0].startDate);
  const token=localStorage.getItem('access_token')
  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/dashboard/user/booking', {
        method: 'POST',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'email':email,
          'guests':guests,
          'check_in':check_in,
          'check_out':check_out,
          'nights':nights,
          'property_id':id['id'],
        }),
      });

      const data = await res.json();

      if (res.ok) {
   f = 1;
  const currentTime = Math.floor(Date.now() / 1000);

  if (token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp && decoded.exp > currentTime) {
        navigate('/bookinginfo');
      } else {
        setMessage('Session expired, please log in again.');
        navigate(`/login/${f}`);
      }
    } catch (err) {
      console.error('Invalid token');
      navigate(`/login/${f}`);
    }
  } else if (data.message === "Registered") {
    setMessage(data.message);
    navigate(`/login/${f}`);
  } else {
    navigate(`/signup/${f}`);
  }

  setError('');
} else {
        setMessage('');
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Network error');
      setMessage('');
    }
  };

  return (
    <div className="bookingdetails-container">
      <h2>Booking Details</h2>
      <form onSubmit={handleBooking} className="bookingdetails-form">
        <label>Email:</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Guests:</label>
        <input
          type="number"
          required
          min="1"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />

        <label>Check-In and Check-Out:</label>
        <input
          type="text"
          readOnly
          onClick={() => setShowCalendar(!showCalendar)}
          value={`${check_in} to ${check_out}`}
          className="bookingdetails-date-input"
        />

        {showCalendar && (
          <div ref={calendarRef} className="bookingdetails-calendar-dropdown">
            <DateRange
              locale={enUS}
              editableDateInputs={true}
              onChange={(item) => setDateRange([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
              months={1}
              direction="horizontal"
            />
          </div>
        )}

        <p><strong>Nights:</strong> {nights}</p>

        <button type="submit" className="bookingdetailsbutton">Submit Booking</button>
      </form>

      {message && <div className="bookingdetails-success-message">{message}</div>}
      {error && <div className="bookingdetails-error-message">{error}</div>}
    </div>
  );
};

export default Bookingdetails;
