import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import Dashboard from './DashboardHome';
import './DashboardLayout.css';
import Footer from './footer.js'
export default function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <DashboardNavbar />
      <div className="dashboard-content-wrapper">
        <DashboardSidebar />
        <main className="dashboard-main-content">
          <Outlet />
        </main>
      </div>
      <Footer/>
    </div>
  );
}
