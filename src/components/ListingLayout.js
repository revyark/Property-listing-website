import React from 'react';
import { Outlet } from 'react-router-dom';

export default function ListingLayout() {
  return (
    <div className="listing-layout">
      <main className="listing-main-content">
        <Outlet />
      </main>
    </div>
  );
}
