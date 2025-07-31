import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import AdminSidebar from './AdminSidebar';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../Common/NavBar';
import { TopBar } from '../Layout/TopBar';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
    <TopBar/>
    <NavBar/>
    <div className="min-h-screen flex flex-col md:flex-row relative bg-green-50">
      {/* Top bar for mobile */}
      <div className="flex md:hidden p-4 bg-green-800 text-white z-20">
        <button onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
        <h1 className="ml-4 text-xl font-semibold tracking-wide">Growzy Admin Dashboard</h1>
      </div>

      {/* Background overlay when sidebar is open on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`bg-green-900 w-64 min-h-screen text-white absolute md:relative transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 md:translate-x-0 md:static md:block z-20`}
      >
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6 overflow-auto bg-white">
        <Outlet />
      </div>
    </div>
    </>
  );
};

export default AdminLayout;
