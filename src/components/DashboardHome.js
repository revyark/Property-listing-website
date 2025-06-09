import React, {useState,useEffect} from "react";
import "./Dashboard.css";

function Dashboard() {
  const [lists,setLists]=useState(0)
  const token=localStorage.getItem('access_token')
  useEffect(()=>{
    const fetchLists=async()=>{
      try{
        const response=await fetch("http://localhost:5000/api/dashboard/lists",{
          method: 'GET',

          headers:{
            Authorization: `Bearer ${token}`
          },
          credentials:'include',
        });
        const data=await response.json();
        if (response.ok){
          setLists(data.listings)
        }else{
          console.error(data.error || "Failed to fetch")
        }
      } catch (error){
        console.error("Error fetching:",error);
      }
    };
    fetchLists();
    const interval=setInterval(fetchLists,10000);
    return ()=>clearInterval(interval);
  },[]);

  return (
    <div className="dashboard-container">
      <div className="summary-cards">
        <div className="card">
          <div className="icon">📋</div>
          <div className="label">My Lists</div>
          <div className="value">{lists}</div>
        </div>
        <div className="card">
          <div className="icon">🧳</div>
          <div className="label">Trips</div>
          <div className="value">0</div>
        </div>
        <div className="card">
          <div className="icon">💼</div>
          <div className="label">My Wallet</div>
          <div className="value">₹ 0.00</div>
        </div>
      </div>

      <div className="details">
        <div className="detail-card">
          <div className="header">📑 Latest Bookings</div>
          <div className="body">
            You don’t have any Bookings yet—but when you do, you’ll find them here.
          </div>
        </div>
        <div className="detail-card">
          <div className="header orange">🔁 Latest Transactions</div>
          <div className="body">
            No Transaction History.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
