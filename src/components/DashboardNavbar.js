import React, { useState,useEffect } from 'react';
import { FaGlobe, FaChevronDown } from 'react-icons/fa';
import { Link,useNavigate } from 'react-router-dom';
import './DashboardNavbar.css';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const token=localStorage.getItem('access_token')
  const [Name,setName]=useState('');
  const [profile,setProfile]=useState('');
  const navigate=useNavigate();
  useEffect(()=>{
    const fetchName=async()=>{
      try{
        const response=await fetch("http://localhost:5000/api/dashboard/name",{
          method:'GET',
          headers:{
            Authorization:`Bearer ${token}`
          },
          credentials:'include',
        });
        const data=await response.json();
        if (response.ok){
          setName(data.Name)
          setProfile(data.User_photo)
        } else{
          console.error(data.error || "Failed to fetch")
        }
      }catch(error){
        console.log(error);
      }
    };
    fetchName();
    const interval=setInterval(fetchName,10000);
    return ()=>clearInterval(interval);
  },[]);
  const handleLogout =async()=>{
    try{
        const response=await fetch("http://localhost:5000/api/logout",{
          method:'GET',
          headers:{
            Authorization:`Bearer ${token}`
          },
          credentials:'include',
        });
        const data=await response.json();
        console.log(data.message)
        if (response.ok){
          navigate('/')
        } else{
          console.error(data.error || "Failed to fetch")
        }
      }catch(error){
        console.log(error);
      }
  }
  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <Link to="/" className="bookish-tag"><div className="nav-section logo">BOOKISH</div></Link>

      {/* Center: Navigation */}
      <div className="nav-section nav-center">
        <span className="nav-link">Book Services</span>
        <span className="nav-link-globe">
          <FaGlobe /> English
        </span>
        <Link to="/dashboard/listings" className="list-space-btn">
          Start hosting
        </Link>
      </div>

      {/* Right: Profile Dropdown */}
      <div className="nav-section profile" onClick={() => setDropdownOpen(!dropdownOpen)}>
        <span><img src={profile} className="navbar-profile-image"/></span>
        <span className="profile-name">{Name}</span>
        <FaChevronDown className="chevron" />
        {dropdownOpen && (
          <div className="dropdown">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/dashboard/profile">Profile</Link>
            <a href="#" onClick={handleLogout}>Logout</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
