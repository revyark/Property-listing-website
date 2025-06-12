import React from 'react';
import './DashboardSidebar.css';
import { FaTachometerAlt, FaInbox, FaSuitcase, FaHeart, FaCreditCard, FaMoneyBillAlt, FaUser, FaStar, FaBookmark } from 'react-icons/fa';

import { Link, useLocation,useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const navigate=useNavigate();
  const token=localStorage.getItem('access_token')
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li className={location.pathname === '/dashboard' ? 'active' : ''}>
          <Link to="/dashboard"><FaTachometerAlt /> Dashboard</Link>
        </li>
        <li className={location.pathname === '/dashboard/inbox' ? 'active' : ''}>
          <Link to="/dashboard/inbox"><FaInbox /> Inbox</Link>
        </li>
        <li className={location.pathname === '/dashboard/bookings' ? 'active' : ''}>
          <Link to="/dashboard/bookings"><FaBookmark /> Bookings</Link>
        </li>
        <li className={location.pathname === '/dashboard/trips' ? 'active' : ''}>
          <Link to="/dashboard/trips"><FaSuitcase /> Trips</Link>
        </li>
        <li className={location.pathname === '/dashboard/favourite' ? 'active' : ''}>
          <Link to="/dashboard/favourite"><FaHeart /> Favourite</Link>
        </li>
        <li className={location.pathname === '/dashboard/payouts' ? 'active' : ''}>
          <Link to="/dashboard/payouts"><FaCreditCard /> Payouts</Link>
        </li>
        <li className={location.pathname === '/dashboard/transactions' ? 'active' : ''}>
          <Link to="/dashboard/transactions"><FaMoneyBillAlt /> Transactions</Link>
        </li>
        <li className={location.pathname === '/dashboard/profile' ? 'active' : ''}>
          <Link to="/dashboard/profile"><FaUser /> Profile <span className="badge">1</span></Link>
        </li>
        <li className={location.pathname === '/dashboard/reviews' ? 'active' : ''}>
          <Link to="/dashboard/reviews"><FaStar /> Reviews</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
