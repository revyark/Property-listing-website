import React, { useEffect, useState } from 'react';
import { FaBookmark } from 'react-icons/fa';
import './DashboardComponents.css';
import './Booking.css'
import { useNavigate } from 'react-router-dom';

export default function Bookings() {
  const [myBookings, setMyBookings] = useState([]);
  const [page,setPage]=useState(1);
  const [totalPages,setTotalPages]=useState(1);
  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();
  const [params,setParams]=useState({
    'prop_id':'',
    'Book_id':'',
  })
  useEffect(() => {
    const fetchBookings = async (pageNum=1) => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await fetch(`http://localhost:5000/api/dashboard/sidebar/user/booking?page=${pageNum}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });

        const data = await response.json();
        if (response.ok) {
          // console.log(data.data)
          setMyBookings(data.data);
          setTotalPages(data.totalPages || 1);
          setPage(data.currentPage || 1); 

        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error('Error fetching bookings:', err);
      }
    };

      fetchBookings(page);
  }, [page]);

  const handleViewMore=async(prop_id,Book_id)=>{
    navigate(`/dashboard/user/bookingdetails/${prop_id}/${Book_id}`)
  }
  const handleOnDelete=async(Book_id)=>{
    try{
      const res=await fetch('http://localhost:5000/api/dashboard/user/bookingbilling/delete',{
        method:'POST',
        headers:{
          'Authorization':`Bearer ${token}`,
          'Content-Type':'application/json'
        },
        credentials:'include',
        body:JSON.stringify({'Book_id':Book_id})
      })
      const data= await res.json()
      if(res.ok){
        console.log(data)
      }
      else{
        console.log(data.error)
      }
    } catch(err){
      console.log(err)
    }
  }
    return (
    <div className="dashboard-bookings">
      <div className="dashboard-header">
        <FaBookmark className="dashboard-icon" />
        <h2>My Bookings</h2>
        <p>View and manage your upcoming stays</p>
      </div>

      <div className="booking-list">
        {myBookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          myBookings.map((booking, index) => (
            <div className="booking-card" key={index}>
              <img
                src={booking.prop_photo}
                alt="Property"
                className="booking-image"
              />
              <div className="booking-details">
                <h3>{booking.prop_name}</h3>
                <p><strong>Status:</strong> {booking.status}</p>
                <p><strong>Check-in:</strong> {new Date(booking.Check_in).toLocaleDateString()}</p>
                <p><strong>Check-out:</strong> {new Date(booking.Check_out).toLocaleDateString()}</p>
                <p><strong>Total Paid:</strong> ₹{booking.total}</p>
                <div className="booking-actions">
                  <button className="book-ul1-btn" onClick={()=>handleViewMore(booking.prop_id,booking.Book_id)}>View More</button>
                  <button className="book-ul1-btn" onClick={()=>handleOnDelete(booking.Book_id)}>Cancel</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="pagination-controls">
  <button
    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
    disabled={page === 1}
  >
    Prev
  </button>

  <span>Page {page} of {totalPages}</span>

  <button
    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
    disabled={page === totalPages}
  >
    Next
  </button>
</div>

    </div>
  );
}